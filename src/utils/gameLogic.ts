import type { Position, Direction } from "@/types";

export const INITIAL_SNAKE: Position[] = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 }
];

export const GRID_SIZE = 20;

const DIRECTION_VECTORS: Record<Direction, Position> = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 }
};

// Generate food position avoiding snake collision
export function generateFood(snake: Position[]): Position {
  let food: Position;
  do {
    food = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };
  } while (
    snake.some((segment) => segment.x === food.x && segment.y === food.y)
  );

  return food;
}

export function moveSnake(snake: Position[], direction: Direction): Position[] {
  const head = snake[0];
  const newHead = getNewHead(head, direction);

  return [newHead, ...snake.slice(0, -1)];
}

export function getNewHead(head: Position, direction: Direction): Position {
  const vector = DIRECTION_VECTORS[direction];
  return {
    x: head.x + vector.x,
    y: head.y + vector.y
  };
}

// Check collision with walls or self
export function checkCollision(head: Position, snake: Position[]): boolean {
  if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
    return true;
  }

  return snake
    .slice(1)
    .some((segment) => segment.x === head.x && segment.y === head.y);
}

export function checkFoodCollision(head: Position, food: Position): boolean {
  return head.x === food.x && head.y === food.y;
}

export function getOppositeDirection(direction: Direction): Direction {
  const opposites: Record<Direction, Direction> = {
    UP: "DOWN",
    DOWN: "UP",
    LEFT: "RIGHT",
    RIGHT: "LEFT"
  };
  return opposites[direction];
}
