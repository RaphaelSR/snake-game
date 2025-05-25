import type { GameMode, Difficulty } from "./gameSettings";

export interface RankingEntry {
  id: string;
  playerName: string;
  score: number;
  mode: GameMode;
  difficulty: Difficulty;
  timestamp: number;
  rank: number;
}

export interface RankingStats {
  totalPlayers: number;
  averageScore: number;
  lastUpdated: number;
}

export interface ModeRankings {
  [key: string]: RankingEntry[];
}

export interface RankingsData {
  [mode: string]: {
    [difficulty: string]: RankingEntry[];
  };
}

export interface PlayerRankingResult {
  isNewRanking: boolean;
  rank?: number;
  mode: GameMode;
  difficulty: Difficulty;
  score: number;
  previousRank?: number;
}
