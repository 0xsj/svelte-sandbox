local M = {}

local playing = false
local stop_requested = false

function M.play(recording, opts)
  if playing then
    return false
  end

  opts = opts or {}
  local speed = opts.speed or 1.0
  local on_finish = opts.on_finish

  local entries = recording.entries
  if not entries or #entries == 0 then
    if on_finish then
      on_finish()
    end
    return true
  end

  playing = true
  stop_requested = false

  local function feed(index)
    if stop_requested or index > #entries then
      playing = false
      stop_requested = false
      if on_finish then
        on_finish()
      end
      return
    end

    local entry = entries[index]
    local raw = vim.api.nvim_replace_termcodes(entry.key, true, true, true)
    vim.api.nvim_feedkeys(raw, "t", false)

    if index < #entries then
      local delay = (entries[index + 1].time - entry.time) / speed
      delay = math.max(delay, 0)
      vim.defer_fn(function()
        feed(index + 1)
      end, math.floor(delay))
    else
      playing = false
      if on_finish then
        on_finish()
      end
    end
  end

  local first_delay = entries[1].time / speed
  vim.defer_fn(function()
    feed(1)
  end, math.floor(math.max(first_delay, 0)))

  return true
end

function M.stop()
  if not playing then
    return false
  end

  stop_requested = true
  return true
end

function M.is_playing()
  return playing
end

return M
