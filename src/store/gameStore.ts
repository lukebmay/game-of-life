/*
 * Author: Luke Benjamin May
 * Website: lukemay.com
 *
 * Copyright © 2025-2026 Luke B. May. All rights reserved.
 *
 * This is part of my personal portfolio.
 * No permission is granted to copy, modify, distribute, or use this code.
 */
import { create } from "zustand";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { type BoardSlice, createBoardSlice } from "./gameStore/boardSlice.ts";

export interface GameStore extends BoardSlice {}

export const useGameStore = create<GameStore>()(
  devtools(
    persist(
      immer(
        subscribeWithSelector((set, get, api) => ({
          ...createBoardSlice(set, get, api),
        })),
      ),
      {
        name: "game-of-life_game-store", // localStorage key
        // partialize: (state) => ({}), // use for only part of state to be stored in localStorage
      },
    ),
    { name: "Game Store" },
  ),
);
