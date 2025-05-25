import React, { useEffect } from "react";
import { useTheme } from "@/hooks/useTheme";
import "./ThemeSelector.css";

export const ThemeSelector: React.FC = () => {
  const { currentTheme, changeTheme, availableThemes, themes } = useTheme();

  useEffect(() => {
    const theme = themes[currentTheme];
    const root = document.documentElement;

    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    const bodyClasses = [`theme-${currentTheme}`];

    if (theme.effects.glow) {
      bodyClasses.push("theme-glow");
    }
    if (theme.effects.pixelated) {
      bodyClasses.push("theme-pixelated");
    }

    document.body.className = bodyClasses.join(" ");
  }, [currentTheme, themes]);

  return (
    <div className="theme-selector">
      <div className="theme-options">
        {availableThemes.map((themeName) => (
          <button
            key={themeName}
            className={`theme-option ${
              currentTheme === themeName ? "active" : ""
            }`}
            onClick={() => changeTheme(themeName)}
            style={{
              backgroundColor: themes[themeName].colors.background,
              border: `2px solid ${themes[themeName].colors.accent}`,
              color: themes[themeName].colors.text
            }}
          >
            <div className="theme-preview">
              <div
                className="preview-snake"
                style={{ backgroundColor: themes[themeName].colors.snake }}
              />
              <div
                className="preview-food"
                style={{ backgroundColor: themes[themeName].colors.food }}
              />
            </div>
            <span>{themes[themeName].name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
