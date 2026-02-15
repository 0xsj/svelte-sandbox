local M = {}

local recording = false
local entries = {}
local start_time = nil
local on_key_ns = nil

function M.start()
  if recording then
    return false
  end

  entries = {}
  start_time = vim.uv.hrtime()
  recording = true

  on_key_ns = vim.on_key(function(raw)
    if not recording then
      return
    end

    local key = vim.fn.keytrans(raw)
    if key == "" then
      return
    end

    local elapsed_ms = (vim.uv.hrtime() - start_time) / 1e6

    table.insert(entries, {
      key = key,
      time = elapsed_ms,
    })
  end)

  return true
end

function M.stop()
  if not recording then
    return nil
  end

  recording = false

  if on_key_ns then
    vim.on_key(nil, on_key_ns)
    on_key_ns = nil
  end

  local result = {
    entries = entries,
    duration_ms = (vim.uv.hrtime() - start_time) / 1e6,
  }

  entries = {}
  start_time = nil

  return result
end

function M.is_recording()
  return recording
end

return M
