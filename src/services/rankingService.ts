import {
  collection,
  doc,
  getDocs,
  setDoc,
  query,
  where,
  orderBy,
  limit,
  writeBatch,
  serverTimestamp
} from "firebase/firestore";
import { db } from "@/config/firebase";
import type {
  RankingEntry,
  RankingsData,
  PlayerRankingResult
} from "@/types/rankings";
import type { GameMode, Difficulty } from "@/types";
import { RANKING_CONSTANTS } from "@/constants/rankings";
import { sanitizePlayerName } from "@/utils/rankingUtils";

class RankingService {
  private cache: Map<string, { data: RankingEntry[]; timestamp: number }> =
    new Map();

  private getCacheKey(mode: GameMode, difficulty: Difficulty): string {
    return `${mode}_${difficulty}`;
  }

  private isValidScore(score: number): boolean {
    return score >= RANKING_CONSTANTS.MIN_SCORE_FOR_RANKING;
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
      } catch (indexError) {
        const q = query(
          collection(db, RANKING_CONSTANTS.FIREBASE.COLLECTION),
          where("mode", "==", mode),
          where("difficulty", "==", difficulty)
        );

        const snapshot = await getDocs(q);
        const allEntries: RankingEntry[] = [];

        snapshot.forEach((doc) => {
          const data = doc.data();
          allEntries.push({
            id: doc.id,
            playerName: data.playerName || "Unknown",
            score:
              typeof data.score === "number" && !isNaN(data.score)
                ? data.score
                : 0,
            mode: data.mode,
            difficulty: data.difficulty,
            timestamp: data.timestamp?.seconds * 1000 || Date.now(),
            rank: 0
          });
        });

        allEntries.sort((a, b) => b.score - a.score);

        const limitedEntries = allEntries
          .slice(0, RANKING_CONSTANTS.MAX_RANKINGS_PER_MODE)
          .map((entry, index) => ({
            ...entry,
            rank: index + 1
          }));

        this.cache.set(cacheKey, {
          data: limitedEntries,
          timestamp: Date.now()
        });

        return limitedEntries;
      }
    } catch (error) {
      return [];
    }
  }

  private processSnapshot(snapshot: any, cacheKey: string): RankingEntry[] {
    const rankings: RankingEntry[] = [];

    snapshot.forEach((doc: any, index: number) => {
      const data = doc.data();
      rankings.push({
        id: doc.id,
        playerName: data.playerName || "Unknown",
        score:
          typeof data.score === "number" && !isNaN(data.score) ? data.score : 0,
        mode: data.mode,
        difficulty: data.difficulty,
        timestamp: data.timestamp?.seconds * 1000 || Date.now(),
        rank: index + 1
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
      return {
        isNewRanking: false,
        mode,
        difficulty,
        score
      };
    }

    try {
      const sanitizedName = sanitizePlayerName(playerName);

      const docId = `${mode}_${difficulty}_${sanitizedName}_${Date.now()}`;
      const newEntry = {
        playerName: sanitizedName,
        score,
        mode,
        difficulty,
        timestamp: serverTimestamp()
      };

      await setDoc(
        doc(db, RANKING_CONSTANTS.FIREBASE.COLLECTION, docId),
        newEntry
      );

      this.clearCache(mode, difficulty);
      await this.cleanupOldRankings(mode, difficulty);

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
      return {
        isNewRanking: false,
        mode,
        difficulty,
        score
      };
    }
  }

  private async cleanupOldRankings(
    mode: GameMode,
    difficulty: Difficulty
  ): Promise<void> {
    try {
      const q = query(
        collection(db, RANKING_CONSTANTS.FIREBASE.COLLECTION),
        where("mode", "==", mode),
        where("difficulty", "==", difficulty)
      );

      const snapshot = await getDocs(q);

      if (snapshot.size <= RANKING_CONSTANTS.MAX_RANKINGS_PER_MODE) {
        return;
      }

      const allDocs = snapshot.docs.map((doc) => ({
        doc,
        data: doc.data(),
        score: doc.data().score || 0
      }));

      allDocs.sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }
        const aTime = a.data.timestamp?.seconds || 0;
        const bTime = b.data.timestamp?.seconds || 0;
        return bTime - aTime;
      });

      const docsToDelete = allDocs.slice(
        RANKING_CONSTANTS.MAX_RANKINGS_PER_MODE
      );

      if (docsToDelete.length > 0) {
        const batch = writeBatch(db);
        docsToDelete.forEach(({ doc }) => {
          batch.delete(doc.ref);
        });

        await batch.commit();
      }
    } catch (error) {}
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
