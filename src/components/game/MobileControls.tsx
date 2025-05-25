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

  const buttonStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "3rem",
    height: "3rem",
    backgroundColor: "var(--color-background)",
    color: "var(--color-text)",
    border: `2px solid var(--color-grid)`,
    borderRadius: "0.5rem",
    transition: "all 0.3s ease",
    touchAction: "manipulation"
  };

  return (
    <div className="block sm:hidden mt-6">
      <div className="flex flex-col items-center gap-2">
        <button
          style={buttonStyle}
          onClick={() => handleDirectionChange("UP")}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--color-grid)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--color-background)";
          }}
        >
          <ChevronUp className="w-6 h-6" />
        </button>

        <div className="flex gap-2">
          <button
            style={buttonStyle}
            onClick={() => handleDirectionChange("LEFT")}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--color-grid)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--color-background)";
            }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="w-12 h-12" />

          <button
            style={buttonStyle}
            onClick={() => handleDirectionChange("RIGHT")}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--color-grid)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--color-background)";
            }}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <button
          style={buttonStyle}
          onClick={() => handleDirectionChange("DOWN")}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--color-grid)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--color-background)";
          }}
        >
          <ChevronDown className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
