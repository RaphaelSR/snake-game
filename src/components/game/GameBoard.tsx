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

    let cellStyle: React.CSSProperties = {
      width: "100%",
      height: "100%",
      border: `1px solid var(--color-grid)`,
      backgroundColor: "var(--color-background)"
    };

    if (isSnakeHead || isSnakeBody) {
      cellStyle.backgroundColor = "var(--color-snake)";
    } else if (isFood) {
      cellStyle.backgroundColor = "var(--color-food)";
      cellStyle.borderRadius = "50%";
    }

    return <div key={`${x}-${y}`} style={cellStyle} />;
  };

  return (
    <div
      className="w-full max-w-lg mx-auto aspect-square p-2 rounded-lg shadow-lg"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div
        className="grid gap-px h-full w-full"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          backgroundColor: "var(--color-grid)"
        }}
      >
        {Array.from({ length: GRID_SIZE }, (_, y) =>
          Array.from({ length: GRID_SIZE }, (_, x) => renderCell(x, y))
        )}
      </div>
    </div>
  );
}
