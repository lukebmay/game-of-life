# Architecture

**Owner:** human. Agents may propose edits; apply only with explicit permission.

This file is the **target** architecture: how the product is supposed
to work, including the vision that the code has not reached yet. It
is not a snapshot of today's tree, and it is not a log of bugs. Bugs
live in [`issues.md`](./issues.md).

After reading it, you should be able to walk a user action from
event to result without guessing which layer owns the change.

Gaps between this file and the running code are closed with a plan.
Do not rewrite this file to describe leftovers.

Words: [`glossary.md`](./glossary.md). When work is complete:
[`acceptance.md`](./acceptance.md). How work is run, including what
is stone: catalog `general.md` and [`general.md`](./general.md) when
this project has one.

## This file can be wrong

This file is what we **currently believe** is the best structure. It
is not a proof. It will change. Parts of it will turn out to be
wrong.

If you think a lock here is **directionally wrong** (the structure
or the product intent, not a leftover in the code), **stop work on
that issue**. Do not paper over it with a second path. Do not silently
edit this file. Do not silently change the code to match a sentence
you suspect is stale. We meet. Write the new lock here only when the
human says to: what is true, who does it, and what it does not cover.
One sentence of why when the choice is easy to undo the wrong way.
Do not write what was rejected.

**Why this paragraph exists:** agents treated this file as
unchangeable, then hid misses behind fallbacks.

Code that merely lags this file is a plan, not a meeting. A meeting
is for when this file itself looks like the mistake.

## What is being built

A portfolio page that runs Conway's Game of Life in the browser.
React and TypeScript on Vite. One UI, two Zustand stores, a pure step
function, and a DOM board. No plugin host.

## Layers

| Piece | Owns | Must not own |
| --- | --- | --- |
| UI | Chrome, settings, and the `GameStage` play clock | Conway rules and the next grid |
| Simulation | `gol.ts`: one wrapped generation | React, stores, timers, and the DOM |
| Game store | Size, boolean grid, pause, and board mutations | Painting and the play clock |
| App store | Theme, colors, delay, auto-pause, fill %, panels, debug | Grid and step function |
| Rendering | CSS-grid divs of the current booleans | Choosing the next generation |

Paths and the settings list are in the notes below. The control flow
names which function writes the next board.

## Control flow

The board starts paused. The in-code default is an empty 40 by 40
grid. A saved game store replaces that default on load (see Notes).

### Play

1. The visitor clicks Play in `Controls`.
2. If the game store's `isPaused` is true, `Controls` calls
   `resetRenderStats` on the app store, then `toggleIsPaused` on the
   game store. If the board was already running, `Controls` only
   toggles pause. Neither call computes a generation.
3. `GameStage`'s effect sees `isPaused` false and calls `advanceStep`
   on the game store immediately.
4. `advanceStep` sets `board` to the grid returned by
   `calculateNextState` in `src/engine/gol.ts`.
5. The simulation allocates a new grid of the same size. For each cell
   it counts the eight neighbors, wrapping row and column with modulo.
   Two live neighbors leave the cell as it is. Three live neighbors
   make the cell alive. Any other count makes it dead.
6. `Board` reads `board` and passes each boolean to a `Cell`. The class
   `cell-alive` or `cell-dead` paints `--alive-color` or `--dead-color`.
7. `GameStage` schedules that same step with `setTimeout`, waiting
   `stateTransitionDelay` milliseconds from the app store. The default
   is 200. The store accepts an integer from 0 through 10000.
8. Pause or unmount clears that timeout and does not compute another
   generation. The effect also restarts when delay, debug visibility,
   `advanceStep`, or `updateRenderStats` changes. A restart while
   running calls `advanceStep` once, then waits the current delay.

When debug info is visible, `GameStage` calls `updateRenderStats` with
the current time before `advanceStep`. That write does not change the board.

### Step

While `isPaused` is true, the Step button in `Controls` calls
`advanceStep` once. The same game-store and simulation path runs.
`Controls` does not start a timeout. It disables Step, Randomize, and
Clear while the board is running.

### Cell edit

`Cell` handles `onMouseUp` and calls `toggleCell(row, col)` on the game
store, which flips that one boolean. The handler does not call the
simulation and does not read `isPaused`. `Board` repaints from the
updated grid.

### Clear and randomize

While paused, Clear calls `clearBoard`. That replaces `board` with
`initEmptyBoard(rows, cols)` and does not run a generation.

While paused, Randomize calls `randomizeBoard`. The game store reads
`autoFillAlivePercentage` from the app store (default 30, allowed 0
through 100). It sets each cell alive when a new draw, from 0 up to
but not including 100, is below that percent. It does not call
`calculateNextState`. Random fill stays in the game store because the
percent is a setting, not a life rule.

### Resize

`BoardDimensions` calls `setRows` or `setCols` on the game store. The
store accepts only integers from 10 through 200. `GameStage`'s effect
then calls `setBoard` with a new empty grid of that size and copies the
overlapping rectangle from the previous grid. Cells with no old value
stay dead. Cells past the new size are dropped. This path does not call
`calculateNextState`.

### Auto-pause

`GameStage` mounts `useAutoPause`. When the board is running and
`autoPauseAfterMinutes` is greater than 0, the hook waits that many
minutes, then calls `toggleIsPaused`. It does not step. The default is
5. The store accepts an integer from 0 through 1440. Zero means the
hook does not arm the timer.

## Notes

UI code lives under `src/components` and `src/hooks`. The simulation is
`src/engine/gol.ts` (`initEmptyBoard`, `calculateNextState`). The game
store is `src/store/gameStore.ts` plus `boardSlice.ts`
(`toggleCell`, `advanceStep`, `clearBoard`, `randomizeBoard`,
`setBoard`). The app store is `src/store/appStore.ts`: theme, board
colors, grid visibility, step delay, auto-pause minutes, random-fill
percent, panel flags, and debug counters. Rendering is `Board.tsx`,
`Cell.tsx`, and the cell rules in `src/index.css`.

The play clock stays in `GameStage`, not in `gol.ts`, so a single step
and a running loop remain different callers of one pure function.
Putting the timeout inside the simulation would make every generation wait.

`Board` paints divs. It does not draw on a canvas, so the cell that
receives the pointer event is the cell `toggleCell` flips. Do not add a
second board renderer.

Wrapping lives only inside `calculateNextState`. The UI must not keep a
second neighbor test that clips at the border.

Both stores use Zustand `persist`. The game key is
`game-of-life_game-store`. The app key is `game-of-life_app-store`.
After a reload, those saved values win over the in-code defaults.

`App` mounts `useTheme`, which sets `data-theme` and `colorScheme` on
the document element from `isDarkMode`. `useSyncBoardColors` copies the
light or dark palette into `boardBgColor`, `boardFgColor`, and
`boardGridColor`. `Board` publishes those as `--dead-color`,
`--alive-color`, and `--grid-color`. The simulation never reads a
color.

Before React starts, the inline script in `index.html` reads the
app-store key and sets the same theme attributes, so the first paint
matches the saved theme. That script does not read or write the board.

The `vite` dependency and the npm `overrides` field both pin
`rolldown-vite` at 7.1.12. Leave that pin until the human changes it.

There is no plugin API. A new behavior is a change to the layers above,
not a registration hook.
