import { GAME_CONSTANTS } from "@/constants";

export type GameMode = "classic" | "infinite" | "moving_food" | "time_attack";
export type Difficulty = "easy" | "regular" | "hard";

export interface GameModeConfig {
  id: GameMode;
  features: {
    infiniteBorders?: boolean;
    movingFood?: boolean;
    timeLimit?: number;
    foodMoveInterval?: number;
  };
}

export interface DifficultyConfig {
  id: Difficulty;
  speed: number;
  scoreMultiplier: number;
  foodSpeedMultiplier: number;
}

export interface GameSettings {
  mode: GameMode;
  difficulty: Difficulty;
}

export const GAME_MODES: Record<GameMode, GameModeConfig> = {
  classic: {
    id: "classic",
    features: {}
  },
  infinite: {
    id: "infinite",
    features: {
      infiniteBorders: true
    }
  },
  moving_food: {
    id: "moving_food",
    features: {
      movingFood: true,
      foodMoveInterval: GAME_CONSTANTS.FOOD_MOVE_INTERVALS.MOVING_FOOD
    }
  },
  time_attack: {
    id: "time_attack",
    features: {
      timeLimit: GAME_CONSTANTS.TIME_LIMITS.TIME_ATTACK,
      movingFood: true,
      foodMoveInterval: GAME_CONSTANTS.FOOD_MOVE_INTERVALS.TIME_ATTACK
    }
  }
} as const;

export const DIFFICULTY_LEVELS: Record<Difficulty, DifficultyConfig> = {
  easy: {
    id: "easy",
    speed: GAME_CONSTANTS.SPEEDS.EASY,
    scoreMultiplier: GAME_CONSTANTS.SCORE_MULTIPLIERS.EASY,
    foodSpeedMultiplier: GAME_CONSTANTS.FOOD_SPEED_MULTIPLIERS.EASY
  },
  regular: {
    id: "regular",
    speed: GAME_CONSTANTS.SPEEDS.REGULAR,
    scoreMultiplier: GAME_CONSTANTS.SCORE_MULTIPLIERS.REGULAR,
    foodSpeedMultiplier: GAME_CONSTANTS.FOOD_SPEED_MULTIPLIERS.REGULAR
  },
  hard: {
    id: "hard",
    speed: GAME_CONSTANTS.SPEEDS.HARD,
    scoreMultiplier: GAME_CONSTANTS.SCORE_MULTIPLIERS.HARD,
    foodSpeedMultiplier: GAME_CONSTANTS.FOOD_SPEED_MULTIPLIERS.HARD
  }
} as const;
