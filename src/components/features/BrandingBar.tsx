import { useAppStore } from "@store/appStore";
import DayIcon from "@svg/DayIcon";
import MenuIcon from "@svg/MenuIcon";
import NightIcon from "@svg/NightIcon";
import clsx from "clsx";
import React from "react";
import Brand from "./BrandingBar/Brand";

const BrandingBar: React.FC = () => {
  const isDarkMode = useAppStore((state) => state.isDarkMode);
  const toggleDarkMode = useAppStore((state) => state.toggleIsDarkMode);
  const toggleIsSettingsVisible = useAppStore((state) => state.toggleIsSettingsVisible);

  const cmpClass = "cmp_branding-bar";

  const clickDarkModeToggle = () => {
    toggleDarkMode();
  };

  const clickSettingsToggle = () => {
    toggleIsSettingsVisible();
  };

  return (
    <div className={clsx("flex", "flex-row", "justify-between", "p-3", "h-15", cmpClass)}>
      <button className="btn" onClick={clickSettingsToggle}>
        <MenuIcon />
      </button>
      <Brand />
      <button className="btn" onClick={clickDarkModeToggle}>
        {isDarkMode ? <NightIcon /> : <DayIcon />}
      </button>
    </div>
  );
};

export default BrandingBar;
