import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect
} from "react";
import { themes } from "@/types/themes";

interface ThemeContextType {
  currentTheme: string;
  changeTheme: (themeName: string) => void;
  availableThemes: string[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "snake_game_theme";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [currentTheme, setCurrentTheme] = useState<string>(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    return savedTheme && themes[savedTheme] ? savedTheme : "classic";
  });

  const availableThemes = Object.keys(themes);

  const changeTheme = useCallback((themeName: string) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
      localStorage.setItem(THEME_STORAGE_KEY, themeName);
    }
  }, []);

  useEffect(() => {
    const theme = themes[currentTheme];
    const root = document.documentElement;
    const body = document.body;

    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    body.className = body.className.replace(/theme-\w+/g, "").trim();

    const themeClasses = [`theme-${currentTheme}`];

    if (theme.effects.glow) {
      themeClasses.push("theme-glow");
    }
    if (theme.effects.pixelated) {
      themeClasses.push("theme-pixelated");
    }

    body.classList.add(...themeClasses);
  }, [currentTheme]);

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
