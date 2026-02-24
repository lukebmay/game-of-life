import { type SliceCreator, type ValidatorMap, generateGetSetReset } from "@store/storeUtils";
import type { AppStore } from "../appStore";

export type RenderMinMaxAvg = {
  min: number | null;
  max: number | null;
  avg: number | null;
};

export type RenderStats = {
  deltas: number[];
  then: number | null;
  last10: RenderMinMaxAvg | null;
  last100: RenderMinMaxAvg | null;
  last1000: RenderMinMaxAvg | null;
};

export const defaults: { renderStats: RenderStats } = {
  renderStats: {
    deltas: [],
    then: null,
    last10: null,
    last100: null,
    last1000: null,
  },
};

const validators = {} satisfies ValidatorMap<typeof defaults>;

const basicStateOps = generateGetSetReset(defaults, validators);

export interface DebugSlice extends ReturnType<typeof basicStateOps> {
  updateRenderStats: (now: number) => void;
}

export const createDebugSlice: SliceCreator<DebugSlice, AppStore> = (set, get) => ({
  ...basicStateOps(set, get),
  updateRenderStats: (now) => {
    const { renderStats } = get();
    if (renderStats.then !== null) {
      const delta = now - renderStats.then;
      const last1000Deltas = [...renderStats.deltas, delta].slice(-1000);

      const last10Deltas = last1000Deltas.slice(-10);
      const last10 =
        last10Deltas.length >= 10
          ? {
              min: Math.min(...last10Deltas),
              max: Math.max(...last10Deltas),
              avg: last10Deltas.reduce((s, v) => s + v, 0) / last10Deltas.length,
            }
          : null;

      const last100Deltas = last1000Deltas.slice(-100);
      const last100 =
        last100Deltas.length >= 100
          ? {
              min: Math.min(...last100Deltas),
              max: Math.max(...last100Deltas),
              avg: last100Deltas.reduce((s, v) => s + v, 0) / last100Deltas.length,
            }
          : null;

      const last1000 =
        last1000Deltas.length >= 1000
          ? {
              min: Math.min(...last1000Deltas),
              max: Math.max(...last1000Deltas),
              avg: last1000Deltas.reduce((s, v) => s + v, 0) / last1000Deltas.length,
            }
          : null;

      set((draft) => {
        draft.renderStats.deltas = last1000Deltas;
        draft.renderStats.then = now;
        draft.renderStats.last10 = last10;
        draft.renderStats.last100 = last100;
        draft.renderStats.last1000 = last1000;
      });
    } else {
      set((draft) => {
        draft.renderStats.then = now;
      });
    }
  },
});
