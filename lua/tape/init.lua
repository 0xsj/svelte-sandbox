local recorder = require("tape.recorder")
local storage = require("tape.storage")
local player = require("tape.player")
local manager = require("tape.manager")

local M = {}

function M.setup(opts)
  opts = opts or {}
  storage.setup({ dir = opts.dir })

  vim.api.nvim_create_user_command("TapeRecord", function()
    if recorder.is_recording() then
      vim.notify("tape: already recording", vim.log.levels.WARN)
      return
    end
    recorder.start()
    vim.notify("tape: recording started", vim.log.levels.INFO)
  end, {})

  vim.api.nvim_create_user_command("TapeStop", function(args)
    if player.is_playing() then
      manager.stop()
      return
    end

    if not recorder.is_recording() then
      vim.notify("tape: nothing to stop", vim.log.levels.WARN)
      return
    end

    local recording = recorder.stop()
    local name = args.args ~= "" and args.args or nil

    if not name then
      vim.ui.input({ prompt = "Recording name: " }, function(input)
        if not input or input == "" then
          vim.notify("tape: recording discarded", vim.log.levels.WARN)
          return
        end
        storage.save(input, recording)
        vim.notify("tape: saved '" .. input .. "' (" .. #recording.entries .. " keys)", vim.log.levels.INFO)
      end)
    else
      storage.save(name, recording)
      vim.notify("tape: saved '" .. name .. "' (" .. #recording.entries .. " keys)", vim.log.levels.INFO)
    end
  end, { nargs = "?" })

  vim.api.nvim_create_user_command("TapePlay", function(args)
    local name = args.args
    if name == "" then
      vim.notify("tape: usage — :TapePlay <name> [speed]", vim.log.levels.ERROR)
      return
    end

    local parts = vim.split(name, "%s+")
    local rec_name = parts[1]
    local speed = tonumber(parts[2]) or 1.0

    manager.play(rec_name, { speed = speed })
  end, { nargs = "+", complete = function()
    return storage.list()
  end })

  vim.api.nvim_create_user_command("TapeList", function()
    manager.pick()
  end, {})

  vim.api.nvim_create_user_command("TapeDelete", function(args)
    if args.args == "" then
      vim.notify("tape: usage — :TapeDelete <name>", vim.log.levels.ERROR)
      return
    end
    manager.delete(args.args)
  end, { nargs = 1, complete = function()
    return storage.list()
  end })

  vim.api.nvim_create_user_command("TapeRename", function(args)
    local parts = vim.split(args.args, "%s+")
    if #parts ~= 2 then
      vim.notify("tape: usage — :TapeRename <old> <new>", vim.log.levels.ERROR)
      return
    end
    manager.rename(parts[1], parts[2])
  end, { nargs = "+", complete = function()
    return storage.list()
  end })
end

M.record = recorder.start
M.stop = recorder.stop
M.is_recording = recorder.is_recording
M.is_playing = player.is_playing
M.play = manager.play
M.list = manager.list
M.pick = manager.pick
M.delete = manager.delete
M.rename = manager.rename

return M
