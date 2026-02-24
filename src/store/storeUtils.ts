import type { StateCreator } from "zustand";

export type Immer = ["zustand/immer", never];

export type SliceCreator<Slice, FullStore = unknown> = StateCreator<FullStore, [Immer], [], Slice>;

export type Validator<T> = (newValue: T, currentValue: T) => boolean;

export type ValidatorMap<T> = {
  [K in keyof T]?: Validator<T[K]>;
};

export type BasicStateKeys<T> = {
  [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void;
} & {
  [K in keyof T as `reset${Capitalize<string & K>}`]: () => void;
} & {
  [K in keyof T as T[K] extends boolean ? `toggle${Capitalize<string & K>}` : never]: () => void;
};

export const generateGetSetReset =
  <T extends object>(defaults: T, validators: ValidatorMap<T> = {} as ValidatorMap<T>) =>
  (set: any, get: () => T) => ({
    ...defaults,

    // Setters with optional validation
    ...(Object.fromEntries(
      Object.entries(defaults).map(([key]) => {
        const validator = validators[key as keyof T];
        const setterName = `set${key[0].toUpperCase() + key.slice(1)}`;

        return [
          setterName,
          (value: unknown) => {
            if (validator) {
              const currentValue = get()[key as keyof T];
              if (!validator(value as T[keyof T], currentValue)) return;
            }
            set((draft: T) => {
              (draft as any)[key] = value;
            });
          },
        ];
      }),
    ) as BasicStateKeys<T>),

    // Resetters
    ...(Object.fromEntries(
      Object.keys(defaults).map((key) => [
        `reset${key[0].toUpperCase() + key.slice(1)}`,
        () =>
          set((draft: T) => {
            (draft as any)[key] = defaults[key as keyof T];
          }),
      ]),
    ) as BasicStateKeys<T>),

    // Toggles (only for booleans)
    ...(Object.fromEntries(
      Object.entries(defaults)
        .filter(([, v]) => typeof v === "boolean")
        .map(([key]) => [
          `toggle${key[0].toUpperCase() + key.slice(1)}`,
          () =>
            set((draft: T) => {
              (draft as any)[key] = !(draft as any)[key];
            }),
        ]),
    ) as BasicStateKeys<T>),
  });
