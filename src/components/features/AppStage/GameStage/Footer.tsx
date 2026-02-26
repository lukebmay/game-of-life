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
import React from "react";

const Footer: React.FC = () => {
  const cmpClass = "cmp_footer";

  const isPaused = useGameStore((state) => state.isPaused);
  const isDebugInfoVisible = useAppStore((state) => state.isDebugInfoVisible);
  const renderStats = useAppStore((state) => state.renderStats);

  return (
    <div className={clsx("flex", "flex-row", "items-center", "justify-around pt-3")}>
      {!isDebugInfoVisible ? null : (
        <>
          <div className={clsx("grid grid-cols-4 gap-2 text-xs")}>
            <div>{isPaused ? "PAUSED" : ""}</div>
            <div className="text-right font-bold">Min (ms)</div>
            <div className="text-right font-bold">Max (ms)</div>
            <div className="text-right font-bold">Avg (ms)</div>
            <div className="font-bold">Last 10 Frames</div>
            <div className="text-right">{renderStats.last10?.min?.toFixed(2) ?? "-"}</div>
            <div className="text-right">{renderStats.last10?.max?.toFixed(2) ?? "-"}</div>
            <div className="text-right">{renderStats.last10?.avg?.toFixed(2) ?? "-"}</div>
            <div className="font-bold">Last 100 Frames</div>
            <div className="text-right">{renderStats.last100?.min?.toFixed(2) ?? "-"}</div>
            <div className="text-right">{renderStats.last100?.max?.toFixed(2) ?? "-"}</div>
            <div className="text-right">{renderStats.last100?.avg?.toFixed(2) ?? "-"}</div>
            <div className="font-bold">Last 1000 Frames</div>
            <div className="text-right">{renderStats.last1000?.min?.toFixed(2) ?? "-"}</div>
            <div className="text-right">{renderStats.last1000?.max?.toFixed(2) ?? "-"}</div>
            <div className="text-right">{renderStats.last1000?.avg?.toFixed(2) ?? "-"}</div>
          </div>
          <div
            style={{ color: "var(--color-base-300)" }}
            className="border-solid border h-full"
          ></div>
        </>
      )}
      <div className={clsx("flex", "flex-col", "items-around", "p-2", "gap-5", cmpClass)}>
        <div className="flex flex-col items-center gap-1">
          <span className="text-sm text-center font-bold">Luke Benjamin May</span>
          <span className="text-sm text-center font-bold">2025</span>
          <span className="text-xs text-center">All rights reserved</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
