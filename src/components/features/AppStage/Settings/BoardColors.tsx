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
import SwapHorizontalIcon from "@svg/SwapHorizontalIcon";
import ColorSelector from "@ui/ColorSelector";
import FieldSet from "@ui/FieldSet";
import clsx from "clsx";
import React from "react";

const BoardColors: React.FC = () => {
  const cmpClass = "cmp_settings_board-colors";

  const isDarkMode = useAppStore((state) => state.isDarkMode);

  const boardBgColorDark = useAppStore((state) => state.boardBgColorDark);
  const setBoardBgColorDark = useAppStore((state) => state.setBoardBgColorDark);
  const resetBoardBgColorDark = useAppStore((state) => state.resetBoardBgColorDark);

  const boardBgColorLight = useAppStore((state) => state.boardBgColorLight);
  const setBoardBgColorLight = useAppStore((state) => state.setBoardBgColorLight);
  const resetBoardBgColorLight = useAppStore((state) => state.resetBoardBgColorLight);

  const boardFgColorDark = useAppStore((state) => state.boardFgColorDark);
  const setBoardFgColorDark = useAppStore((state) => state.setBoardFgColorDark);
  const resetBoardFgColorDark = useAppStore((state) => state.resetBoardFgColorDark);

  const boardFgColorLight = useAppStore((state) => state.boardFgColorLight);
  const setBoardFgColorLight = useAppStore((state) => state.setBoardFgColorLight);
  const resetBoardFgColorLight = useAppStore((state) => state.resetBoardFgColorLight);

  const swapFgBg = () => {
    if (isDarkMode) {
      const bg = boardBgColorDark;
      const fg = boardFgColorDark;
      setBoardBgColorDark(fg);
      setBoardFgColorDark(bg);
    } else {
      const bg = boardBgColorLight;
      const fg = boardFgColorLight;
      setBoardBgColorLight(fg);
      setBoardFgColorLight(bg);
    }
  };

  const resetHandler = () => {
    resetBoardBgColorDark();
    resetBoardBgColorLight();
    resetBoardFgColorDark();
    resetBoardFgColorLight();
  };

  const currentBgColor = isDarkMode ? boardBgColorDark : boardBgColorLight;
  const setCurrentBgColor = isDarkMode ? setBoardBgColorDark : setBoardBgColorLight;
  const currentFgColor = isDarkMode ? boardFgColorDark : boardFgColorLight;
  const setCurrentFgColor = isDarkMode ? setBoardFgColorDark : setBoardFgColorLight;

  return (
    <FieldSet
      title="Board Colors"
      className={clsx("flex", "flex-row", "justify-around", cmpClass)}
      onReset={resetHandler}
    >
      <label className={clsx("label", "flex", "flex-col")}>
        Living Cell Color
        <ColorSelector color={currentFgColor} onChange={setCurrentFgColor} />
      </label>
      <label className={clsx("label", "flex", "flex-col")}>
        Swap
        <button type="button" className="btn" onClick={swapFgBg}>
          <SwapHorizontalIcon />
        </button>
      </label>
      <label className={clsx("label", "flex", "flex-col")}>
        Dead Cell Color
        <ColorSelector color={currentBgColor} onChange={setCurrentBgColor} />
      </label>
    </FieldSet>
  );
};

export default BoardColors;
