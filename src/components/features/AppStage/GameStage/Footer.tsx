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
    <div
      className={clsx(
        "flex flex-col lg:flex-row items-center justify-center lg:justify-evenly pt-3",
        cmpClass,
      )}
    >
      {isDebugInfoVisible && (
        <div className="grid grid-cols-4 gap-x-2 text-[8px] lg:text-xs transition-transform">
          <div>{isPaused ? "PAUSED" : ""}</div>
          <div className="text-right font-bold">Min (ms)</div>
          <div className="text-right font-bold">Max (ms)</div>
          <div className="text-right font-bold">Avg (ms)</div>

          <div className="font-bold">Last 10</div>
          <div className="text-right">{renderStats.last10?.min?.toFixed(2) ?? "-"}</div>
          <div className="text-right">{renderStats.last10?.max?.toFixed(2) ?? "-"}</div>
          <div className="text-right">{renderStats.last10?.avg?.toFixed(2) ?? "-"}</div>

          <div className="font-bold">Last 100</div>
          <div className="text-right">{renderStats.last100?.min?.toFixed(2) ?? "-"}</div>
          <div className="text-right">{renderStats.last100?.max?.toFixed(2) ?? "-"}</div>
          <div className="text-right">{renderStats.last100?.avg?.toFixed(2) ?? "-"}</div>

          <div className="font-bold">Last 1000</div>
          <div className="text-right">{renderStats.last1000?.min?.toFixed(2) ?? "-"}</div>
          <div className="text-right">{renderStats.last1000?.max?.toFixed(2) ?? "-"}</div>
          <div className="text-right">{renderStats.last1000?.avg?.toFixed(2) ?? "-"}</div>
        </div>
      )}

      <div className="text-center">
        <span className="font-bold text-[8px] lg:text-base">
          <span className="lg:block">© 2025 </span>
          <span className="lg:block">Luke Benjamin May </span>
        </span>
        <span className="hidden lg:block text-[10px] text-base-400 mt-0.5">
          All rights reserved
        </span>
      </div>
    </div>
  );
};

export default Footer;
