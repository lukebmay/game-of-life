import { useAppStore } from "@/store/appStore";
import { useGameStore } from "@store/gameStore";
import ForwardStepIcon from "@svg/ForwardStepIcon";
import PauseIcon from "@svg/PauseIcon";
import PlayIcon from "@svg/PlayIcon";
import TrashIcon from "@svg/TrashIcon";
import clsx from "clsx";
import React from "react";

const Controls: React.FC = () => {
  const cmpClass = "cmp_controls";

  const isPaused = useGameStore((state) => state.isPaused);
  const toggleIsPaused = useGameStore((state) => state.toggleIsPaused);
  const advanceStep = useGameStore((state) => state.advanceStep);
  const clearBoard = useGameStore((state) => state.clearBoard);
  const resetRenderStats = useAppStore((state) => state.resetRenderStats);
  const handlePlayPause = () => {
    if (isPaused) {
      resetRenderStats();
    }
    toggleIsPaused();
  };

  return (
    <div className={clsx("flex", "flex-col", "items-around", "p-2", "gap-5", cmpClass)}>
      <div className={clsx("flex", "flex-row", "justify-between")}>
        <div className={clsx("flex", "flex-row", "items-around", "p-2", "gap-5")}>
          <button className="btn btn-primary" type="button" onClick={handlePlayPause}>
            {isPaused ? <PlayIcon /> : <PauseIcon />}
          </button>
          <button
            className="btn btn-primary"
            type="button"
            onClick={advanceStep}
            disabled={!isPaused}
          >
            <ForwardStepIcon />
          </button>
        </div>
        <div className={clsx("flex", "flex-row", "items-around", "p-2", "gap-5", cmpClass)}>
          <button
            className="btn btn-primary"
            type="button"
            onClick={clearBoard}
            disabled={!isPaused}
          >
            <TrashIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Controls;
