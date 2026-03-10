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

const StateTransitionDelay: React.FC = () => {
  const cmpClass = "cmp_settings_state-transition-delay";

  const stateTransitionDelay = useAppStore((state) => state.stateTransitionDelay);
  const setStateTransitionDelay = useAppStore((state) => state.setStateTransitionDelay);
  const resetStateTransitionDelay = useAppStore((state) => state.resetStateTransitionDelay);

  const delayInput = {
    value: stateTransitionDelay,
    onChange: setStateTransitionDelay,
    min: 0,
    max: 10000,
    step: 100,
  };

  const resetHandler = () => {
    resetStateTransitionDelay();
  };

  return (
    <FieldSet
      title="State Transition Delay"
      className={clsx("flex", "flex-row", "justify-around", cmpClass)}
      onReset={resetHandler}
    >
      <label className={clsx("label", "flex", "flex-col")}>
        Delay (ms)
        <NumberInput id="state-transition-delay" className="input-primary" {...delayInput} />
      </label>
    </FieldSet>
  );
};

export default StateTransitionDelay;
