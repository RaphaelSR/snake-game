import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useGame } from "@/context/GameContext";
import type { Direction } from "@/types";

export function MobileControls(): JSX.Element {
  const { changeDirection } = useGame();

  const handleDirectionChange = (direction: Direction): void => {
    changeDirection(direction);
  };

  const buttonClass =
    "flex items-center justify-center w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors touch-manipulation";

  return (
    <div className="block sm:hidden mt-6">
      <div className="flex flex-col items-center gap-2">
        <button
          className={buttonClass}
          onClick={() => handleDirectionChange("UP")}
        >
          <ChevronUp className="w-6 h-6" />
        </button>

        <div className="flex gap-2">
          <button
            className={buttonClass}
            onClick={() => handleDirectionChange("LEFT")}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="w-12 h-12" />

          <button
            className={buttonClass}
            onClick={() => handleDirectionChange("RIGHT")}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <button
          className={buttonClass}
          onClick={() => handleDirectionChange("DOWN")}
        >
          <ChevronDown className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
