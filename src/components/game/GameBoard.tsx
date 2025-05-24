import React from "react";
import { useGame } from "@/context/GameContext";
import { GRID_SIZE } from "@/utils/gameLogic";

export function GameBoard(): JSX.Element {
  const { snake, food } = useGame();

  const renderCell = (x: number, y: number): JSX.Element => {
    const isSnakeHead = snake[0]?.x === x && snake[0]?.y === y;
    const isSnakeBody = snake
      .slice(1)
      .some((segment) => segment.x === x && segment.y === y);
    const isFood = food.x === x && food.y === y;

    let cellClass = "w-full h-full border border-gray-200";

    if (isSnakeHead) {
      cellClass += " bg-green-600";
    } else if (isSnakeBody) {
      cellClass += " bg-green-400";
    } else if (isFood) {
      cellClass += " bg-red-500 rounded-full";
    } else {
      cellClass += " bg-gray-50";
    }

    return <div key={`${x}-${y}`} className={cellClass} />;
  };

  return (
    <div className="w-full max-w-lg mx-auto aspect-square bg-gray-100 p-2 rounded-lg shadow-lg">
      <div
        className="grid gap-px h-full w-full"
        style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
      >
        {Array.from({ length: GRID_SIZE }, (_, y) =>
          Array.from({ length: GRID_SIZE }, (_, x) => renderCell(x, y))
        )}
      </div>
    </div>
  );
}
