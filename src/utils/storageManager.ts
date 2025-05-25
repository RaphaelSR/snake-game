import type { GameSettings } from "@/types";

const HIGH_SCORE_KEY = "snake_high_score";
const GAME_SETTINGS_KEY = "snake_settings";

export function saveHighScore(score: number): void {
  localStorage.setItem(HIGH_SCORE_KEY, score.toString());
}

export function getHighScore(): number {
  const score = localStorage.getItem(HIGH_SCORE_KEY);
  return score ? parseInt(score, 10) : 0;
}

export function saveGameSettings(settings: GameSettings): void {
  localStorage.setItem(GAME_SETTINGS_KEY, JSON.stringify(settings));
}

export function getGameSettings(): GameSettings | null {
  try {
    const settings = localStorage.getItem(GAME_SETTINGS_KEY);
    return settings ? (JSON.parse(settings) as GameSettings) : null;
  } catch {
    return null;
  }
}

export function clearGameData(): void {
  localStorage.removeItem(HIGH_SCORE_KEY);
  localStorage.removeItem(GAME_SETTINGS_KEY);
}
