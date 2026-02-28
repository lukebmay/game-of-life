/*
 * Author: Luke Benjamin May
 * Website: lukemay.com
 *
 * Copyright © 2025-2026 Luke B. May. All rights reserved.
 *
 * This is part of my personal portfolio.
 * No permission is granted to copy, modify, distribute, or use this code.
 */
import gol, { type Board as EngineBoard } from "@engine/gol";
import { useAutoPause } from "@hooks/useAutoPause";
import { useAppStore } from "@store/appStore";
import { useGameStore } from "@store/gameStore";
import clsx from "clsx";
import React, { useEffect, useRef } from "react";
import Board from "./GameStage/Board";
import Controls from "./GameStage/Controls";
import Footer from "./GameStage/Footer";

const GameStage: React.FC = () => {
  const cmpClass = "cmp_game-stage";

  // Game Loop
  const stateTransitionDelay = useAppStore((state) => state.stateTransitionDelay);
  const isPaused = useGameStore((state) => state.isPaused);
  const advanceStep = useGameStore((state) => state.advanceStep);
  const playTimeoutId = useRef(0);
  const isDebugInfoVisible = useAppStore((state) => state.isDebugInfoVisible);
  const updateRenderStats = useAppStore((state) => state.updateRenderStats);

  // Auto pause
  useAutoPause();

  // play/pause effect
  useEffect(() => {
    if (isPaused) {
      if (playTimeoutId.current) {
        clearTimeout(playTimeoutId.current);
        playTimeoutId.current = 0;
      }
      return;
    }

    const step = () => {
      if (isDebugInfoVisible) {
        updateRenderStats(Date.now());
      }
      advanceStep();
      playTimeoutId.current = setTimeout(step, stateTransitionDelay);
    };
    step();

    return () => {
      if (playTimeoutId.current) {
        clearTimeout(playTimeoutId.current);
        playTimeoutId.current = 0;
      }
    };
  }, [isPaused, stateTransitionDelay, advanceStep, isDebugInfoVisible, updateRenderStats]);

  // board size effect
  const rows = useGameStore((state) => state.rows);
  const cols = useGameStore((state) => state.cols);
  const setBoard = useGameStore((state) => state.setBoard);

  useEffect(() => {
    setBoard((prevBoard: EngineBoard) => {
      const newBoard = gol.initEmptyBoard(rows, cols);
      const minRows = Math.min(rows, prevBoard.length);
      const minCols = Math.min(cols, prevBoard[0].length);
      for (let r = 0; r < minRows; r++) {
        for (let c = 0; c < minCols; c++) {
          newBoard[r][c] = prevBoard[r][c];
        }
      }
      return newBoard;
    });
  }, [rows, cols, setBoard]);

  return (
    <div className={clsx("flex", "flex-col", "flex-1", "p-3", cmpClass)}>
      <Board />
      <hr />
      <Controls />
      <hr />
      <Footer />
    </div>
  );
};

export default GameStage;
