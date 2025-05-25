export const RANKING_CONSTANTS = {
  MAX_RANKINGS_PER_MODE: 10,
  MIN_SCORE_FOR_RANKING: 10,
  MAX_PLAYER_NAME_LENGTH: 20,
  MIN_PLAYER_NAME_LENGTH: 2,

  STORAGE_KEYS: {
    PLAYER_NAME: "snake_player_name",
    LAST_RANKING_CHECK: "snake_last_ranking_check"
  },

  FIREBASE: {
    COLLECTION: "rankings",
    CACHE_DURATION: 5 * 60 * 1000
  }
} as const;

export const RANKING_MESSAGES = {
  NEW_RECORD: "new_record",
  TOP_3: "top_3",
  TOP_10: "top_10",
  IMPROVED_RANK: "improved_rank"
} as const;
