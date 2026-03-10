/*
 * Author: Luke Benjamin May
 * Website: lukemay.com
 *
 * Copyright © 2025-2026 Luke B. May. All rights reserved.
 *
 * This is part of my personal portfolio.
 * No permission is granted to copy, modify, distribute, or use this code.
 */
import AcceptIcon from "@svg/AcceptIcon";
import CancelIcon from "@svg/CancelIcon";
import clsx from "clsx";
import React, { useEffect, useId, useRef, useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { useOnClickOutside } from "usehooks-ts";

type ColorSelectorProps = { color: string; onChange: (color: string) => void };

function isValidHexColor(color: string): boolean {
  return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(color);
}

const ColorSelector: React.FC<ColorSelectorProps> = ({ color, onChange }) => {
  const popoverId = useId();
  const inputId = useId();
  const anchorName = `--color-anchor-${popoverId}`;

  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [tmpColor, setTmpColor] = useState(color);

  useEffect(() => {
    setTmpColor(color);
  }, [color]);

  const handlePopoverOpen = () => {
    if (popoverRef?.current?.matches(":popover-open")) {
      popoverRef?.current?.hidePopover();
    } else {
      popoverRef?.current?.showPopover();
    }
  };

  const handleAccept = () => {
    if (isValidHexColor(tmpColor)) {
      onChange(tmpColor);
    }
    popoverRef?.current?.hidePopover();
  };

  const handleCancel = () => {
    setTmpColor(color);
    popoverRef?.current?.hidePopover();
  };

  const handlePickerChange = (newColor: string) => {
    if (isValidHexColor(newColor)) {
      setTmpColor(newColor);
    }
  };

  const handlePickerInputChange = (newColor: string) => {
    if (isValidHexColor(newColor)) {
      setTmpColor(newColor);
    }
  };

  useOnClickOutside(
    [popoverRef as React.RefObject<HTMLElement>, buttonRef as React.RefObject<HTMLElement>],
    (e) => {
      handleCancel();
      e.stopPropagation();
    },
    "mousedown",
  );

  return (
    <>
      <button
        ref={buttonRef}
        className="btn h-auto p-2 rounded-box"
        style={{ anchorName } as React.CSSProperties}
        onClick={handlePopoverOpen}
      >
        <div className="text-center flex flex-col items-center justify-around">
          <div
            className={clsx([
              "w-24",
              "h-10",
              "rounded-box border",
              "dark:border-neutral-300",
              "border-neutral-800",
            ])}
            style={{ backgroundColor: tmpColor }}
          ></div>
          <span className="text-xl w-full">{tmpColor}</span>
        </div>
      </button>
      <div
        id={popoverId}
        ref={popoverRef}
        className="inset-auto fixed overflow-visible rounded-box border"
        style={
          {
            margin: "unset",
            top: "anchor(bottom)",
            left: "anchor(left)",
            translate: "0 8px",
            positionAnchor: anchorName,
            positionTryOptions: "flip-block, flip-inline, flip-block flip-inline",
          } as React.CSSProperties
        }
        onClick={(e) => e.preventDefault()}
        popover="manual"
      >
        <div className="flex flex-col">
          <HexColorPicker color={tmpColor} onChange={handlePickerChange} />
          <HexColorInput
            id={inputId}
            className="text-lg w-50"
            prefixed={true}
            color={tmpColor}
            onChange={handlePickerInputChange}
          />
          <div className="flex flex-row">
            <button className="btn rounded-box w-25" onClick={handleCancel}>
              <CancelIcon style={{ color: "#cc1144" }} />
            </button>
            <button className="btn rounded-box w-25" onClick={handleAccept}>
              <AcceptIcon style={{ color: "#22aa55" }} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ColorSelector;
