import React, { createContext, useContext, useState, useCallback } from "react";
import { themes } from "@/types/themes";

interface ThemeContextType {
  currentTheme: string;
  changeTheme: (themeName: string) => void;
  availableThemes: string[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [currentTheme, setCurrentTheme] = useState<string>("classic");
  const availableThemes = Object.keys(themes);

  const changeTheme = useCallback((themeName: string) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
    }
  }, []);

  const value = {
    currentTheme,
    changeTheme,
    availableThemes
  };

  return (
    <ThemeContext.Provider value={value}>
      <div className="theme-wrapper">{children}</div>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};
