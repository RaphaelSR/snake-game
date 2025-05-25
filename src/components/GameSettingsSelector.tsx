import React, { useState, useEffect } from "react";
import { Settings } from "lucide-react";
import { useGameSettings } from "@/context/GameSettingsContext";
import { useTheme } from "@/hooks/useTheme";
import {
  GAME_MODES,
  DIFFICULTY_LEVELS,
  type Difficulty
} from "@/types/gameSettings";
import { Modal } from "@/components/ui";
import "./GameSettingsSelector.css";

export const GameSettingsSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { settings, updateMode, updateDifficulty } = useGameSettings();
  const { currentTheme, changeTheme, availableThemes, themes } = useTheme();

  const difficultyOptions: Difficulty[] = ["easy", "regular", "hard"];
  const currentDifficultyIndex = difficultyOptions.indexOf(settings.difficulty);

  const handleDifficultyChange = (index: number) => {
    updateDifficulty(difficultyOptions[index]);
  };

  const getDifficultyDescription = (difficulty: Difficulty) => {
    const base = DIFFICULTY_LEVELS[difficulty].description;
    const mode = GAME_MODES[settings.mode];

    if (mode.features.movingFood) {
      const foodSpeed =
        difficulty === "easy"
          ? "lenta"
          : difficulty === "regular"
          ? "moderada"
          : "rápida";
      return `${base} • Comida móvel ${foodSpeed}`;
    }

    return base;
  };

  // Apply theme changes immediately when theme changes
  useEffect(() => {
    const theme = themes[currentTheme];
    const root = document.documentElement;
    const body = document.body;

    // Apply CSS variables
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    // Clear all theme classes first
    body.className = body.className.replace(/theme-\w+/g, "").trim();

    // Apply new theme classes
    const themeClasses = [`theme-${currentTheme}`];

    if (theme.effects.glow) {
      themeClasses.push("theme-glow");
    }
    if (theme.effects.pixelated) {
      themeClasses.push("theme-pixelated");
    }

    // Add classes to body
    body.classList.add(...themeClasses);

    // Force rerender
    body.classList.add("theme-transition");
    requestAnimationFrame(() => {
      body.classList.remove("theme-transition");
    });
  }, [currentTheme, themes]);

  const handleThemeChange = (themeName: string) => {
    changeTheme(themeName);
  };

  return (
    <>
      <button
        className="settings-button"
        onClick={() => setIsOpen(true)}
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          backgroundColor: "var(--color-background)",
          color: "var(--color-text)",
          border: `2px solid var(--color-accent)`,
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "all 0.3s ease",
          zIndex: 10
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "var(--color-accent)";
          e.currentTarget.style.color = "var(--color-background)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "var(--color-background)";
          e.currentTarget.style.color = "var(--color-text)";
        }}
      >
        <Settings className="w-6 h-6" />
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Configurações do Jogo"
      >
        <div className="settings-content">
          {/* Modo de Jogo */}
          <div className="settings-section">
            <h3 style={{ color: "var(--color-text)", marginBottom: "12px" }}>
              Modo de Jogo
            </h3>
            <div className="settings-grid">
              {Object.values(GAME_MODES).map((mode) => (
                <button
                  key={mode.id}
                  className={`setting-option ${
                    settings.mode === mode.id ? "active" : ""
                  }`}
                  onClick={() => updateMode(mode.id)}
                  style={{
                    backgroundColor:
                      settings.mode === mode.id
                        ? "var(--color-accent)"
                        : "var(--color-background)",
                    color:
                      settings.mode === mode.id
                        ? "var(--color-background)"
                        : "var(--color-text)",
                    border: `2px solid var(--color-accent)`
                  }}
                >
                  <div className="setting-name">{mode.name}</div>
                  <div className="setting-description">{mode.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Dificuldade - Slider */}
          <div className="settings-section">
            <h3 style={{ color: "var(--color-text)", marginBottom: "12px" }}>
              Dificuldade
            </h3>
            <div className="difficulty-slider-container">
              <div className="difficulty-labels">
                {difficultyOptions.map((difficulty, index) => (
                  <span
                    key={difficulty}
                    className={`difficulty-label ${
                      currentDifficultyIndex === index ? "active" : ""
                    }`}
                    style={{
                      color:
                        currentDifficultyIndex === index
                          ? "var(--color-accent)"
                          : "var(--color-text)"
                    }}
                  >
                    {DIFFICULTY_LEVELS[difficulty].name}
                  </span>
                ))}
              </div>

              <div className="slider-track">
                <input
                  type="range"
                  min="0"
                  max="2"
                  value={currentDifficultyIndex}
                  onChange={(e) =>
                    handleDifficultyChange(parseInt(e.target.value))
                  }
                  className="difficulty-slider"
                  style={{
                    background: `linear-gradient(to right, var(--color-accent) 0%, var(--color-accent) ${
                      (currentDifficultyIndex / 2) * 100
                    }%, var(--color-grid) ${
                      (currentDifficultyIndex / 2) * 100
                    }%, var(--color-grid) 100%)`
                  }}
                />
                <div className="slider-markers">
                  {difficultyOptions.map((_, index) => (
                    <div
                      key={index}
                      className={`slider-marker ${
                        currentDifficultyIndex === index ? "active" : ""
                      }`}
                      style={{
                        backgroundColor:
                          currentDifficultyIndex === index
                            ? "var(--color-accent)"
                            : "var(--color-grid)"
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="difficulty-description">
                <p
                  style={{
                    color: "var(--color-text)",
                    fontSize: "14px",
                    textAlign: "center"
                  }}
                >
                  {getDifficultyDescription(settings.difficulty)}
                </p>
              </div>
            </div>
          </div>

          {/* Temas */}
          <div className="settings-section">
            <h3 style={{ color: "var(--color-text)", marginBottom: "12px" }}>
              Tema Visual
            </h3>
            <div className="theme-grid">
              {availableThemes.map((themeName) => (
                <button
                  key={themeName}
                  className={`theme-option ${
                    currentTheme === themeName ? "active" : ""
                  }`}
                  onClick={() => handleThemeChange(themeName)}
                  style={{
                    backgroundColor:
                      currentTheme === themeName
                        ? themes[themeName].colors.accent
                        : themes[themeName].colors.background,
                    color:
                      currentTheme === themeName
                        ? themes[themeName].colors.background
                        : themes[themeName].colors.text,
                    border: `2px solid ${themes[themeName].colors.accent}`
                  }}
                >
                  <div className="theme-preview">
                    <div
                      className="preview-snake"
                      style={{
                        backgroundColor: themes[themeName].colors.snake
                      }}
                    />
                    <div
                      className="preview-food"
                      style={{ backgroundColor: themes[themeName].colors.food }}
                    />
                  </div>
                  <span className="theme-name">{themes[themeName].name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
