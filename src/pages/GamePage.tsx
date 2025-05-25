import { useGame } from "@/context/GameContext";
import { useI18n } from "@/context/I18nContext";
import { useKeyboard } from "@/hooks/useKeyboard";
import {
  GameBoard,
  GameControls,
  GameInfo,
  MobileControls,
  GameOverModal,
  PlayerNameModal,
  RankingSuccessModal
} from "@/components/game";
import { Footer } from "@/components/Footer";

export function GamePage(): JSX.Element {
  const {
    changeDirection,
    pauseGame,
    restartGame,
    startGame,
    isPlaying,
    isGameOver,
    score,
    pendingRankingResult,
    showPlayerNameModal,
    showRankingSuccessModal,
    submitPlayerScore,
    skipRanking,
    closeRankingSuccess
  } = useGame();
  const { t } = useI18n();

  useKeyboard({
    onDirectionChange: changeDirection,
    onPause: pauseGame,
    onRestart: restartGame,
    onStart: startGame,
    isPlaying,
    isGameOver
  });

  return (
    <div
      className="min-h-screen py-8 px-4 flex flex-col"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="max-w-2xl mx-auto flex-grow">
        <header className="text-center mb-8">
          <h1
            className="text-4xl font-bold mb-2"
            style={{ color: "var(--color-text)" }}
          >
            {t("game.title")}
          </h1>
          <p className="hidden sm:block" style={{ color: "var(--color-text)" }}>
            {t("game.instructions")}
          </p>
        </header>

        <GameInfo />
        <GameBoard />

        <div className="mt-6 space-y-4">
          <GameControls />
          <MobileControls />
        </div>

        <GameOverModal />

        <PlayerNameModal
          isOpen={showPlayerNameModal}
          onSubmit={submitPlayerScore}
          onSkip={skipRanking}
          score={score}
        />

        <RankingSuccessModal
          isOpen={showRankingSuccessModal}
          onClose={closeRankingSuccess}
          result={pendingRankingResult}
        />
      </div>

      <Footer />
    </div>
  );
}
