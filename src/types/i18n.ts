import type { Language } from "@/constants";

export interface I18nContextType {
  language: Language;
  changeLanguage: (language: Language) => void;
  t: (key: string) => string;
  availableLanguages: Language[];
}

export interface Translations {
  game: {
    title: string;
    instructions: string;
    score: string;
    highScore: string;
    time: string;
    gameOver: string;
    newHighScore: string;
    playAgain: string;
    start: string;
    pause: string;
    restart: string;
  };
  modes: {
    classic: {
      name: string;
      description: string;
    };
    infinite: {
      name: string;
      description: string;
    };
    moving_food: {
      name: string;
      description: string;
    };
    time_attack: {
      name: string;
      description: string;
    };
  };
  difficulty: {
    easy: {
      name: string;
      description: string;
    };
    regular: {
      name: string;
      description: string;
    };
    hard: {
      name: string;
      description: string;
    };
    movingFoodLabel: string;
    foodSpeed: {
      slow: string;
      moderate: string;
      fast: string;
    };
  };
  themes: {
    classic: string;
    retro: string;
    neon: string;
  };
  settings: {
    title: string;
    gameMode: string;
    difficulty: string;
    theme: string;
    language: string;
  };
}
