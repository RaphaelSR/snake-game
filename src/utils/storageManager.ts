const HIGH_SCORE_KEY = "snake_high_score";
const GAME_SETTINGS_KEY = "snake_settings";

export function saveHighScore(score: number): void {
  localStorage.setItem(HIGH_SCORE_KEY, score.toString());
}

export function getHighScore(): number {
  const score = localStorage.getItem(HIGH_SCORE_KEY);
  return score ? parseInt(score, 10) : 0;
}

export function saveGameSettings(settings: Record<string, unknown>): void {
  localStorage.setItem(GAME_SETTINGS_KEY, JSON.stringify(settings));
}

export function getGameSettings(): Record<string, unknown> | null {
  const settings = localStorage.getItem(GAME_SETTINGS_KEY);
  return settings ? JSON.parse(settings) : null;
}

export function clearGameData(): void {
  localStorage.removeItem(HIGH_SCORE_KEY);
  localStorage.removeItem(GAME_SETTINGS_KEY);
}
