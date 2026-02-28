import { useAppStore } from "@store/appStore";
import { useGameStore } from "@store/gameStore";
import { useEffect } from "react";

// hooks/useAutoPause.ts
export const useAutoPause = () => {
  const isPaused = useGameStore((s) => s.isPaused);
  const toggleIsPaused = useGameStore((s) => s.toggleIsPaused);
  const autoPauseAfterSeconds = useAppStore((s) => s.autoPauseAfterSeconds);

  useEffect(() => {
    if (isPaused || autoPauseAfterSeconds <= 0) {
      // clear any existing timer
      return;
    }

    const timeoutId = setTimeout(() => {
      toggleIsPaused(); // auto-pause
    }, autoPauseAfterSeconds * 1000);

    return () => clearTimeout(timeoutId);
  }, [isPaused, autoPauseAfterSeconds, toggleIsPaused]);
};
