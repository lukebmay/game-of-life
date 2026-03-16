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
import HelpIcon from "@svg/HelpIcon";
import clsx from "clsx";
import React from "react";

type HelpButtonProps = {
  className?: string;
};

const HelpButton: React.FC<HelpButtonProps> = ({ className }) => {
  const toggleIsHelpVisible = useAppStore((state) => state.toggleIsHelpVisible);

  const cmpClass = "cmp_help-button";

  return (
    <button
      className={clsx("cursor-pointer", "focus:outline-none", className, cmpClass)}
      onClick={toggleIsHelpVisible}
    >
      <HelpIcon className="w-full h-full" />
    </button>
  );
};

export default HelpButton;
