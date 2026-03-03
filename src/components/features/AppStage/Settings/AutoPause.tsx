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
import DecreaseIcon from "@svg/DecreaseIcon";
import DecreaseMinIcon from "@svg/DecreaseMinIcon";
import IncreaseIcon from "@svg/IncreaseIcon";
import IncreaseMaxIcon from "@svg/IncreaseMaxIcon";
import FieldSet from "@ui/FieldSet";
import clsx from "clsx";
import React from "react";

const AutoPause: React.FC = () => {
  const cmpClass = "cmp_settings_auto-pause";

  const autoPauseAfterSeconds = useAppStore((state) => state.autoPauseAfterSeconds);
  const setAutoPauseAfterSeconds = useAppStore((state) => state.setAutoPauseAfterSeconds);
  const resetAutoPauseAfterSeconds = useAppStore((state) => state.resetAutoPauseAfterSeconds);

  const secondsInput = useNumberInput({
    value: autoPauseAfterSeconds,
    onChange: setAutoPauseAfterSeconds,
    min: -1,
    max: 36000,
    step: 1,
  });

  // Smart delta
  const increase = () => {
    let current = autoPauseAfterSeconds;
    if (current === -1) current = 0;

    let delta = 3750;
    if (current < 10) delta = 1;
    else if (current < 60) delta = 6;
    else if (current < 300) delta = 30;
    else if (current < 1500) delta = 150;
    else if (current < 7500) delta = 750;

    setAutoPauseAfterSeconds(Math.min(36000, current + delta));
  };

  const decrease = () => {
    let current = autoPauseAfterSeconds;
    if (current === -1) return;

    let delta = 3750;
    if (current <= 10) delta = 1;
    else if (current <= 60) delta = 6;
    else if (current <= 300) delta = 30;
    else if (current <= 1500) delta = 150;
    else if (current <= 7500) delta = 750;

    setAutoPauseAfterSeconds(Math.max(-1, current - delta));
  };

  const decreaseMin = () => setAutoPauseAfterSeconds(-1);
  const increaseMax = () => setAutoPauseAfterSeconds(36000);

  const resetHandler = () => {
    resetAutoPauseAfterSeconds();
  };

  return (
    <FieldSet
      title="Auto-Pause After (seconds)"
      className={clsx("flex flex-row justify-around gap-x-0.5", cmpClass)}
      onReset={resetHandler}
    >
      <label className={clsx("label flex flex-col")}>
        <button type="button" className="btn" onClick={decreaseMin}>
          <DecreaseMinIcon />
        </button>
      </label>

      <label className={clsx("label flex flex-col")}>
        <button type="button" className="btn" onClick={decrease}>
          <DecreaseIcon />
        </button>
      </label>

      <div className="label flex flex-col w-17">
        Delay (s)
        <input className="input input-primary text-center text-lg" {...secondsInput.inputProps} />
      </div>

      <label className={clsx("label flex flex-col")}>
        <button type="button" className="btn" onClick={increase}>
          <IncreaseIcon />
        </button>
      </label>

      <label className={clsx("label flex flex-col")}>
        <button type="button" className="btn" onClick={increaseMax}>
          <IncreaseMaxIcon />
        </button>
      </label>
    </FieldSet>
  );
};

export default AutoPause;
