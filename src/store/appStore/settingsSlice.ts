/*
 * Author: Luke Benjamin May
 * Website: lukemay.com
 *
 * Copyright © 2025-2026 Luke B. May. All rights reserved.
 *
 * This is part of my personal portfolio.
 * No permission is granted to copy, modify, distribute, or use this code.
 */
import { type SliceCreator, type ValidatorMap, generateGetSetReset } from "@store/storeUtils";
import type { AppStore } from "../appStore";

export const defaults = {
  isSettingsVisible: false,
  boardBgColor: "#000000",
  boardBgColorDark: "#000000",
  boardBgColorLight: "#FFFFFF",
  boardFgColor: "#3311bb",
  boardFgColorDark: "#3311bb",
  boardFgColorLight: "#22cc77",
  boardGridColor: "#222222",
  boardGridColorDark: "#222222",
  boardGridColorLight: "#bbbbbb",
  isGridVisible: true,
  stateTransitionDelay: 200,
  isDebugInfoVisible: false,
  autoPauseAfterSeconds: 600,
  autoFillAlivePercentage: 30.0,
};

const validateRGBString = (value: string): boolean => /^#[0-9abcfef]{6}$/i.test(value);
const validators = {
  boardBgColorDark: validateRGBString,
  boardBgColorLight: validateRGBString,
  boardFgColorDark: validateRGBString,
  boardFgColorLight: validateRGBString,
  boardGridColorDark: validateRGBString,
  boardGridColorLight: validateRGBString,
  stateTransitionDelay: (value: number) => Number.isInteger(value) && value >= 0 && value <= 10000,
  autoPauseAfterSeconds: (value: number) =>
    Number.isInteger(value) && value >= -1 && value <= 36000,
  autoFillAlivePercentage: (value: number) => value >= 0 && value <= 100,
} satisfies ValidatorMap<typeof defaults>;

const basicStateOps = generateGetSetReset(defaults, validators);

export interface SettingsSlice extends ReturnType<typeof basicStateOps> {
  syncBoardColors: () => void;
}

export const createSettingsSlice: SliceCreator<SettingsSlice, AppStore> = (set, get) => ({
  ...basicStateOps(set, get),
  syncBoardColors: () => {
    const {
      isDarkMode,
      boardBgColorDark,
      boardBgColorLight,
      boardFgColorDark,
      boardFgColorLight,
      boardGridColorDark,
      boardGridColorLight,
    } = get();

    set((draft) => {
      draft.boardBgColor = isDarkMode ? boardBgColorDark : boardBgColorLight;
      draft.boardFgColor = isDarkMode ? boardFgColorDark : boardFgColorLight;
      draft.boardGridColor = isDarkMode ? boardGridColorDark : boardGridColorLight;
    });
  },
});
