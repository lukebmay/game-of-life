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
import MenuIcon from "@svg/MenuIcon";
import clsx from "clsx";
import React from "react";

const MenuButton: React.FC = () => {
  const toggleIsSettingsVisible = useAppStore((state) => state.toggleIsSettingsVisible);

  const cmpClass = "cmp_menu-button";

  return (
    <button className={clsx("btn", cmpClass)} onClick={toggleIsSettingsVisible}>
      <MenuIcon />
    </button>
  );
};

export default MenuButton;
