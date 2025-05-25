import { useGame } from "@/context/GameContext";
import { useGameSettings } from "@/context/GameSettingsContext";
import { GAME_MODES, DIFFICULTY_LEVELS } from "@/types/gameSettings";

export function GameInfo(): JSX.Element {
  const { score, highScore, timeLeft } = useGame();
  const { settings } = useGameSettings();

  const currentMode = GAME_MODES[settings.mode];
  const currentDifficulty = DIFFICULTY_LEVELS[settings.difficulty];

  return (
    <div className="w-full max-w-lg mx-auto mb-4">
      <div className="flex justify-between items-center mb-2">
        <div className="text-center">
          <div className="text-sm" style={{ color: "var(--color-text)" }}>
            Score
          </div>
          <div
            className="text-2xl font-bold"
            style={{ color: "var(--color-text)" }}
          >
            {score}
          </div>
        </div>

        {timeLeft !== undefined && (
          <div className="text-center">
            <div className="text-sm" style={{ color: "var(--color-text)" }}>
              Tempo
            </div>
            <div
              className="text-2xl font-bold"
              style={{ color: "var(--color-accent)" }}
            >
              {Math.max(0, timeLeft)}s
            </div>
          </div>
        )}

        <div className="text-center">
          <div className="text-sm" style={{ color: "var(--color-text)" }}>
            High Score
          </div>
          <div
            className="text-2xl font-bold"
            style={{ color: "var(--color-accent)" }}
          >
            {highScore}
          </div>
        </div>
      </div>

      <div
        className="text-center text-sm"
        style={{ color: "var(--color-text)" }}
      >
        {currentMode.name} • {currentDifficulty.name}
      </div>
    </div>
  );
}
