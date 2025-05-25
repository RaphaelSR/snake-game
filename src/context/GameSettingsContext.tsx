import React, { createContext, useContext, useState, useCallback } from "react";
import type { GameSettings, GameMode, Difficulty } from "@/types";
import { saveGameSettings, getGameSettings } from "@/utils/storageManager";

interface GameSettingsContextType {
  settings: GameSettings;
  updateMode: (mode: GameMode) => void;
  updateDifficulty: (difficulty: Difficulty) => void;
  resetSettings: () => void;
}

const defaultSettings: GameSettings = {
  mode: "classic" as GameMode,
  difficulty: "regular" as Difficulty
};

const GameSettingsContext = createContext<GameSettingsContextType | undefined>(
  undefined
);

export const GameSettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [settings, setSettings] = useState<GameSettings>(() => {
    const saved = getGameSettings();
    if (
      saved &&
      typeof saved === "object" &&
      "mode" in saved &&
      "difficulty" in saved
    ) {
      return { ...defaultSettings, ...saved };
    }
    return defaultSettings;
  });

  const updateMode = useCallback(
    (mode: GameMode) => {
      const newSettings: GameSettings = { ...settings, mode };
      setSettings(newSettings);
      saveGameSettings(newSettings);
    },
    [settings]
  );

  const updateDifficulty = useCallback(
    (difficulty: Difficulty) => {
      const newSettings: GameSettings = { ...settings, difficulty };
      setSettings(newSettings);
      saveGameSettings(newSettings);
    },
    [settings]
  );

  const resetSettings = useCallback(() => {
    setSettings(defaultSettings);
    saveGameSettings(defaultSettings);
  }, []);

  const value: GameSettingsContextType = {
    settings,
    updateMode,
    updateDifficulty,
    resetSettings
  };

  return (
    <GameSettingsContext.Provider value={value}>
      {children}
    </GameSettingsContext.Provider>
  );
};

export const useGameSettings = (): GameSettingsContextType => {
  const context = useContext(GameSettingsContext);
  if (!context) {
    throw new Error(
      "useGameSettings must be used within a GameSettingsProvider"
    );
  }
  return context;
};
