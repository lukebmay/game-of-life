/*
 * Author: Luke Benjamin May
 * Website: lukemay.com
 *
 * Copyright © 2025-2026 Luke B. May. All rights reserved.
 *
 * This is part of my personal portfolio.
 * No permission is granted to copy, modify, distribute, or use this code.
 */
import { useAppStore } from "@store/appStore";
import FieldSet from "@ui/FieldSet";
import NumberInput from "@ui/NumberInput";
import clsx from "clsx";
import React from "react";

const AutoFillAlivePercentage: React.FC = () => {
  const cmpClass = "cmp_settings_auto-fill-alive-percentage";

  const alivePercentage = useAppStore((state) => state.autoFillAlivePercentage);
  const setAivePercentage = useAppStore((state) => state.setAutoFillAlivePercentage);
  const resetAlivePercentage = useAppStore((state) => state.resetAutoFillAlivePercentage);

  const resetHandler = () => {
    resetAlivePercentage();
  };

  const alivePercentageInput = {
    value: alivePercentage,
    onChange: setAivePercentage,
    min: 0,
    max: 100,
    step: 5,
  };

  return (
    <FieldSet
      title="Auto-fill Alive Cells"
      className={clsx("flex", "flex-row", "justify-around", cmpClass)}
      onReset={resetHandler}
    >
      <label className={clsx("label", "flex", "flex-col")}>
        Alive Cells (%)
        <NumberInput
          id="auto-fill-alive-percentage"
          className="input-primary"
          {...alivePercentageInput}
        />
      </label>
    </FieldSet>
  );
};

export default AutoFillAlivePercentage;
