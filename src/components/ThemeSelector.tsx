import React, { useEffect } from "react";
import { useTheme } from "@/hooks/useTheme";
import "./ThemeSelector.css";

export const ThemeSelector: React.FC = () => {
  const { currentTheme, changeTheme, availableThemes, themes } = useTheme();

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

    body.classList.add("theme-transition");
    requestAnimationFrame(() => {
      body.classList.remove("theme-transition");
    });
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
