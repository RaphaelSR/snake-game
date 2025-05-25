import type { Translations } from "@/types/i18n";

export const ptBR: Translations = {
  game: {
    title: "Snake Game",
    instructions:
      "Use as setas ou WASD para mover • Espaço para pausar • R para reiniciar",
    score: "Pontuação",
    highScore: "Recorde",
    time: "Tempo",
    gameOver: "Fim de Jogo",
    newHighScore: "Novo Recorde! 🎉",
    playAgain: "Jogar Novamente",
    start: "Iniciar",
    pause: "Pausar",
    restart: "Reiniciar"
  },
  modes: {
    classic: {
      name: "Clássico",
      description: "O jogo tradicional da cobrinha"
    },
    infinite: {
      name: "Bordas Infinitas",
      description: "A cobra atravessa as bordas e aparece do outro lado"
    },
    moving_food: {
      name: "Comida Móvel",
      description: "A comida muda de posição periodicamente"
    },
    time_attack: {
      name: "Contra o Tempo",
      description: "Faça o máximo de pontos em 2 minutos"
    }
  },
  difficulty: {
    easy: {
      name: "Fácil",
      description: "Velocidade reduzida para iniciantes"
    },
    regular: {
      name: "Normal",
      description: "Velocidade padrão do jogo"
    },
    hard: {
      name: "Difícil",
      description: "Velocidade alta para experts"
    },
    movingFoodLabel: "Comida móvel",
    foodSpeed: {
      slow: "lenta",
      moderate: "moderada",
      fast: "rápida"
    }
  },
  themes: {
    classic: "Clássico",
    retro: "Retrô",
    neon: "Neon"
  },
  settings: {
    title: "Configurações do Jogo",
    gameMode: "Modo de Jogo",
    difficulty: "Dificuldade",
    theme: "Tema Visual",
    language: "Idioma"
  }
};
