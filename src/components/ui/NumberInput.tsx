/*
 * Author: Luke Benjamin May
 * Website: lukemay.com
 *
 * Copyright © 2025-2026 Luke B. May. All rights reserved.
 *
 * This is part of my personal portfolio.
 * No permission is granted to copy, modify, distribute, or use this code.
 */
import DecreaseIcon from "@svg/DecreaseIcon";
import DecreaseMinIcon from "@svg/DecreaseMinIcon";
import IncreaseIcon from "@svg/IncreaseIcon";
import IncreaseMaxIcon from "@svg/IncreaseMaxIcon";
import clsx from "clsx";
import React, { useCallback, useEffect, useRef, useState } from "react";

type NumberInputProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "type" | "min" | "max" | "step"
>;

const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  min = -Infinity,
  max = Infinity,
  step = 1,
  className,
  ...props
}) => {
  const [localValue, setLocalValue] = useState(String(value));
  const lastCommittedRef = useRef(value);

  const minNum = Number(min);
  const maxNum = Number(max);
  const stepNum = Number(step);

  const hasMin = Number.isFinite(minNum);
  const hasMax = Number.isFinite(maxNum);

  const valueNum = Number(localValue) || 0;

  useEffect(() => {
    const externalStr = String(value);
    if (externalStr !== String(lastCommittedRef.current)) {
      setLocalValue(externalStr);
      lastCommittedRef.current = value;
    }
  }, [value]);

  const commit = useCallback(() => {
    const trimmed = String(localValue ?? "").trim();
    if (trimmed === "") {
      setLocalValue(String(value));
      lastCommittedRef.current = value;
      return;
    }

    const num = Number(trimmed);
    if (!isNaN(num)) {
      const clamped = Math.max(minNum, Math.min(maxNum, num));
      if (clamped !== value) onChange(clamped);
      setLocalValue(String(clamped));
      lastCommittedRef.current = clamped;
    } else {
      setLocalValue(String(value));
      lastCommittedRef.current = value;
    }
  }, [localValue, value, onChange, minNum, maxNum]);

  const triggerChange = useCallback(
    (newValue: number) => {
      const clamped = Math.max(minNum, Math.min(maxNum, newValue));
      onChange(clamped);
      setLocalValue(String(clamped));
      lastCommittedRef.current = clamped;
    },
    [onChange, minNum, maxNum],
  );

  return (
    <div className={clsx("group relative input w-fit", className)}>
      <input
        type="number"
        className="flex-1 text-center text-lg no-spinners"
        value={localValue}
        min={minNum}
        max={maxNum}
        step={stepNum}
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
        {...props}
      />

      {(hasMin || hasMax) && (
        <div className="absolute left-[var(--border)] top-[var(--border)] bottom-[var(--border)] flex opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 z-10">
          <div className="flex flex-col">
            {hasMax && (
              <button
                type="button"
                className="btn btn-soft flex-1 p-0 m-0 rounded-tl-sm rounded-b-none rounded-tr-none"
                onClick={() => triggerChange(maxNum)}
              >
                <IncreaseMaxIcon className="h-4 w-4" />
              </button>
            )}
            {hasMin && (
              <button
                type="button"
                className="btn btn-soft flex-1 p-0 m-0 rounded-bl-sm rounded-t-none rounded-br-none"
                onClick={() => triggerChange(minNum)}
              >
                <DecreaseMinIcon className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      )}

      <div className="absolute right-[var(--border)] top-[var(--border)] bottom-[var(--border)] flex opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 z-10">
        <div className="flex flex-col">
          <button
            type="button"
            className="btn btn-soft flex-1 p-0 m-0 rounded-tr-sm rounded-b-none rounded-tl-none"
            onClick={() => triggerChange(valueNum + stepNum)}
          >
            <IncreaseIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="btn btn-soft flex-1 p-0 m-0 rounded-br-sm rounded-t-none rounded-bl-none"
            onClick={() => triggerChange(valueNum - stepNum)}
          >
            <DecreaseIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NumberInput;
