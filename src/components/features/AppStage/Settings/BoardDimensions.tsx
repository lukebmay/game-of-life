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
import NumberInput from "@ui/NumberInput";
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

  const rowsInput = {
    value: rows,
    onChange: setRows,
    min: 10,
    max: 200,
    step: 10,
  };

  const colsInput = {
    value: cols,
    onChange: setCols,
    min: 10,
    max: 200,
    step: 10,
  };

  return (
    <FieldSet
      title="Board Dimensions"
      className={clsx("flex", "flex-row", "justify-around", cmpClass)}
      onReset={resetHandler}
    >
      <label className={clsx("label", "flex", "flex-col")}>
        Rows (10-200)
        <NumberInput id="board-dimensions_rows" className="input-primary" {...rowsInput} />
      </label>

      <label className={clsx("label", "flex", "flex-col")}>
        Columns (10-200)
        <NumberInput id="board-dimensions_cols" className="input-primary" {...colsInput} />
      </label>
    </FieldSet>
  );
};

export default BoardDimensions;
