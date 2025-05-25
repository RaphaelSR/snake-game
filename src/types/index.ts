export interface Position {
  x: number;
  y: number;
}

export interface GameState {
  snake: Position[];
  food: Position;
  direction: Direction;
  score: number;
  isGameOver: boolean;
  isPlaying: boolean;
  highScore: number;
  timeLeft?: number;
  foodEaten?: boolean;
}

export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

export * from "./gameSettings";
export * from "./i18n";
