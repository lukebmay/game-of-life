import ResetIcon from "@/assets/svg/ResetIcon";
import { useGameStore } from "@/store/gameStore";
import { useAppStore } from "@store/appStore";
import CloseIcon from "@svg/CloseIcon";
import clsx from "clsx";
import React from "react";
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
        isSettingsVisible ? "w-sm border-r-1" : "w-0",
        "overflow-hidden",
        "flex",
        "flex-col",
        "transition-all duration-300 ease-in-out",
        "border-base-300",
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
      <div className={clsx("w-full", "pl-3", "pr-3", "pb-3", "relative", "overflow-auto")}>
        <BoardColors />
        <Grid />
        <StateTransitionDelay />
        <BoardDimensions />
        <DebugInfo />
      </div>
    </div>
  );
};

export default Settings;
