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
import { HexColorPicker } from "react-colorful";
import { useOnClickOutside } from "usehooks-ts";

type ColorSelectorProps = { color: string; onChange: (color: string) => void };

const isValidHexColor = (color: string): boolean => {
  return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(color);
};

const cleanDisplayHex = (input: string): string => {
  return input
    .replace(/[^0-9a-f]/gi, "")
    .slice(0, 6)
    .toLowerCase();
};

const ColorSelector: React.FC<ColorSelectorProps> = ({ color, onChange }) => {
  const popoverId = useId();
  const anchorName = `--color-anchor-${popoverId}`;

  const popoverRef = useRef<HTMLDivElement>(null);
  const mainButtonRef = useRef<HTMLButtonElement>(null);
  const hexInputRef = useRef<HTMLInputElement>(null);

  const [tmpColor, setTmpColor] = useState(color);
  const [displayHex, setDisplayHex] = useState(cleanDisplayHex(color));


  useEffect(() => {
    setTmpColor(color);
    setDisplayHex(cleanDisplayHex(color));
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
  setDisplayHex(cleanDisplayHex(color));
  popoverRef?.current?.hidePopover();
};
  const handlePickerChange = (newColor: string) => {
  if (isValidHexColor(newColor)) {
    setTmpColor(newColor);
    setDisplayHex(cleanDisplayHex(newColor));
  }
};

  const handleHexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = cleanDisplayHex(e.target.value)
    setDisplayHex(value);
    if (value.length === 3 || value.length === 6) {
      const normalized = value.length === 3
        ? value.split("").map((c) => c + c).join("")
        : value;
      const fullColor = `#${normalized}`;
      if (isValidHexColor(fullColor)) setTmpColor(fullColor);
    }
  };



  useOnClickOutside(
    [popoverRef as React.RefObject<HTMLElement>, mainButtonRef as React.RefObject<HTMLElement>],
    (e) => {
      handleCancel();
      e.stopPropagation();
    },
    "mousedown",
  );

  return (
    <>
      <button
        ref={mainButtonRef}
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
          <span className="text-xl w-full font-mono">{tmpColor}</span>
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
          <div className="bg-base-200 rounded-box px-3 py-2">
            <div className="relative flex items-center justify-center">
              <span className="absolute left-0 text-neutral-400 font-mono text-xl select-none">#</span>
              <input
                ref={hexInputRef}
                type="text"
                value={displayHex}
                onChange={handleHexInputChange}
                className="text-2xl w-36 font-mono font-bold tracking-[2px] bg-transparent text-center focus:outline-none"
                /* onFocus={handleInputFocus} */
              />
            </div>
          </div>
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
