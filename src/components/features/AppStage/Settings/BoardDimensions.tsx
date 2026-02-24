/*
 * Author: Luke Benjamin May
 * Website: lukemay.com
 *
 * Copyright © 2025-2026 Luke B. May. All rights reserved.
 *
 * This is part of my personal portfolio.
 * No permission is granted to copy, modify, distribute, or use this code.
 */
import { useGameStore } from "@store/gameStore";
import FieldSet from "@ui/FieldSet";
import clsx from "clsx";
import React from "react";

const BoardDimensions: React.FC = () => {
  const cmpClass = "cmp_settings_board-dimensions";

  const rows = useGameStore((state) => state.rows);
  const setRows = useGameStore((state) => state.setRows);
  const resetRows = useGameStore((state) => state.resetRows);

  const cols = useGameStore((state) => state.cols);
  const setCols = useGameStore((state) => state.setCols);
  const resetCols = useGameStore((state) => state.resetCols);

  const resetHandler = () => {
    resetRows();
    resetCols();
  };

  return (
    <FieldSet
      title="Board Dimensions"
      className={clsx("flex", "flex-row", "justify-around", cmpClass)}
      onReset={resetHandler}
    >
      <label className={clsx("label", "flex", "flex-col")}>
        Rows
        <input
          id="settings_rows"
          type="number"
          className="input input-primary text-center text-xl"
          min={10}
          max={100}
          step={10}
          value={rows}
          onChange={(e) => {
            const r = parseInt(e.target.value);
            if (!isNaN(r)) {
              setRows(r);
            }
          }}
        />
      </label>
      <label className={clsx("label", "flex", "flex-col")}>
        Columns
        <input
          id="settings_cols"
          type="number"
          className="input input-primary text-center text-xl"
          min={10}
          max={100}
          step={10}
          value={cols}
          onChange={(e) => {
            const c = parseInt(e.target.value);
            if (!isNaN(c)) {
              setCols(c);
            }
          }}
        />
      </label>
    </FieldSet>
  );
};

export default BoardDimensions;
