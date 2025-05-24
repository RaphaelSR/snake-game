import { useEffect } from "react";
import type { Direction } from "@/types";

interface UseKeyboardProps {
  onDirectionChange: (direction: Direction) => void;
  onPause: () => void;
  onRestart: () => void;
  isPlaying: boolean;
}

const KEY_MAPPINGS = {
  movement: {
    UP: ["ArrowUp", "w", "W"],
    DOWN: ["ArrowDown", "s", "S"],
    LEFT: ["ArrowLeft", "a", "A"],
    RIGHT: ["ArrowRight", "d", "D"]
  },
  actions: {
    pause: [" "],
    restart: ["r", "R"]
  }
} as const;

export function useKeyboard({
  onDirectionChange,
  onPause,
  onRestart,
  isPlaying
}: UseKeyboardProps): void {
  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent): void {
      event.preventDefault();

      for (const [direction, keys] of Object.entries(KEY_MAPPINGS.movement) as [
        Direction,
        readonly string[]
      ][]) {
        if (keys.includes(event.key)) {
          onDirectionChange(direction as Direction);
          return;
        }
      }

      if (KEY_MAPPINGS.actions.pause.includes(event.key as " ") && isPlaying) {
        onPause();
        return;
      }

      if (KEY_MAPPINGS.actions.restart.includes(event.key as "r" | "R")) {
        onRestart();
        return;
      }
    }

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [onDirectionChange, onPause, onRestart, isPlaying]);
}
