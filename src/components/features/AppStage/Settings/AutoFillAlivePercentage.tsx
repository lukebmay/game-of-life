/*
 * Author: Luke Benjamin May
 * Website: lukemay.com
 *
 * Copyright © 2025-2026 Luke B. May. All rights reserved.
 *
 * This is part of my personal portfolio.
 * No permission is granted to copy, modify, distribute, or use this code.
 */
import { useNumberInput } from "@hooks/useNumberInput";
import { useAppStore } from "@store/appStore";
import FieldSet from "@ui/FieldSet";
import clsx from "clsx";
import React from "react";

const BoardDimensions: React.FC = () => {
  const cmpClass = "cmp_settings_autoFillAlivePercentage";

  const alivePercentage = useAppStore((state) => state.autoFillAlivePercentage);
  const setAivePercentage = useAppStore((state) => state.setAutoFillAlivePercentage);
  const resetAlivePercentage = useAppStore((state) => state.resetAutoFillAlivePercentage);

  const resetHandler = () => {
    resetAlivePercentage();
  };

  const alivePercentageInput = useNumberInput({
    value: alivePercentage,
    onChange: setAivePercentage,
    min: 0,
    max: 100,
    step: 5,
  });

  return (
    <FieldSet
      title="Auto-fill Alive Percentage"
      className={clsx("flex", "flex-row", "justify-around", cmpClass)}
      onReset={resetHandler}
    >
      <label className={clsx("label", "flex", "flex-col")}>
        Percentage of Alive Cells
        <input
          id="settings_rows"
          className="input input-primary text-center text-xl"
          {...alivePercentageInput.inputProps}
        />
      </label>
    </FieldSet>
  );
};

export default BoardDimensions;
