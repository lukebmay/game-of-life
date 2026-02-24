/*
 * Author: Luke Benjamin May
 * Website: lukemay.com
 *
 * Copyright © 2025-2026 Luke B. May. All rights reserved.
 *
 * This is part of my personal portfolio.
 * No permission is granted to copy, modify, distribute, or use this code.
 */
import gol, { type Board } from "@engine/gol";
import { type SliceCreator, type ValidatorMap, generateGetSetReset } from "@store/storeUtils";
import type { GameStore } from "../gameStore";

const [rows, cols] = [40, 40];

export const defaults = {
  rows,
  cols,
  board: gol.initEmptyBoard(rows, cols),
  isPaused: true,
};

const validators = {
  rows: (value: number) => Number.isInteger(value) && value >= 10 && value <= 100,
  cols: (value: number) => Number.isInteger(value) && value >= 10 && value <= 100,
} satisfies ValidatorMap<typeof defaults>;

const basicStateOps = generateGetSetReset(defaults, validators);

export interface BoardSlice extends ReturnType<typeof basicStateOps> {
  setBoard: (board: Board | ((prev: Board) => Board)) => void;
  advanceStep: () => void;
  clearBoard: () => void;
  toggleCell: (row: number, col: number) => void;
}

export const createBoardSlice: SliceCreator<BoardSlice, GameStore> = (set, get) => ({
  ...basicStateOps(set, get),

  setBoard: (updater) =>
    set((draft) => {
      draft.board = typeof updater === "function" ? updater(draft.board) : updater;
    }),
  advanceStep: () =>
    set((draft) => {
      draft.board = gol.calculateNextState(draft.board);
    }),
  clearBoard: () =>
    set((draft) => {
      draft.board = gol.initEmptyBoard(draft.rows, draft.cols);
    }),
  toggleCell: (row, col) =>
    set((draft) => {
      draft.board[row][col] = !draft.board[row][col];
    }),
});
