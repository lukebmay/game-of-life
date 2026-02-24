/*
 * Author: Luke Benjamin May
 * Website: lukemay.com
 *
 * Copyright © 2025-2026 Luke B. May. All rights reserved.
 *
 * This is part of my personal portfolio.
 * No permission is granted to copy, modify, distribute, or use this code.
 */
import GameStage from "@features/AppStage/GameStage";
import Settings from "@features/AppStage/Settings";
import clsx from "clsx";
import React from "react";

const AppStage: React.FC = () => {
  const cmpClass = "cmp_app-stage";

  return (
    <div className={clsx("flex", "flex-row", "flex-1", "items-stretch", "overflow-auto", cmpClass)}>
      <Settings />
      <GameStage />
    </div>
  );
};

export default AppStage;

