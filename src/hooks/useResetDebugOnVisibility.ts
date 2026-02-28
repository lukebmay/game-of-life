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
import { useEffect } from "react";

// Resets debug render stats whenever the tab becomes visible again
// (e.g. after suspension, backgrounding, tab switch, phone lock, etc.)
export const useResetDebugOnVisibility = () => {
  const resetRenderStats = useAppStore((state) => state.resetRenderStats);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        resetRenderStats();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [resetRenderStats]);
};
