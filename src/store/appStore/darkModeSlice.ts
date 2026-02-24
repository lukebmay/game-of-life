import { type SliceCreator, type ValidatorMap, generateGetSetReset } from "@store/storeUtils";
import type { AppStore } from "../appStore";

export const defaults = {
  isDarkMode: false,
};

const validators = {} satisfies ValidatorMap<typeof defaults>;

const basicStateOps = generateGetSetReset(defaults, validators);

export interface DarkModeSlice extends ReturnType<typeof basicStateOps> {}

export const createDarkModeSlice: SliceCreator<DarkModeSlice, AppStore> = (set, get) => ({
  ...basicStateOps(set, get),
  isDarkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
});
