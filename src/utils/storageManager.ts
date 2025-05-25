import type { GameSettings } from "@/types";
import { STORAGE_KEYS } from "@/constants";

export function saveHighScore(score: number): void {
  localStorage.setItem(STORAGE_KEYS.HIGH_SCORE, score.toString());
}

export function getHighScore(): number {
  const score = localStorage.getItem(STORAGE_KEYS.HIGH_SCORE);
  return score ? parseInt(score, 10) : 0;
}

export function saveGameSettings(settings: GameSettings): void {
  localStorage.setItem(STORAGE_KEYS.GAME_SETTINGS, JSON.stringify(settings));
}

export function getGameSettings(): GameSettings | null {
  try {
    const settings = localStorage.getItem(STORAGE_KEYS.GAME_SETTINGS);
    return settings ? (JSON.parse(settings) as GameSettings) : null;
  } catch {
    return null;
  }
}

export function clearGameData(): void {
  localStorage.removeItem(STORAGE_KEYS.HIGH_SCORE);
  localStorage.removeItem(STORAGE_KEYS.GAME_SETTINGS);
}
