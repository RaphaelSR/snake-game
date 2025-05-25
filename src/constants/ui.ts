export const UI_CONSTANTS = {
  MODAL_Z_INDEX: 50,
  SETTINGS_BUTTON_SIZE: 50,
  MOBILE_CONTROL_SIZE: 48,

  TRANSITION_DURATION: 300,

  BREAKPOINTS: {
    SM: 640,
    MD: 768,
    LG: 1024
  },

  GRID_GAPS: {
    SMALL: 8,
    MEDIUM: 12,
    LARGE: 16
  }
} as const;

export const THEME_EFFECTS = {
  GLOW: "glow",
  PIXELATED: "pixelated"
} as const;
