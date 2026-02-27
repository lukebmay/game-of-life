/*
 * Author: Luke Benjamin May
 * Website: lukemay.com
 *
 * Copyright © 2025-2026 Luke B. May. All rights reserved.
 *
 * This is part of my personal portfolio.
 * No permission is granted to copy, modify, distribute, or use this code.
 */
import { useCallback, useEffect, useState } from "react";

type UseNumberInputOptions = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
};

export const useNumberInput = ({
  value,
  onChange,
  min = -Infinity,
  max = Infinity,
  step = 1,
}: UseNumberInputOptions) => {
  const [localValue, setLocalValue] = useState(value.toString());

  useEffect(() => {
    setLocalValue(value.toString());
  }, [value]);

  const commit = useCallback(() => {
    const trimmed = localValue.trim();

    if (trimmed === "") {
      setLocalValue(value.toString());
      return;
    }

    const num = Number(trimmed);
    if (!isNaN(num)) {
      const clamped = Math.max(min, Math.min(max, num));
      if (clamped !== value) {
        onChange(clamped);
      }
      setLocalValue(clamped.toString());
    } else {
      setLocalValue(value.toString());
    }
  }, [localValue, value, onChange, min, max]);

  const inputProps = {
    type: "number" as const,
    value: localValue,
    min,
    max,
    step,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setLocalValue(e.target.value),
    onBlur: commit,
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") e.currentTarget.blur();
    },
  };

  return { inputProps };
};
