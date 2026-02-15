local storage = require("tape.storage")
local player = require("tape.player")

local M = {}

local picker_buf = nil
local picker_win = nil

function M.list()
  return storage.list()
end

function M.play(name, opts)
  local recording = storage.load(name)
  if not recording then
    vim.notify("tape: recording '" .. name .. "' not found", vim.log.levels.ERROR)
    return false
  end

  vim.notify("tape: playing '" .. name .. "'", vim.log.levels.INFO)

  local user_on_finish = opts and opts.on_finish
  local play_opts = vim.tbl_extend("force", opts or {}, {
    on_finish = function()
      vim.notify("tape: finished '" .. name .. "'", vim.log.levels.INFO)
      if user_on_finish then
        user_on_finish()
      end
    end,
  })

  return player.play(recording, play_opts)
end

function M.stop()
  return player.stop()
end

function M.delete(name)
  if storage.delete(name) then
    vim.notify("tape: deleted '" .. name .. "'", vim.log.levels.INFO)
    return true
  end

  vim.notify("tape: recording '" .. name .. "' not found", vim.log.levels.ERROR)
  return false
end

function M.rename(old_name, new_name)
  if storage.rename(old_name, new_name) then
    vim.notify("tape: renamed '" .. old_name .. "' -> '" .. new_name .. "'", vim.log.levels.INFO)
    return true
  end

  vim.notify("tape: could not rename '" .. old_name .. "'", vim.log.levels.ERROR)
  return false
end

local function close_picker()
  if picker_win and vim.api.nvim_win_is_valid(picker_win) then
    vim.api.nvim_win_close(picker_win, true)
  end
  if picker_buf and vim.api.nvim_buf_is_valid(picker_buf) then
    vim.api.nvim_buf_delete(picker_buf, { force = true })
  end
  picker_win = nil
  picker_buf = nil
end

function M.pick()
  local names = storage.list()
  if #names == 0 then
    vim.notify("tape: no recordings found", vim.log.levels.WARN)
    return
  end

  local lines = {}
  for i, name in ipairs(names) do
    table.insert(lines, string.format(" %d. %s", i, name))
  end

  picker_buf = vim.api.nvim_create_buf(false, true)
  vim.api.nvim_buf_set_lines(picker_buf, 0, -1, false, lines)
  vim.bo[picker_buf].modifiable = false
  vim.bo[picker_buf].bufhidden = "wipe"

  local width = 40
  for _, line in ipairs(lines) do
    width = math.max(width, #line + 4)
  end
  local height = math.min(#lines, 20)

  local ui = vim.api.nvim_list_uis()[1]
  local row = math.floor((ui.height - height) / 2)
  local col = math.floor((ui.width - width) / 2)

  picker_win = vim.api.nvim_open_win(picker_buf, true, {
    relative = "editor",
    row = row,
    col = col,
    width = width,
    height = height,
    style = "minimal",
    border = "rounded",
    title = " tape recordings ",
    title_pos = "center",
  })

  local function select_entry()
    local cursor = vim.api.nvim_win_get_cursor(picker_win)
    local idx = cursor[1]
    local name = names[idx]
    close_picker()
    if name then
      M.play(name)
    end
  end

  local kopts = { buffer = picker_buf, nowait = true, silent = true }
  vim.keymap.set("n", "<CR>", select_entry, kopts)
  vim.keymap.set("n", "q", close_picker, kopts)
  vim.keymap.set("n", "<Esc>", close_picker, kopts)

  vim.keymap.set("n", "d", function()
    local cursor = vim.api.nvim_win_get_cursor(picker_win)
    local idx = cursor[1]
    local name = names[idx]
    if name then
      M.delete(name)
      table.remove(names, idx)
      table.remove(lines, idx)
      vim.bo[picker_buf].modifiable = true
      vim.api.nvim_buf_set_lines(picker_buf, 0, -1, false, lines)
      vim.bo[picker_buf].modifiable = false
      if #names == 0 then
        close_picker()
      end
    end
  end, kopts)
end

return M
