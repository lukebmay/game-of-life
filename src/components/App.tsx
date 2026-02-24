import AppStage from "@features/AppStage";
import BrandingBar from "@features/BrandingBar";
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
    </div>
  );
};

export default App;
