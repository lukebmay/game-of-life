/*
 * Author: Luke Benjamin May
 * Website: lukemay.com
 *
 * Copyright © 2025-2026 Luke B. May. All rights reserved.
 *
 * This is part of my personal portfolio.
 * No permission is granted to copy, modify, distribute, or use this code.
 */
import ResetIcon from "@svg/ResetIcon";
import clsx from "clsx";
import React, { type ComponentProps } from "react";

export interface FieldSetProps extends ComponentProps<"fieldset"> {
  title: string;
  onReset?: () => void;
}

export const FieldSet: React.FC<FieldSetProps> = ({
  title,
  onReset,
  className,
  children,
  ...rest
}) => {
  if (!className) {
    className = clsx("flex", "flex-row", "justify-around", "items-stretch");
  }
  return (
    <fieldset
      className={clsx(
        "fieldset",
        "border-base-300",
        "rounded-box",
        "w-full",
        "border p-4",
        "relative",
        `${className}`,
      )}
      {...rest}
    >
      <legend className="fieldset-legend">
        {title}
        <button
          type="button"
          className={clsx("absolute", "right-1", "top-6", "cursor-pointer", "text-base-300")}
          onClick={onReset}
        >
          <ResetIcon size="1rem" />
        </button>
      </legend>

      {children}
    </fieldset>
  );
};

export default FieldSet;
