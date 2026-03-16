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

export const useTheme = () => {
  const isDarkMode = useAppStore((state) => state.isDarkMode);

  useEffect(() => {
    const theme = isDarkMode ? "dark" : "light";
    const html = document.documentElement;

    // Tailwind and DaisyUI theme management
    html.setAttribute("data-theme", theme);
    // Native browser CSS theme management
    html.style.colorScheme = `only ${theme}`;
  }, [isDarkMode]);
};
