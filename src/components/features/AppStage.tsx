/*
 * Author: Luke Benjamin May
 * Website: lukemay.com
 *
 * Copyright © 2025-2026 Luke B. May. All rights reserved.
 *
 * This is part of my personal portfolio.
 * No permission is granted to copy, modify, distribute, or use this code.
 */
import { useAppStore } from "@/store/appStore";
import GameStage from "@features/AppStage/GameStage";
import Settings from "@features/AppStage/Settings";
import clsx from "clsx";
import React from "react";

const AppStage: React.FC = () => {
  const cmpClass = "cmp_app-stage";

  const isSettingsVisible = useAppStore((state) => state.isSettingsVisible);
  const closeSettings = useAppStore((state) => state.disableIsSettingsVisible); // ← new

  return (
    <div className={clsx("flex flex-row flex-1 items-stretch overflow-hidden relative", cmpClass)}>
      <Settings />
      <div
        className={clsx(
          "fixed top-[3.75rem] left-0 right-0 bottom-0 z-[1240] bg-transparent lg:hidden",
          isSettingsVisible ? "pointer-events-auto" : "pointer-events-none",
        )}
        onClick={closeSettings}
      />

      <GameStage />
    </div>
  );
};

export default AppStage;
