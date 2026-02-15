local M = {}

local storage_dir = nil

local function ensure_dir(path)
  if vim.fn.isdirectory(path) == 0 then
    vim.fn.mkdir(path, "p")
  end
end

function M.setup(opts)
  opts = opts or {}
  storage_dir = opts.dir or (vim.fn.stdpath("data") .. "/tape")
  ensure_dir(storage_dir)
end

function M.get_dir()
  return storage_dir
end

function M.save(name, recording)
  if not storage_dir then
    M.setup()
  end

  local path = storage_dir .. "/" .. name .. ".json"
  local json = vim.fn.json_encode(recording)
  local file = io.open(path, "w")
  if not file then
    return false
  end

  file:write(json)
  file:close()
  return true
end

function M.load(name)
  if not storage_dir then
    M.setup()
  end

  local path = storage_dir .. "/" .. name .. ".json"
  local file = io.open(path, "r")
  if not file then
    return nil
  end

  local content = file:read("*a")
  file:close()

  local ok, recording = pcall(vim.fn.json_decode, content)
  if not ok then
    return nil
  end

  return recording
end

function M.list()
  if not storage_dir then
    M.setup()
  end

  local files = vim.fn.glob(storage_dir .. "/*.json", false, true)
  local names = {}

  for _, path in ipairs(files) do
    local name = vim.fn.fnamemodify(path, ":t:r")
    table.insert(names, name)
  end

  table.sort(names)
  return names
end

function M.delete(name)
  if not storage_dir then
    M.setup()
  end

  local path = storage_dir .. "/" .. name .. ".json"
  if vim.fn.filereadable(path) == 0 then
    return false
  end

  vim.fn.delete(path)
  return true
end

function M.rename(old_name, new_name)
  if not storage_dir then
    M.setup()
  end

  local old_path = storage_dir .. "/" .. old_name .. ".json"
  local new_path = storage_dir .. "/" .. new_name .. ".json"

  if vim.fn.filereadable(old_path) == 0 then
    return false
  end

  return vim.fn.rename(old_path, new_path) == 0
end

return M
