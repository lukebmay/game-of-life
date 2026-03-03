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

export const useSyncBoardColors = () => {
  const syncBoardColors = useAppStore((state) => state.syncBoardColors);

  useEffect(() => {
    // Initial sync
    syncBoardColors();

    // Re-sync whenever dark mode or the source colors change
    const unsubscribe = useAppStore.subscribe(
      (state) => ({
        isDarkMode: state.isDarkMode,
        boardBgColorDark: state.boardBgColorDark,
        boardBgColorLight: state.boardBgColorLight,
        boardFgColorDark: state.boardFgColorDark,
        boardFgColorLight: state.boardFgColorLight,
        boardGridColorDark: state.boardGridColorDark,
        boardGridColorLight: state.boardGridColorLight,
      }),
      () => syncBoardColors(),
    );

    return unsubscribe;
  }, [syncBoardColors]);
};
