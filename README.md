# tape.nvim

Record and replay editing sessions in Neovim. Not macros — full keystroke recording with timestamps. Record how you solve a problem, replay it for demos, or review your own workflow.

## Features

- Record full editing sessions with keystroke timing
- Replay at original speed, fast-forward, or slow motion
- Named recordings that persist across sessions
- Per-project or global storage
- List, rename, and delete recordings via a picker
- Export recordings as text for sharing

## Requirements

- Neovim 0.9+

## Installation

Using [lazy.nvim](https://github.com/folke/lazy.nvim):

```lua
{
  "yourusername/tape.nvim",
  config = function()
    require("tape").setup()
  end,
}
```

## Usage

- `:TapeRecord` — Start recording the current session
- `:TapeStop` — Stop recording and save
- `:TapePlay` — Pick a recording and replay it
- `:TapeList` — Browse, rename, or delete saved recordings

## How It Works

1. Uses `vim.on_key()` to capture every keystroke with high-resolution timestamps
2. Saves recordings as JSON to `~/.local/share/nvim/tape/`
3. Replays by feeding keys back with `vim.fn.feedkeys()` using `vim.defer_fn()` for original timing
