import type { Translations } from "@/types/i18n";

export const ptBR: Translations = {
  game: {
    title: "Snake Game",
    instructions:
      "Use as setas ou WASD para mover • Espaço para pausar/iniciar • R para reiniciar",
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
  },
  footer: {
    madeBy: "Feito por",
    openSource: "Código aberto",
    viewOnGitHub: "Ver no GitHub"
  },
  rankings: {
    title: "Rankings",
    enterName: "Digite seu nome",
    playerName: "Nome do jogador",
    namePlaceholder: "Digite seu nome",
    defaultPlayerName: "Anônimo",
    characters: "caracteres",
    invalidName: "Nome deve ter entre 2 e 20 caracteres",
    qualifiedForRanking: "Você se qualificou para o ranking!",
    submit: "Enviar",
    skip: "Pular",
    empty: "Nenhum ranking encontrado",
    loadAll: "Carregar todos os rankings",
    success: {
      title: "🎉 Parabéns!",
      general: "Você entrou no ranking!",
      firstPlace: "🥇 Você conquistou o 1º lugar!",
      topThree: "🏆 Você ficou em {rank}º lugar!",
      topTen: "⭐ Você ficou em {rank}º lugar!",
      improved: "Subiu do {oldRank}º para o {newRank}º lugar!"
    }
  },
  common: {
    loading: "Carregando...",
    continue: "Continuar"
  }
};
