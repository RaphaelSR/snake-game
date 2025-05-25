import type { Position, Direction, GameMode } from "@/types";
import { GAME_CONSTANTS, DIRECTION_VECTORS } from "@/constants";

export const INITIAL_SNAKE: Position[] = [
  GAME_CONSTANTS.INITIAL_SNAKE_POSITION,
  {
    x: GAME_CONSTANTS.INITIAL_SNAKE_POSITION.x - 1,
    y: GAME_CONSTANTS.INITIAL_SNAKE_POSITION.y
  },
  {
    x: GAME_CONSTANTS.INITIAL_SNAKE_POSITION.x - 2,
    y: GAME_CONSTANTS.INITIAL_SNAKE_POSITION.y
  }
];

export const GRID_SIZE = GAME_CONSTANTS.GRID_SIZE;

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

export function moveSnakeWithMode(
  snake: Position[],
  direction: Direction,
  mode: GameMode
): Position[] {
  const head = snake[0];
  const newHead = getNewHeadWithMode(head, direction, mode);

  return [newHead, ...snake.slice(0, -1)];
}

export function getNewHead(head: Position, direction: Direction): Position {
  const vector = DIRECTION_VECTORS[direction];
  return {
    x: head.x + vector.x,
    y: head.y + vector.y
  };
}

export function getNewHeadWithMode(
  head: Position,
  direction: Direction,
  mode: GameMode
): Position {
  const vector = DIRECTION_VECTORS[direction];
  let newX = head.x + vector.x;
  let newY = head.y + vector.y;

  if (mode === "infinite") {
    if (newX < 0) newX = GRID_SIZE - 1;
    if (newX >= GRID_SIZE) newX = 0;
    if (newY < 0) newY = GRID_SIZE - 1;
    if (newY >= GRID_SIZE) newY = 0;
  }

  return { x: newX, y: newY };
}

export function checkCollision(head: Position, snake: Position[]): boolean {
  if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
    return true;
  }

  return snake
    .slice(1)
    .some((segment) => segment.x === head.x && segment.y === head.y);
}

export function checkCollisionWithMode(
  head: Position,
  snake: Position[],
  mode: GameMode
): boolean {
  if (mode !== "infinite") {
    if (
      head.x < 0 ||
      head.x >= GRID_SIZE ||
      head.y < 0 ||
      head.y >= GRID_SIZE
    ) {
      return true;
    }
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
