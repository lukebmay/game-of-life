/*
 * Author: Luke Benjamin May
 * Website: lukemay.com
 *
 * Copyright © 2025-2026 Luke B. May. All rights reserved.
 *
 * This is part of my personal portfolio.
 * No permission is granted to copy, modify, distribute, or use this code.
 */
import ResetIcon from "@/assets/svg/ResetIcon";
import { useGameStore } from "@/store/gameStore";
import { useAppStore } from "@store/appStore";
import CloseIcon from "@svg/CloseIcon";
import clsx from "clsx";
import React from "react";
import AutoFillAlivePercentage from "./Settings/AutoFillAlivePercentage";
import AutoPause from "./Settings/AutoPause";
import BoardColors from "./Settings/BoardColors";
import BoardDimensions from "./Settings/BoardDimensions";
import DebugInfo from "./Settings/DebugInfo";
import Grid from "./Settings/Grid";
import StateTransitionDelay from "./Settings/StateTransitionDelay";

const Settings: React.FC = () => {
  const cmpClass = "cmp_settings";

  const isSettingsVisible = useAppStore((state) => state.isSettingsVisible);
  const toggleIsSettingsVisible = useAppStore((state) => state.toggleIsSettingsVisible);

  const clickCloseSettings = () => toggleIsSettingsVisible();

  const resetBoardBgColor = useAppStore((state) => state.resetBoardBgColor);
  const resetBoardFgColor = useAppStore((state) => state.resetBoardFgColor);
  const resetRows = useGameStore((state) => state.resetRows);
  const resetCols = useGameStore((state) => state.resetCols);
  const resetIsDebugInfoVisible = useAppStore((state) => state.resetIsDebugInfoVisible);
  const resetIsGridVisible = useAppStore((state) => state.resetIsGridVisible);
  const resetBoardGridColor = useAppStore((state) => state.resetBoardGridColor);
  const resetStateTransitionDelay = useAppStore((state) => state.resetStateTransitionDelay);

  const resetHandler = () => {
    resetBoardFgColor();
    resetBoardBgColor();
    resetRows();
    resetCols();
    resetIsDebugInfoVisible();
    resetIsGridVisible();
    resetBoardGridColor();
    resetStateTransitionDelay();
  };

  return (
    <div
      className={clsx(
        // Desktop (lg means `> 1024px`) - No overlay, push content over
        isSettingsVisible ? "lg:w-sm lg:border-r-1" : "lg:w-0 lg:border-r-0",
        "lg:flex-shrink-0 lg:transition-all lg:duration-300 lg:ease-in-out",

        // Tablet/Phone (max-lg means `<= 1024px`) - Overlay, max-width 384px, scales if smaller
        "max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:bottom-0",
        "max-lg:w-[min(100%,24rem)]", // fixed 384px on tablets, full width on phones
        "max-lg:z-[1250] max-lg:bg-base-100 max-lg:shadow-2xl",
        "max-lg:transition-transform max-lg:duration-350 max-lg:ease-[cubic-bezier(0.32,0.72,0,1)]",
        isSettingsVisible ? "max-lg:translate-x-0" : "max-lg:-translate-x-full",

        "flex flex-col overflow-hidden border-base-300",
        cmpClass,
      )}
    >
      <div className={clsx("w-full", "pl-3", "pt-3", "pr-3", "relative")}>
        <div className={clsx("absolute", "right-1", "top-1", "text-base-300")}>
          <button type="button" className={clsx("cursor-pointer")} onClick={clickCloseSettings}>
            <CloseIcon />
          </button>
        </div>
        <div
          className={clsx(
            "w-full",
            "text-center",
            "flex",
            "flex-row",
            "gap-2",
            "justify-center",
            "text-xl",
            "pb-5",
          )}
        >
          Settings
          <button
            type="button"
            className={clsx("cursor-pointer", "text-base-300")}
            onClick={resetHandler}
          >
            <ResetIcon />
          </button>
        </div>
        <hr className={clsx("text-inherit")} />
      </div>
      <div
        className="flex-1 pl-3 pr-3 pb-3 overflow-auto origin-top-left transition-transform"
        style={{
          width: "384px",
          maxWidth: "100%",
          transform: "scale(min(1, calc(100vw / 384px)))",
        }}
      >
        <BoardColors />
        <Grid />
        <BoardDimensions />
        <StateTransitionDelay />
        <DebugInfo />
        <AutoPause />
        <AutoFillAlivePercentage />
      </div>
    </div>
  );
};

export default Settings;
