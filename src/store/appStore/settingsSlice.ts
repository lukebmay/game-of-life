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
  boardFgColor: "#3311bb",
  boardGridColor: "#222222",
  isGridVisible: true,
  stateTransitionDelay: 200,
  isDebugInfoVisible: false,
  autoPauseAfterSeconds: 120,
  autoFillAlivePercentage: 30.0,
};

const validateRGBString = (value: string): boolean => /^#[0-9abcfef]{6}$/i.test(value);
const validators = {
  boardBgColor: validateRGBString,
  boardFgColor: validateRGBString,
  boardGridColor: validateRGBString,
  stateTransitionDelay: (value: number) => Number.isInteger(value) && value >= 0 && value <= 10000,
  autoPauseAfterSeconds: (value: number) =>
    Number.isInteger(value) && value >= -1 && value <= 36000,
  autoFillAlivePercentage: (value: number) => value >= 0 && value <= 100,
} satisfies ValidatorMap<typeof defaults>;

const basicStateOps = generateGetSetReset(defaults, validators);

export interface SettingsSlice extends ReturnType<typeof basicStateOps> {}

export const createSettingsSlice: SliceCreator<SettingsSlice, AppStore> = (set, get) => ({
  ...basicStateOps(set, get),
});
