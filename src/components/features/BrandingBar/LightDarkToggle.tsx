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
import DayIcon from "@svg/DayIcon";
import NightIcon from "@svg/NightIcon";
import clsx from "clsx";
import React from "react";

const LightDarkToggle: React.FC = () => {
  const isDarkMode = useAppStore((state) => state.isDarkMode);
  const toggleIsDarkMode = useAppStore((state) => state.toggleIsDarkMode);

  const cmpClass = "cmp_light-dark-toggle";

  return (
    <>
      <div
        className={clsx(" hidden lg:flex gap-2 cursor-pointer", cmpClass)}
        onClick={toggleIsDarkMode}
      >
        <NightIcon />
        <input className="toggle" type="checkbox" checked={!isDarkMode} readOnly />
        <DayIcon />
      </div>
      <button className="btn lg:hidden" type="button" onClick={toggleIsDarkMode}>
        {isDarkMode ? <DayIcon /> : <NightIcon />}
      </button>
    </>
  );
};

export default LightDarkToggle;
