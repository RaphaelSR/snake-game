import React, { createContext, useContext, useEffect, useRef } from "react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useGameSettings } from "@/context/GameSettingsContext";
import { useThemeContext } from "@/context/ThemeContext";
import { useI18n } from "@/context/I18nContext";

interface AnalyticsContextType {
  trackGameStart: () => void;
  trackGameEnd: (
    score: number,
    duration: number,
    isNewHighScore: boolean
  ) => void;
  trackHighScore: (score: number) => void;
  trackFoodEaten: (score: number) => void;
  trackGamePaused: (score: number, duration: number) => void;
  trackGameResumed: (score: number) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(
  undefined
);

export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const analytics = useAnalytics();
  const { settings } = useGameSettings();
  const { currentTheme } = useThemeContext();
  const { language } = useI18n();

  const previousSettings = useRef(settings);
  const previousTheme = useRef(currentTheme);
  const previousLanguage = useRef(language);

  useEffect(() => {
    analytics.trackPageView("Snake Game");
  }, [analytics]);

  useEffect(() => {
    analytics.setUserPreferences({
      preferred_language: language,
      preferred_theme: currentTheme,
      preferred_mode: settings.mode,
      preferred_difficulty: settings.difficulty
    });
  }, [analytics, language, currentTheme, settings]);

  useEffect(() => {
    if (previousSettings.current.mode !== settings.mode) {
      analytics.trackSettingsChange({
        setting_type: "mode",
        old_value: previousSettings.current.mode,
        new_value: settings.mode
      });
    }
    if (previousSettings.current.difficulty !== settings.difficulty) {
      analytics.trackSettingsChange({
        setting_type: "difficulty",
        old_value: previousSettings.current.difficulty,
        new_value: settings.difficulty
      });
    }
    previousSettings.current = settings;
  }, [analytics, settings]);

  useEffect(() => {
    if (previousTheme.current !== currentTheme) {
      analytics.trackSettingsChange({
        setting_type: "theme",
        old_value: previousTheme.current,
        new_value: currentTheme
      });
      previousTheme.current = currentTheme;
    }
  }, [analytics, currentTheme]);

  useEffect(() => {
    if (previousLanguage.current !== language) {
      analytics.trackSettingsChange({
        setting_type: "language",
        old_value: previousLanguage.current,
        new_value: language
      });
      previousLanguage.current = language;
    }
  }, [analytics, language]);

  const trackGameStart = () => {
    analytics.trackGameStart({
      mode: settings.mode,
      difficulty: settings.difficulty,
      theme: currentTheme,
      language
    });
  };

  const trackGameEnd = (
    score: number,
    duration: number,
    isNewHighScore: boolean
  ) => {
    analytics.trackGameEnd({
      mode: settings.mode,
      difficulty: settings.difficulty,
      score,
      duration,
      isNewHighScore
    });
  };

  const trackHighScore = (score: number) => {
    analytics.trackHighScore(score, settings.mode, settings.difficulty);
  };

  const trackFoodEaten = (score: number) => {
    analytics.trackFoodEaten(settings.mode, score);
  };

  const trackGamePaused = (score: number, duration: number) => {
    analytics.trackGamePaused(settings.mode, score, duration);
  };

  const trackGameResumed = (score: number) => {
    analytics.trackGameResumed(settings.mode, score);
  };

  const value: AnalyticsContextType = {
    trackGameStart,
    trackGameEnd,
    trackHighScore,
    trackFoodEaten,
    trackGamePaused,
    trackGameResumed
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalyticsContext = (): AnalyticsContextType => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error(
      "useAnalyticsContext must be used within an AnalyticsProvider"
    );
  }
  return context;
};
