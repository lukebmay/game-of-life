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
import { type DarkModeSlice, createDarkModeSlice } from "./appStore/darkModeSlice.ts";
import { type DebugSlice, createDebugSlice } from "./appStore/debugSlice.ts";
import { type SettingsSlice, createSettingsSlice } from "./appStore/settingsSlice.ts";

export interface AppStore extends DarkModeSlice, SettingsSlice, DebugSlice {}

export const useAppStore = create<AppStore>()(
  devtools(
    persist(
      immer(
        subscribeWithSelector((set, get, api) => ({
          ...createDarkModeSlice(set, get, api),
          ...createSettingsSlice(set, get, api),
          ...createDebugSlice(set, get, api),
        })),
      ),
      {
        name: "game-of-life_app-store", // localStorage key
        // partialize: (state) => ({
        //   isDarkMode: state.isDarkMode,
        //   isSettingsVisible: state.isSettingsVisible,
        //   boardBgColor: state.boardBgColor,
        //   boardFgColor: state.boardFgColor,
        //   boardGridColor: state.boardGridColor,
        //   isGridVisible: state.isGridVisible,
        //   stateTransitionDelay: state.stateTransitionDelay,
        //   isDebugInfoVisible: state.isDebugInfoVisible,
        // }),
      },
    ),
    { name: "App Store" },
  ),
);
