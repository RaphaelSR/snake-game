import { useGame } from "@/context/GameContext";
import { useGameSettings } from "@/context/GameSettingsContext";
import { useI18n } from "@/context/I18nContext";

export function GameInfo(): JSX.Element {
  const { score, highScore, timeLeft } = useGame();
  const { settings } = useGameSettings();
  const { t } = useI18n();

  return (
    <div className="w-full max-w-lg mx-auto mb-4">
      <div className="flex justify-between items-center mb-2">
        <div className="text-center">
          <div className="text-sm" style={{ color: "var(--color-text)" }}>
            {t("game.score")}
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
              {t("game.time")}
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
            {t("game.highScore")}
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
        {t(`modes.${settings.mode}.name`)} •{" "}
        {t(`difficulty.${settings.difficulty}.name`)}
      </div>
    </div>
  );
}
