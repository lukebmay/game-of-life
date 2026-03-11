/*
 * Author: Luke Benjamin May
 * Website: lukemay.com
 *
 * Copyright © 2025-2026 Luke B. May. All rights reserved.
 *
 * This is part of my personal portfolio.
 * No permission is granted to copy, modify, distribute, or use this code.
 */
import clsx from "clsx";
import React from "react";
import Brand from "./BrandingBar/Brand";
import LightDarkToggle from "./BrandingBar/LightDarkToggle";
import MenuButton from "./BrandingBar/MenuButton";

const BrandingBar: React.FC = () => {
  const cmpClass = "cmp_branding-bar";

  return (
    <div
      className={clsx(
        "flex",
        "flex-row",
        "justify-between",
        "items-center",
        "p-3",
        "h-15",
        cmpClass,
      )}
    >
      <MenuButton />
      <Brand />
      <LightDarkToggle />
    </div>
  );
};

export default BrandingBar;
