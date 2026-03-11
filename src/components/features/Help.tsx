/*
 * Author: Luke Benjamin May
 * Website: lukemay.com
 *
 * Copyright © 2025-2026 Luke B. May. All rights reserved.
 *
 * This is part of my personal portfolio.
 * No permission is granted to copy, modify, distribute, or use this code.
 */
import gol, { type Board } from "@engine/gol";
import { useAppStore } from "@store/appStore";
import CloseIcon from "@svg/CloseIcon";
import HandDrawnArrowLeftIcon from "@svg/HandDrawnArrowLeftIcon";
import clsx from "clsx";
import React, { useEffect, useRef } from "react";
import MiniGrid from "./Help/MiniGrid.tsx";

const Help: React.FC = () => {
  const cmpClass = "cmp_help";

  const isHelpVisible = useAppStore((state) => state.isHelpVisible);
  const toggleIsHelpVisible = useAppStore((state) => state.toggleIsHelpVisible);

  const modalRef = useRef<HTMLDialogElement>(null);

  const createGrid = (size = 5): Board => {
    return Array(size)
      .fill(null)
      .map(() => Array(size).fill(false));
  };

  const emptyGrid = createGrid(5);
  const singleCenter = createGrid(5);
  singleCenter[2][2] = true;

  const neighborsExample = createGrid(5);
  for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 3; j++) {
      if (!(i === 2 && j === 2)) neighborsExample[i][j] = true;
    }
  }

  const horizontalLine = createGrid(5);
  horizontalLine[2][1] = true;
  horizontalLine[2][2] = true;
  horizontalLine[2][3] = true;

  const verticalLine = gol.calculateNextState(horizontalLine);

  const underpopulationBefore = createGrid(5);
  underpopulationBefore[1][2] = true;
  underpopulationBefore[3][2] = true;
  underpopulationBefore[3][3] = true;

  const survivalBefore = createGrid(5);
  survivalBefore[1][3] = true;
  survivalBefore[2][2] = true;
  survivalBefore[3][1] = true;

  const survivalAfter = gol.calculateNextState(survivalBefore);

  const overpopulationBefore = createGrid(5);
  overpopulationBefore[1][1] = true;
  overpopulationBefore[2][1] = true;
  overpopulationBefore[2][2] = true;
  overpopulationBefore[2][3] = true;
  overpopulationBefore[3][3] = true;

  const overpopulationAfter = gol.calculateNextState(overpopulationBefore);

  const reproductionBefore = createGrid(5);
  reproductionBefore[1][1] = true;
  reproductionBefore[1][2] = true;
  reproductionBefore[3][3] = true;

  const reproductionAfter = gol.calculateNextState(reproductionBefore);

  const blockPattern = createGrid(4);
  blockPattern[1][1] = true;
  blockPattern[1][2] = true;
  blockPattern[2][1] = true;
  blockPattern[2][2] = true;

  const glider1 = createGrid(6);
  glider1[1][2] = true;
  glider1[2][3] = true;
  glider1[3][1] = true;
  glider1[3][2] = true;
  glider1[3][3] = true;

  const glider2 = gol.calculateNextState(glider1);
  const glider3 = gol.calculateNextState(glider2);

  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    if (isHelpVisible) {
      modal.showModal();
    } else {
      modal.close();
    }
  }, [isHelpVisible]);

  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    const handleClose = () => {
      if (isHelpVisible) toggleIsHelpVisible();
    };

    modal.addEventListener("close", handleClose);
    return () => modal.removeEventListener("close", handleClose);
  }, [isHelpVisible, toggleIsHelpVisible]);

  return (
    <dialog ref={modalRef} id="help-modal" className={clsx("modal", cmpClass)}>
      <div className={clsx("modal-box", "w-full", "max-w-5xl", "flex", "flex-col", "max-h-[90vh]")}>
        <div className={clsx("w-full", "pl-3", "pt-3", "pr-3", "relative")}>
          <div className={clsx("absolute", "right-1", "top-1", "text-base-300")}>
            <button
              type="button"
              className={clsx("cursor-pointer", "focus:outline-none")}
              onClick={toggleIsHelpVisible}
            >
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
              "text-2xl",
              "font-bold",
              "pb-5",
            )}
          >
            Welcome to Conway's Game of Life
          </div>
          <hr className={clsx("text-inherit")} />
        </div>
        <div className="flex-1 pl-3 pr-3 pb-3 overflow-auto text-base leading-relaxed">
          <br />
          <p className="indent-6">
            Conway's Game of Life is a simulation that mimics how life might grow, spread, or die
            out based on a few simple mathematical rules. Instead of "playing" to win, you set up an
            initial pattern of "live" cells on a grid and watch how they evolve over time.
          </p>
          <br />
          <h3 className="text-center text-xl pt-5 pb-5">The Basics</h3>
          <ul className="list-disc pl-6 space-y-8">
            <li>
              <b>The World</b>: A grid of square "cells".
              <div className="flex justify-center my-6">
                <MiniGrid pattern={emptyGrid} />
              </div>
            </li>
            <li>
              <b>The States</b>: Each cell is either Alive (populated) or Dead (empty).
              <div className="flex justify-center my-6">
                <MiniGrid pattern={singleCenter} />
              </div>
            </li>
            <li>
              <b>The Neighbors</b>: Every cell has 8 neighbors (the squares horizontally,
              vertically, or diagonally adjacent to it).
              <div className="flex justify-center my-6">
                <MiniGrid pattern={neighborsExample} />
              </div>
            </li>
            <li>
              <b>Generations</b>: The game moves in "ticks" or generations. Every cell on the board
              updates every tick based on its neighbors state.
              <div className="flex flex-col lg:flex-row items-center justify-center gap-8 my-8">
                <MiniGrid pattern={horizontalLine} />
                <div className="rotate-270 lg:rotate-180">
                  <HandDrawnArrowLeftIcon className="w-12 h-12 opacity-70" />
                </div>
                <MiniGrid pattern={verticalLine} />
              </div>
            </li>
          </ul>
          <br />
          <h3 className="text-center text-xl pt-5 pb-5">The Rules</h3>
          <p className="indent-6">
            At each tick, these four rules determine what happens to every cell in the next
            generation.
          </p>
          <br />
          <ol className="list-decimal pl-6 space-y-10">
            <li>
              <b>Underpopulation</b>: Any Live cell with fewer than 2 live neighbors dies.
              <div className="flex flex-col lg:flex-row items-center justify-center gap-8 my-8">
                <MiniGrid pattern={underpopulationBefore} />
                <div className="rotate-270 lg:rotate-180">
                  <HandDrawnArrowLeftIcon className="w-12 h-12 opacity-70" />
                </div>
                <MiniGrid pattern={emptyGrid} />
              </div>
            </li>
            <li>
              <b>Survival</b>: Any Live cell with 2 or 3 live neighbors stays alive.
              <div className="flex flex-col lg:flex-row items-center justify-center gap-8 my-8">
                <MiniGrid pattern={survivalBefore} size={5} />
                <div className="rotate-270 lg:rotate-180">
                  <HandDrawnArrowLeftIcon className="w-12 h-12 opacity-70" />
                </div>
                <MiniGrid pattern={survivalAfter} size={5} />
              </div>
            </li>
            <li>
              <b>Overpopulation</b>: Any Live cell with more than 3 live neighbors dies.
              <div className="flex flex-col lg:flex-row items-center justify-center gap-8 my-8">
                <MiniGrid pattern={overpopulationBefore} />
                <div className="rotate-270 lg:rotate-180">
                  <HandDrawnArrowLeftIcon className="w-12 h-12 opacity-70" />
                </div>
                <MiniGrid pattern={overpopulationAfter} />
              </div>
            </li>
            <li>
              <b>Reproduction</b>: Any Dead cell with exactly 3 live neighbors becomes alive.
              <div className="flex flex-col lg:flex-row items-center justify-center gap-8 my-8">
                <MiniGrid pattern={reproductionBefore} />
                <div className="rotate-270 lg:rotate-180">
                  <HandDrawnArrowLeftIcon className="w-12 h-12 opacity-70" />
                </div>
                <MiniGrid pattern={singleCenter} />
              </div>
            </li>
          </ol>
          <br />
          <h3 className="text-center text-xl pt-5 pb-5">Common Patterns</h3>
          <p className="indent-6">Simple rules often lead to complex, beautiful behaviors.</p>
          <br />
          <ul className="list-disc pl-6 space-y-10">
            <li>
              <b>Still Lifes</b>: Patterns like the Block (a 2x2 square) that never change.
              <div className="flex flex-col lg:flex-row items-center justify-center gap-8 my-8">
                <MiniGrid pattern={blockPattern} size={4} />
                <div className="rotate-270 lg:rotate-180">
                  <HandDrawnArrowLeftIcon className="w-12 h-12 opacity-70" />
                </div>
                <MiniGrid pattern={blockPattern} size={4} />
              </div>
            </li>
            <li>
              <b>Oscillators</b>: Patterns like the Blinker (a 3-cell line) that flip back and forth
              between two shapes.
              <div className="flex flex-col lg:flex-row items-center justify-center gap-8 my-8">
                <MiniGrid pattern={horizontalLine} />
                <div className="rotate-270 lg:rotate-180">
                  <HandDrawnArrowLeftIcon className="w-12 h-12 opacity-70" />
                </div>
                <MiniGrid pattern={verticalLine} />
                <div className="rotate-270 lg:rotate-180">
                  <HandDrawnArrowLeftIcon className="w-12 h-12 opacity-70" />
                </div>
                <MiniGrid pattern={horizontalLine} />
              </div>
            </li>
            <li>
              <b>Spaceships</b>: Moving patterns like the Glider that travel across the grid
              forever.
              <div className="flex flex-col lg:flex-row items-center justify-center gap-8 my-8">
                <MiniGrid pattern={glider1} size={6} />
                <div className="rotate-270 lg:rotate-180">
                  <HandDrawnArrowLeftIcon className="w-12 h-12 opacity-70" />
                </div>
                <MiniGrid pattern={glider2} size={6} />
                <div className="rotate-270 lg:rotate-180">
                  <HandDrawnArrowLeftIcon className="w-12 h-12 opacity-70" />
                </div>
                <MiniGrid pattern={glider3} size={6} />
              </div>
            </li>
          </ul>
          <br />
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default Help;
