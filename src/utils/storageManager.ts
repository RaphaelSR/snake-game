import { STORAGE_KEYS } from "@/constants";

export function saveHighScore(score: number): void {
  localStorage.setItem(STORAGE_KEYS.HIGH_SCORE, score.toString());
}

export function getHighScore(): number {
  const saved = localStorage.getItem(STORAGE_KEYS.HIGH_SCORE);
  return saved ? parseInt(saved, 10) || 0 : 0;
}

export function saveGameSettings(settings: any): void {
  localStorage.setItem(STORAGE_KEYS.GAME_SETTINGS, JSON.stringify(settings));
}

export function getGameSettings(): any {
  const saved = localStorage.getItem(STORAGE_KEYS.GAME_SETTINGS);
  return saved ? JSON.parse(saved) : null;
}
