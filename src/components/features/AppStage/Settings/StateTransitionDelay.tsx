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

const StateTransitionDelay: React.FC = () => {
  const cmpClass = "cmp_settings_state-transition-delay";

  const stateTransitionDelay = useAppStore((state) => state.stateTransitionDelay);
  const setStateTransitionDelay = useAppStore((state) => state.setStateTransitionDelay);
  const resetStateTransitionDelay = useAppStore((state) => state.resetStateTransitionDelay);

  // Use our reusable hook
  const delayInput = useNumberInput({
    value: stateTransitionDelay,
    onChange: setStateTransitionDelay,
    min: 0,
    max: 10000,
    step: 1,
  });

  // Button handlers (unchanged — they still work instantly)
  const increaseDelay = () => {
    const delay = Math.max(0, Math.min(10000, stateTransitionDelay));
    let delta = 1000;
    if (delay < 10) delta = 1;
    else if (delay < 50) delta = 5;
    else if (delay < 100) delta = 10;
    else if (delay < 500) delta = 50;
    else if (delay < 1000) delta = 100;
    else if (delay < 5000) delta = 500;

    setStateTransitionDelay(Math.min(10000, delay + delta));
  };

  const decreaseDelay = () => {
    const delay = Math.max(0, Math.min(10000, stateTransitionDelay));
    let delta = 1000;
    if (delay <= 10) delta = 1;
    else if (delay <= 50) delta = 5;
    else if (delay <= 100) delta = 10;
    else if (delay <= 500) delta = 50;
    else if (delay <= 1000) delta = 100;
    else if (delay <= 5000) delta = 500;

    setStateTransitionDelay(Math.max(0, delay - delta));
  };

  const increaseMaxDelay = () => setStateTransitionDelay(10000);
  const decreaseMinDelay = () => setStateTransitionDelay(0);

  const resetHandler = () => {
    resetStateTransitionDelay();
  };

  return (
    <FieldSet
      title="State Transition Delay (ms)"
      className={clsx("flex", "flex-row", "justify-around", "gap-x-0.5", cmpClass)}
      onReset={resetHandler}
    >
      <label className={clsx("label", "flex", "flex-col")}>
        <button type="button" className="btn" onClick={decreaseMinDelay}>
          <DecreaseMinIcon />
        </button>
      </label>

      <label className={clsx("label", "flex", "flex-col")}>
        <button type="button" className="btn" onClick={decreaseDelay}>
          <DecreaseIcon />
        </button>
      </label>

      <div className="label flex flex-col w-17">
        Delay (ms)
        <input className="input input-primary text-center text-lg" {...delayInput.inputProps} />
      </div>

      <label className={clsx("label", "flex", "flex-col")}>
        <button type="button" className="btn" onClick={increaseDelay}>
          <IncreaseIcon />
        </button>
      </label>

      <label className={clsx("label", "flex", "flex-col")}>
        <button type="button" className="btn" onClick={increaseMaxDelay}>
          <IncreaseMaxIcon />
        </button>
      </label>
    </FieldSet>
  );
};

export default StateTransitionDelay;
