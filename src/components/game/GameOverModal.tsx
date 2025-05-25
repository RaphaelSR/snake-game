import { useGame } from "@/context/GameContext";
import { useI18n } from "@/context/I18nContext";
import { Modal, Button } from "@/components/ui";

export function GameOverModal(): JSX.Element {
  const { isGameOver, score, highScore, restartGame } = useGame();
  const { t } = useI18n();

  const isNewHighScore = score === highScore && score > 0;

  return (
    <Modal isOpen={isGameOver} onClose={restartGame} title={t("game.gameOver")}>
      <div className="text-center space-y-4">
        <div
          className="text-3xl font-bold"
          style={{ color: "var(--color-text)" }}
        >
          {score}
        </div>

        {isNewHighScore && (
          <div
            className="font-semibold"
            style={{ color: "var(--color-accent)" }}
          >
            {t("game.newHighScore")}
          </div>
        )}

        <div style={{ color: "var(--color-text)" }}>
          {t("game.highScore")}:{" "}
          <span className="font-semibold">{highScore}</span>
        </div>

        <Button onClick={restartGame} size="lg" className="w-full">
          {t("game.playAgain")}
        </Button>
      </div>
    </Modal>
  );
}
