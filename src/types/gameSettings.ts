export type GameMode = "classic" | "infinite" | "moving_food" | "time_attack";
export type Difficulty = "easy" | "regular" | "hard";

export interface GameModeConfig {
  id: GameMode;
  name: string;
  description: string;
  features: {
    infiniteBorders?: boolean;
    movingFood?: boolean;
    timeLimit?: number;
    foodMoveInterval?: number;
  };
}

export interface DifficultyConfig {
  id: Difficulty;
  name: string;
  speed: number;
  scoreMultiplier: number;
  description: string;
  foodSpeedMultiplier: number;
}

export interface GameSettings {
  mode: GameMode;
  difficulty: Difficulty;
}

export const GAME_MODES: Record<GameMode, GameModeConfig> = {
  classic: {
    id: "classic",
    name: "Clássico",
    description: "O jogo tradicional da cobrinha",
    features: {}
  },
  infinite: {
    id: "infinite",
    name: "Bordas Infinitas",
    description: "A cobra atravessa as bordas e aparece do outro lado",
    features: {
      infiniteBorders: true
    }
  },
  moving_food: {
    id: "moving_food",
    name: "Comida Móvel",
    description: "A comida muda de posição periodicamente",
    features: {
      movingFood: true,
      foodMoveInterval: 8000
    }
  },
  time_attack: {
    id: "time_attack",
    name: "Contra o Tempo",
    description: "Faça o máximo de pontos em 2 minutos",
    features: {
      timeLimit: 120000,
      movingFood: true,
      foodMoveInterval: 6000
    }
  }
} as const;

export const DIFFICULTY_LEVELS: Record<Difficulty, DifficultyConfig> = {
  easy: {
    id: "easy",
    name: "Fácil",
    speed: 200,
    scoreMultiplier: 1,
    description: "Velocidade reduzida para iniciantes",
    foodSpeedMultiplier: 2.5
  },
  regular: {
    id: "regular",
    name: "Normal",
    speed: 150,
    scoreMultiplier: 1.5,
    description: "Velocidade padrão do jogo",
    foodSpeedMultiplier: 1.5
  },
  hard: {
    id: "hard",
    name: "Difícil",
    speed: 100,
    scoreMultiplier: 2,
    description: "Velocidade alta para experts",
    foodSpeedMultiplier: 1
  }
} as const;
