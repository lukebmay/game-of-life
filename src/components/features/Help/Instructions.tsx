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
import HandDrawnArrowLeftIcon from "@svg/HandDrawnArrowLeftIcon";
import clsx from "clsx";
import React from "react";
import MiniGrid from "./MiniGrid.tsx";

const Instructions: React.FC = () => {
  const cmpClass = "cmp_instructions";

  const createGrid = (size = 5): Board => {
    return Array(size)
      .fill(null)
      .map(() => Array(size).fill(false));
  };

  const emptyGrid = createGrid(5);
  const singleCenter = createGrid(5);
  singleCenter[2][2] = true;

  const neighborsExample = createGrid(5);
  neighborsExample[1][1] = true;
  neighborsExample[1][2] = true;
  neighborsExample[1][3] = true;
  neighborsExample[2][1] = true;
  neighborsExample[2][3] = true;
  neighborsExample[3][1] = true;
  neighborsExample[3][2] = true;
  neighborsExample[3][3] = true;

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

  return (
    <div
      className={clsx(
        "flex-1 mx-auto max-w-3xl px-4 md:px-8 lg:px-12 pb-3 overflow-auto text-base leading-loose",
        cmpClass,
      )}
    >
      <br />
      <p className="indent-6">
        Welcome!{" "}
        <a
          className="link link-primary"
          href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
        >
          Conway's Game of Life
        </a>{" "}
        is a classic computer science simulation that mimics how life might grow, spread, or die out
        based on a few simple mathematical rules. Instead of "playing" to win, you set up an initial
        pattern of "live" cells on a grid and watch how they evolve over time.
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
          <b>The Neighbors</b>: Every cell has 8 neighbors (the squares horizontally, vertically, or
          diagonally adjacent to it).
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
        At each tick, these four rules determine what happens to every cell in the next generation.
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
          <b>Spaceships</b>: Moving patterns like the Glider that travel across the grid forever.
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
  );
};

export default Instructions;
