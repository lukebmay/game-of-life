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
import { useGameStore } from "@store/gameStore";
import clsx from "clsx";
import React, { useMemo } from "react";
import Cell from "./Board/Cell";

const Board: React.FC = () => {
  const cmpClass = "cmp_board";
  const deadColor = useAppStore((state) => state.boardBgColor);
  const aliveColor = useAppStore((state) => state.boardFgColor);

  const rows = useGameStore((state) => state.rows);
  const cols = useGameStore((state) => state.cols);

  const board = useGameStore((state) => state.board);

  const isGridVisible = useAppStore((state) => state.isGridVisible);
  const gridColor = useAppStore((state) => state.boardGridColor);

  const gridClassName = useMemo(
    () =>
      clsx(
        "grid w-full h-full justify-center content-center",
        cmpClass,
        isGridVisible && "show-grid",
      ),
    [isGridVisible],
  );

  const gridStyle = useMemo<React.CSSProperties>(
    () => ({
      "--dead-color": deadColor,
      "--alive-color": aliveColor,
      "--grid-color": gridColor,
      gridTemplateColumns: `repeat(${cols}, min(calc(100cqw / ${cols}), calc(100cqh / ${rows})))`,
      gridTemplateRows: `repeat(${rows}, min(calc(100cqw / ${cols}), calc(100cqh / ${rows})))`,
    }),
    [deadColor, aliveColor, gridColor, cols, rows],
  );

  return (
    <div className={clsx("pb-3", "flex-1")} style={{ containerType: "size" }}>
      <div className={gridClassName} style={gridStyle}>
        {board.map((rowArr, r) =>
          rowArr.map((isAlive, c) => <Cell key={`${r},${c}`} row={r} col={c} isAlive={isAlive} />),
        )}
      </div>
    </div>
  );
};

export default Board;

