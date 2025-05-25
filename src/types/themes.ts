export interface Theme {
  name: string;
  colors: {
    background: string;
    snake: string;
    food: string;
    grid: string;
    text: string;
    accent: string;
  };
  effects: {
    glow?: boolean;
    pixelated?: boolean;
  };
}

export const themes: { [key: string]: Theme } = {
  classic: {
    name: "Classic",
    colors: {
      background: "#f0f0f0",
      snake: "#4CAF50",
      food: "#FF5722",
      grid: "#ddd",
      text: "#333",
      accent: "#2196F3"
    },
    effects: {
      glow: false,
      pixelated: false
    }
  },
  retro: {
    name: "Retro",
    colors: {
      background: "#000000",
      snake: "#00ff00",
      food: "#ffff00",
      grid: "#003300",
      text: "#00ff00",
      accent: "#00ff00"
    },
    effects: {
      glow: true,
      pixelated: true
    }
  }
};
