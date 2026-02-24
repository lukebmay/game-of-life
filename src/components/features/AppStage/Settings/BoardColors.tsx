import { useAppStore } from "@store/appStore";
import SwapHorizontalIcon from "@svg/SwapHorizontalIcon";
import ColorSelector from "@ui/ColorSelector";
import FieldSet from "@ui/FieldSet";
import clsx from "clsx";
import React from "react";

const BoardColors: React.FC = () => {
  const cmpClass = "cmp_settings_board-colors";

  const boardBgColor = useAppStore((state) => state.boardBgColor);
  const setBoardBgColor = useAppStore((state) => state.setBoardBgColor);
  const resetBoardBgColor = useAppStore((state) => state.resetBoardBgColor);

  const boardFgColor = useAppStore((state) => state.boardFgColor);
  const setBoardFgColor = useAppStore((state) => state.setBoardFgColor);
  const resetBoardFgColor = useAppStore((state) => state.resetBoardFgColor);

  const swapFgBg = () => {
    setBoardFgColor(boardBgColor);
    setBoardBgColor(boardFgColor);
  };

  const resetHandler = () => {
    resetBoardFgColor();
    resetBoardBgColor();
  };

  return (
    <FieldSet
      title="Board Colors"
      className={clsx("flex", "flex-row", "justify-around", cmpClass)}
      onReset={resetHandler}
    >
      <label className={clsx("label", "flex", "flex-col")}>
        Living Cell Color
        <ColorSelector color={boardFgColor} onChange={setBoardFgColor} />
      </label>
      <label className={clsx("label", "flex", "flex-col")}>
        Swap
        <button type="button" className="btn" onClick={swapFgBg}>
          <SwapHorizontalIcon />
        </button>
      </label>
      <label className={clsx("label", "flex", "flex-col")}>
        Dead Cell Color
        <ColorSelector color={boardBgColor} onChange={setBoardBgColor} />
      </label>
    </FieldSet>
  );
};

export default BoardColors;
