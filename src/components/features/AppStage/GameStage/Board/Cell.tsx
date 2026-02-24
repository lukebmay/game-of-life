import { useGameStore } from "@store/gameStore";
import clsx from "clsx";
import React, { useCallback } from "react";

type CellProps = {
  isAlive: boolean;
  row: number;
  col: number;
};

const Cell: React.FC<CellProps> = React.memo(({ isAlive, row, col }) => {
  const toggleCell = useGameStore((state) => state.toggleCell);
  const handleToggle = useCallback(() => {
    toggleCell(row, col);
  }, [toggleCell, row, col]);

  return <div className={clsx(isAlive ? "cell-alive" : "cell-dead")} onMouseUp={handleToggle} />;
});

export default Cell;

