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
import clsx from "clsx";
import React from "react";

type MiniGridProps = {
  pattern: boolean[][];
  size?: number;
};

const MiniGrid: React.FC<MiniGridProps> = ({ pattern, size = 5 }) => {
  const cmpClass = "cmp_mini-grid";

  const isDarkMode = useAppStore((state) => state.isDarkMode);

  const boardBgColorDark = useAppStore((state) => state.boardBgColorDark);
  const boardBgColorLight = useAppStore((state) => state.boardBgColorLight);

  const boardFgColorDark = useAppStore((state) => state.boardFgColorDark);
  const boardFgColorLight = useAppStore((state) => state.boardFgColorLight);

  const boardGridColorDark = useAppStore((state) => state.boardGridColorDark);
  const boardGridColorLight = useAppStore((state) => state.boardGridColorLight);

  const currentBgColor = isDarkMode ? boardBgColorDark : boardBgColorLight;
  const currentFgColor = isDarkMode ? boardFgColorDark : boardFgColorLight;
  const currentGridColor = isDarkMode ? boardGridColorDark : boardGridColorLight;

  const gridSize = size || 5;
  return (
    <div
      className={clsx("inline-grid border-2 rounded-xl overflow-hidden shadow-sm", cmpClass)}
      style={{
        backgroundColor: currentGridColor,
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        width: gridSize === 5 ? "152px" : "124px",
        gap: "2px",
        padding: "4px",
      }}
    >
      {pattern.flat().map((isAlive, index) => (
        <div
          key={index}
          style={{
            backgroundColor: isAlive ? currentFgColor : currentBgColor,
            aspectRatio: "1 / 1",
          }}
        />
      ))}
    </div>
  );
};

export default MiniGrid;
