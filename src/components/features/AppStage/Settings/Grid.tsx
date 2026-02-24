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

  const isGridVisible = useAppStore((state) => state.isGridVisible);
  const toggleIsGridVisible = useAppStore((state) => state.toggleIsGridVisible);
  const resetIsGridVisible = useAppStore((state) => state.resetIsGridVisible);

  const boardGridColor = useAppStore((state) => state.boardGridColor);
  const setBoardGridColor = useAppStore((state) => state.setBoardGridColor);
  const resetBoardGridColor = useAppStore((state) => state.resetBoardGridColor);

  const resetHandler = () => {
    resetIsGridVisible();
    resetBoardGridColor();
  };

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
        <ColorSelector color={boardGridColor} onChange={setBoardGridColor} />
      </label>
    </FieldSet>
  );
};

export default Grid;
