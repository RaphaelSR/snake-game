import type { Translations } from "@/types/i18n";

export const esAR: Translations = {
  game: {
    title: "Snake Game",
    instructions:
      "Usa las flechas o WASD para mover • Espacio para pausar • R para reiniciar",
    score: "Puntuación",
    highScore: "Récord",
    time: "Tiempo",
    gameOver: "Fin del Juego",
    newHighScore: "¡Nuevo Récord! 🎉",
    playAgain: "Jugar de Nuevo",
    start: "Iniciar",
    pause: "Pausar",
    restart: "Reiniciar"
  },
  modes: {
    classic: {
      name: "Clásico",
      description: "El juego tradicional de la serpiente"
    },
    infinite: {
      name: "Bordes Infinitos",
      description: "La serpiente atraviesa los bordes y aparece del otro lado"
    },
    moving_food: {
      name: "Comida Móvil",
      description: "La comida cambia de posición periódicamente"
    },
    time_attack: {
      name: "Contra el Tiempo",
      description: "Consigue el máximo de puntos en 2 minutos"
    }
  },
  difficulty: {
    easy: {
      name: "Fácil",
      description: "Velocidad reducida para principiantes"
    },
    regular: {
      name: "Normal",
      description: "Velocidad estándar del juego"
    },
    hard: {
      name: "Difícil",
      description: "Velocidad alta para expertos"
    },
    movingFoodLabel: "Comida móvil",
    foodSpeed: {
      slow: "lenta",
      moderate: "moderada",
      fast: "rápida"
    }
  },
  themes: {
    classic: "Clásico",
    retro: "Retro",
    neon: "Neón"
  },
  settings: {
    title: "Configuraciones del Juego",
    gameMode: "Modo de Juego",
    difficulty: "Dificultad",
    theme: "Tema Visual",
    language: "Idioma"
  },
  footer: {
    madeBy: "Hecho por",
    openSource: "Código abierto",
    viewOnGitHub: "Ver en GitHub"
  }
};
