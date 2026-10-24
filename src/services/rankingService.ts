import {
  collection,
  doc,
  getDocs,
  setDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp
} from "firebase/firestore";
import type { DocumentData, QuerySnapshot } from "firebase/firestore";
import { db } from "@/config/firebase";
import type {
  RankingEntry,
  RankingsData,
  PlayerRankingResult
} from "@/types/rankings";
import type { GameMode, Difficulty } from "@/types";
import { RANKING_CONSTANTS } from "@/constants/rankings";
import { sanitizePlayerName, isValidPlayerName } from "@/utils/rankingUtils";

class RankingService {
  private cache: Map<string, { data: RankingEntry[]; timestamp: number }> =
    new Map();
  private lastSubmissionTime: number = 0;
  private readonly RATE_LIMIT_MS = 30000; // 30 seconds

  private getCacheKey(mode: GameMode, difficulty: Difficulty): string {
    return `${mode}_${difficulty}`;
  }

  private isValidScore(score: number): boolean {
    return (
      score >= RANKING_CONSTANTS.MIN_SCORE_FOR_RANKING &&
      score <= 100000 &&
      Number.isInteger(score)
    );
  }

  private checkRateLimit(): boolean {
    const now = Date.now();
    if (now - this.lastSubmissionTime < this.RATE_LIMIT_MS) {
      return false;
    }
    this.lastSubmissionTime = now;
    return true;
  }

  async getRankings(
    mode: GameMode,
    difficulty: Difficulty
  ): Promise<RankingEntry[]> {
    const cacheKey = this.getCacheKey(mode, difficulty);
    const cached = this.cache.get(cacheKey);

    if (
      cached &&
      Date.now() - cached.timestamp < RANKING_CONSTANTS.FIREBASE.CACHE_DURATION
    ) {
      return cached.data;
    }

    try {
      const q = query(
        collection(db, RANKING_CONSTANTS.FIREBASE.COLLECTION),
        where("mode", "==", mode),
        where("difficulty", "==", difficulty),
        orderBy("score", "desc"),
        limit(RANKING_CONSTANTS.MAX_RANKINGS_PER_MODE)
      );

      const snapshot = await getDocs(q);
      return this.processSnapshot(snapshot, cacheKey);
    } catch (error) {
      return [];
    }
  }

  private processSnapshot(snapshot: QuerySnapshot<DocumentData>, cacheKey: string): RankingEntry[] {
    const rankings: RankingEntry[] = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      rankings.push({
        id: doc.id,
        playerName: data.playerName || "Unknown",
        score:
          typeof data.score === "number" && !isNaN(data.score) ? data.score : 0,
        mode: data.mode,
        difficulty: data.difficulty,
        timestamp: data.timestamp?.seconds * 1000 || Date.now(),
        rank: rankings.length + 1
      });
    });

    this.cache.set(cacheKey, { data: rankings, timestamp: Date.now() });
    return rankings;
  }

  async getAllRankings(): Promise<RankingsData> {
    const modes: GameMode[] = [
      "classic",
      "infinite",
      "moving_food",
      "time_attack"
    ];
    const difficulties: Difficulty[] = ["easy", "regular", "hard"];

    const rankingPromises = modes.flatMap((mode) =>
      difficulties.map((difficulty) => ({
        mode,
        difficulty,
        promise: this.getRankings(mode, difficulty)
      }))
    );

    const results = await Promise.all(
      rankingPromises.map(async ({ mode, difficulty, promise }) => ({
        mode,
        difficulty,
        rankings: await promise
      }))
    );

    const rankings: RankingsData = {};
    for (const mode of modes) {
      rankings[mode] = {};
      for (const difficulty of difficulties) {
        const result = results.find(
          (r) => r.mode === mode && r.difficulty === difficulty
        );
        rankings[mode][difficulty] = result?.rankings || [];
      }
    }

    return rankings;
  }

  async getRankingsForMode(mode: GameMode): Promise<RankingsData[GameMode]> {
    const difficulties: Difficulty[] = ["easy", "regular", "hard"];
    const promises = difficulties.map((difficulty) =>
      this.getRankings(mode, difficulty)
    );

    const results = await Promise.all(promises);

    const modeRankings: RankingsData[GameMode] = {};
    difficulties.forEach((difficulty, index) => {
      modeRankings[difficulty] = results[index];
    });

    return modeRankings;
  }

  async getRankingsForCurrentSettings(
    mode: GameMode,
    difficulty: Difficulty
  ): Promise<RankingEntry[]> {
    return this.getRankings(mode, difficulty);
  }

  clearCache(mode?: GameMode, difficulty?: Difficulty): void {
    if (mode && difficulty) {
      const cacheKey = this.getCacheKey(mode, difficulty);
      this.cache.delete(cacheKey);
    } else {
      this.cache.clear();
    }
  }

  async submitScore(
    playerName: string,
    score: number,
    mode: GameMode,
    difficulty: Difficulty
  ): Promise<PlayerRankingResult> {
    if (!this.isValidScore(score)) {
      throw new Error("Invalid score: must be between 10 and 100000");
    }

    if (!this.checkRateLimit()) {
      throw new Error(
        "Rate limit exceeded: please wait 30 seconds between submissions"
      );
    }

    try {
      const sanitizedName = sanitizePlayerName(playerName);

      if (!isValidPlayerName(sanitizedName)) {
        throw new Error(
          "Invalid player name: only letters, numbers, spaces, hyphens, underscores and dots allowed"
        );
      }

      const docId = `${mode}_${difficulty}_${sanitizedName}_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;
      const newEntry = {
        playerName: sanitizedName,
        score: Math.floor(score),
        mode,
        difficulty,
        timestamp: serverTimestamp()
      };

      await setDoc(
        doc(db, RANKING_CONSTANTS.FIREBASE.COLLECTION, docId),
        newEntry
      );

      this.clearCache(mode, difficulty);

      const updatedRankings = await this.getRankings(mode, difficulty);
      const userEntry = updatedRankings.find(
        (entry) => entry.playerName === sanitizedName
      );

      const result: PlayerRankingResult = {
        isNewRanking: !!userEntry,
        rank: userEntry?.rank,
        mode,
        difficulty,
        score,
        previousRank: undefined
      };

      return result;
    } catch (error) {
      this.lastSubmissionTime = 0;
      throw error;
    }
  }

  async getPlayerRank(
    playerName: string,
    mode: GameMode,
    difficulty: Difficulty
  ): Promise<number | null> {
    const rankings = await this.getRankings(mode, difficulty);
    const entry = rankings.find((r) => r.playerName === playerName);
    return entry?.rank || null;
  }
}

export const rankingService = new RankingService();
