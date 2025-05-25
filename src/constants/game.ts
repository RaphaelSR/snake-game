export const GAME_CONSTANTS = {
  GRID_SIZE: 20,
  INITIAL_SNAKE_LENGTH: 3,
  INITIAL_SNAKE_POSITION: { x: 10, y: 10 },
  DEFAULT_DIRECTION: "RIGHT" as const,

  SPEEDS: {
    EASY: 200,
    REGULAR: 150,
    HARD: 100
  },

  SCORE_MULTIPLIERS: {
    EASY: 1,
    REGULAR: 1.5,
    HARD: 2
  },

  FOOD_SPEED_MULTIPLIERS: {
    EASY: 2.5,
    REGULAR: 1.5,
    HARD: 1
  },

  TIME_LIMITS: {
    TIME_ATTACK: 120000 // 2 minutes in milliseconds
  },

  FOOD_MOVE_INTERVALS: {
    MOVING_FOOD: 8000,
    TIME_ATTACK: 6000
  }
} as const;

export const DIRECTION_VECTORS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 }
} as const;

export const KEY_MAPPINGS = {
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
