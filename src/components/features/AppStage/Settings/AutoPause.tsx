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

  const autoPauseAfterSeconds = useAppStore((state) => state.autoPauseAfterSeconds);
  const setAutoPauseAfterSeconds = useAppStore((state) => state.setAutoPauseAfterSeconds);
  const resetAutoPauseAfterSeconds = useAppStore((state) => state.resetAutoPauseAfterSeconds);

  const delayInput = {
    value: autoPauseAfterSeconds,
    onChange: setAutoPauseAfterSeconds,
    min: -1,
    max: 36000,
    step: 60,
  };

  const resetHandler = () => {
    resetAutoPauseAfterSeconds();
  };

  return (
    <FieldSet
      title="Auto-Pause Delay"
      className={clsx("flex", "flex-row", "justify-around", cmpClass)}
      onReset={resetHandler}
    >
      <label className={clsx("label", "flex", "flex-col")}>
        Delay (s)
        <NumberInput id="auto-pause" className="input-primary" {...delayInput} />
      </label>
    </FieldSet>
  );
};

export default AutoPause;
