import { useCallback } from "react";
import { logEvent, setUserProperties } from "firebase/analytics";
import { analytics, isAnalyticsEnabled } from "@/config/firebase";
import type { GameMode, Difficulty } from "@/types";
import type { Language } from "@/constants";

interface GameStartEvent {
  mode: GameMode;
  difficulty: Difficulty;
  theme: string;
  language: Language;
}

interface GameEndEvent {
  mode: GameMode;
  difficulty: Difficulty;
  score: number;
  duration: number;
  isNewHighScore: boolean;
}

interface SettingsChangeEvent {
  setting_type: "mode" | "difficulty" | "theme" | "language";
  old_value: string;
  new_value: string;
}

export const useAnalytics = () => {
  const trackGameStart = useCallback((data: GameStartEvent) => {
    if (!isAnalyticsEnabled()) return;

    logEvent(analytics!, "game_start", {
      game_mode: data.mode,
      difficulty: data.difficulty,
      theme: data.theme,
      language: data.language,
      timestamp: Date.now()
    });
  }, []);

  const trackGameEnd = useCallback((data: GameEndEvent) => {
    if (!isAnalyticsEnabled()) return;

    logEvent(analytics!, "game_end", {
      game_mode: data.mode,
      difficulty: data.difficulty,
      score: data.score,
      duration_seconds: data.duration,
      is_new_high_score: data.isNewHighScore,
      timestamp: Date.now()
    });
  }, []);

  const trackHighScore = useCallback(
    (score: number, mode: GameMode, difficulty: Difficulty) => {
      if (!isAnalyticsEnabled()) return;

      logEvent(analytics!, "high_score_achieved", {
        score,
        game_mode: mode,
        difficulty,
        timestamp: Date.now()
      });
    },
    []
  );

  const trackSettingsChange = useCallback((data: SettingsChangeEvent) => {
    if (!isAnalyticsEnabled()) return;

    logEvent(analytics!, "settings_changed", {
      setting_type: data.setting_type,
      old_value: data.old_value,
      new_value: data.new_value,
      timestamp: Date.now()
    });
  }, []);

  const trackPageView = useCallback((page: string) => {
    if (!isAnalyticsEnabled()) return;

    logEvent(analytics!, "page_view", {
      page_title: page,
      timestamp: Date.now()
    });
  }, []);

  const setUserPreferences = useCallback(
    (preferences: {
      preferred_language: Language;
      preferred_theme: string;
      preferred_mode: GameMode;
      preferred_difficulty: Difficulty;
    }) => {
      if (!isAnalyticsEnabled()) return;

      setUserProperties(analytics!, preferences);
    },
    []
  );

  const trackFoodEaten = useCallback((mode: GameMode, score: number) => {
    if (!isAnalyticsEnabled()) return;

    logEvent(analytics!, "food_eaten", {
      game_mode: mode,
      current_score: score,
      timestamp: Date.now()
    });
  }, []);

  const trackGamePaused = useCallback(
    (mode: GameMode, score: number, duration: number) => {
      if (!isAnalyticsEnabled()) return;

      logEvent(analytics!, "game_paused", {
        game_mode: mode,
        current_score: score,
        duration_seconds: duration,
        timestamp: Date.now()
      });
    },
    []
  );

  const trackGameResumed = useCallback((mode: GameMode, score: number) => {
    if (!isAnalyticsEnabled()) return;

    logEvent(analytics!, "game_resumed", {
      game_mode: mode,
      current_score: score,
      timestamp: Date.now()
    });
  }, []);

  return {
    trackGameStart,
    trackGameEnd,
    trackHighScore,
    trackSettingsChange,
    trackPageView,
    setUserPreferences,
    trackFoodEaten,
    trackGamePaused,
    trackGameResumed,
    isEnabled: isAnalyticsEnabled()
  };
};
