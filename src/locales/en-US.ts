import type { Translations } from "@/types/i18n";

export const enUS: Translations = {
  game: {
    title: "Snake Game",
    instructions:
      "Use arrow keys or WASD to move • Space to pause/start • R to restart",
    score: "Score",
    highScore: "High Score",
    time: "Time",
    gameOver: "Game Over",
    newHighScore: "New High Score! 🎉",
    playAgain: "Play Again",
    start: "Start",
    pause: "Pause",
    restart: "Restart"
  },
  modes: {
    classic: {
      name: "Classic",
      description: "Traditional snake game"
    },
    infinite: {
      name: "Infinite Borders",
      description: "Snake passes through borders and appears on the other side"
    },
    moving_food: {
      name: "Moving Food",
      description: "Food changes position periodically"
    },
    time_attack: {
      name: "Time Attack",
      description: "Score as much as possible in 2 minutes"
    }
  },
  difficulty: {
    easy: {
      name: "Easy",
      description: "Reduced speed for beginners"
    },
    regular: {
      name: "Regular",
      description: "Standard game speed"
    },
    hard: {
      name: "Hard",
      description: "High speed for experts"
    },
    movingFoodLabel: "Moving food",
    foodSpeed: {
      slow: "slow",
      moderate: "moderate",
      fast: "fast"
    }
  },
  themes: {
    classic: "Classic",
    retro: "Retro",
    neon: "Neon"
  },
  settings: {
    title: "Game Settings",
    gameMode: "Game Mode",
    difficulty: "Difficulty",
    theme: "Visual Theme",
    language: "Language"
  },
  footer: {
    madeBy: "Made by",
    openSource: "Open source",
    viewOnGitHub: "View on GitHub"
  },
  rankings: {
    title: "Rankings",
    enterName: "Enter your name",
    playerName: "Player name",
    namePlaceholder: "Enter your name",
    defaultPlayerName: "Anonymous",
    characters: "characters",
    invalidName: "Name must be between 2 and 20 characters",
    qualifiedForRanking: "You qualified for the ranking!",
    submit: "Submit",
    skip: "Skip",
    empty: "No rankings found",
    loadAll: "Load all rankings",
    success: {
      title: "🎉 Congratulations!",
      general: "You made it to the ranking!",
      firstPlace: "🥇 You achieved 1st place!",
      topThree: "🏆 You got {rank} place!",
      topTen: "⭐ You got {rank} place!",
      improved: "Improved from {oldRank} to {newRank} place!"
    }
  },
  common: {
    loading: "Loading...",
    continue: "Continue"
  }
};
