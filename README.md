# Game of Life

Conway's Game of Life as a portfolio page for Luke May. A visitor
edits a board of cells and watches generations run in the browser.
The app is React, TypeScript, and Vite.

This repo does not record a deploy URL. Run it locally.

## Install

```bash
npm install
```

## Run

```bash
npm test
npm run dev
npm run deploy
```

`dev` execs the local Vite binary on 127.0.0.1 port 5173. Vite prints
the local URL.

From the lukemay.com repo root:

```bash
npm run game-of-life test
npm run game-of-life dev
npm run game-of-life deploy
```

`deploy plan` prints the rsync and does not run it. A dashed flag needs
`--` (`npm run game-of-life -- dev --port 9000`). Positional locations
do not.

## Build

```bash
npm run build
```

That type-checks, then writes a static site to `dist/`. Serve that
build locally with:

```bash
npm run preview
```
