# Project: game-of-life

## Overview

Conway's Game of Life as a portfolio page for Luke May. Visitors edit
a cell board and run generations in the browser. The app is React,
TypeScript, and Vite. This repo does not name a deploy URL.

**Next:** [`agents/priority.md`](priority.md).

## Stack

React, TypeScript, and Vite. Zustand holds the board and the app
settings. Tailwind CSS and daisyUI style the page.

## Scripts

Names match `package.json`. Run them with npm:

- `dev` starts the Vite dev server.
- `build` runs `tsc -b` and then `vite build`.
- `preview` serves the `dist/` build.
- `lint` runs ESLint.
- `type-check` runs `tsc -b`.
- `test` prints that no tests are defined and exits successfully.
- `clean` runs `tsc -b --clean` and removes `dist/`.
- `rebuild` runs `clean`, then `build`.

How a click or a tick becomes the next board is
[`architecture.md`](architecture.md).
