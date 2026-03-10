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

const AutoPause: React.FC = () => {
  const cmpClass = "cmp_settings_auto-pause";

  const autoPauseAfterMinutes = useAppStore((state) => state.autoPauseAfterMinutes);
  const setAutoPauseAfterMinutes = useAppStore((state) => state.setAutoPauseAfterMinutes);
  const resetAutoPauseAfterMinutes = useAppStore((state) => state.resetAutoPauseAfterMinutes);

  const delayInput = {
    value: autoPauseAfterMinutes,
    onChange: setAutoPauseAfterMinutes,
    min: 0,
    max: 1440,
    step: 5,
  };

  const resetHandler = () => {
    resetAutoPauseAfterMinutes();
  };

  return (
    <FieldSet
      title="Auto-Pause Delay"
      className={clsx("flex", "flex-row", "justify-around", cmpClass)}
      onReset={resetHandler}
    >
      <label className={clsx("label", "flex", "flex-col")}>
        Delay (min)
        <NumberInput id="auto-pause" className="input-primary" {...delayInput} />
      </label>
    </FieldSet>
  );
};

export default AutoPause;
