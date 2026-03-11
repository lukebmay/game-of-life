/*
 * Author: Luke Benjamin May
 * Website: lukemay.com
 *
 * Copyright © 2025-2026 Luke B. May. All rights reserved.
 *
 * This is part of my personal portfolio.
 * No permission is granted to copy, modify, distribute, or use this code.
 */
import AppStage from "@features/AppStage";
import BrandingBar from "@features/BrandingBar";
import Help from "@features/Help";
import { useSyncBoardColors } from "@hooks/useSyncBoardColors";
import { useAppStore } from "@store/appStore";
import clsx from "clsx";
import React, { useEffect } from "react";

const App: React.FC = () => {
  const cmpClass = "app-cmp";

  // Theme
  useEffect(() => {
    const unsubscribe = useAppStore.subscribe(
      (state) => state.isDarkMode,
      (newValue: boolean) => {
        const theme = newValue ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", theme);
        document.documentElement.style.colorScheme = `only ${theme}`;
      },
    );
    const initialTheme = useAppStore.getState().isDarkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", initialTheme);
    document.documentElement.style.colorScheme = `only ${initialTheme}`;
    return unsubscribe;
  }, []);

  useSyncBoardColors();

  return (
    <div
      className={clsx(
        "flex",
        "flex-col",
        "h-dvh",
        "bg-base-100",
        "text-base-content",
        "transition-all duration-300 ease-in-out",
        cmpClass,
      )}
    >
      <BrandingBar />
      <AppStage />
      <Help />
    </div>
  );
};

export default App;
