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
import ColorSelector from "@ui/ColorSelector";
import FieldSet from "@ui/FieldSet";
import clsx from "clsx";
import React from "react";

const Grid: React.FC = () => {
  const cmpClass = "cmp_settings_grid";

  const isDarkMode = useAppStore((state) => state.isDarkMode);

  const isGridVisible = useAppStore((state) => state.isGridVisible);
  const toggleIsGridVisible = useAppStore((state) => state.toggleIsGridVisible);
  const resetIsGridVisible = useAppStore((state) => state.resetIsGridVisible);

  const boardGridColorDark = useAppStore((state) => state.boardGridColorDark);
  const setBoardGridColorDark = useAppStore((state) => state.setBoardGridColorDark);
  const resetBoardGridColorDark = useAppStore((state) => state.resetBoardGridColorDark);

  const boardGridColorLight = useAppStore((state) => state.boardGridColorLight);
  const setBoardGridColorLight = useAppStore((state) => state.setBoardGridColorLight);
  const resetBoardGridColorLight = useAppStore((state) => state.resetBoardGridColorLight);

  const resetHandler = () => {
    resetIsGridVisible();
    resetBoardGridColorDark();
    resetBoardGridColorLight();
  };

  const currentGridColor = isDarkMode ? boardGridColorDark : boardGridColorLight;
  const setCurrentGridColor = isDarkMode ? setBoardGridColorDark : setBoardGridColorLight;

  return (
    <FieldSet
      title="Grid"
      className={clsx("flex", "flex-row", "justify-around", cmpClass)}
      onReset={resetHandler}
    >
      <label className={clsx("label", "flex", "flex-col", cmpClass)}>
        Show Grid
        <input
          id="settings_show-grid"
          type="checkbox"
          className={clsx("toggle", "toggle-primary")}
          checked={isGridVisible}
          onChange={(value_) => toggleIsGridVisible()}
        />
        {isGridVisible ? "Yes" : "No"}
      </label>
      <label className={clsx("label", "flex", "flex-col")}>
        Grid Color
        <ColorSelector color={currentGridColor} onChange={setCurrentGridColor} />
      </label>
    </FieldSet>
  );
};

export default Grid;
