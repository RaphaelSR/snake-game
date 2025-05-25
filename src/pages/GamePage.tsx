import { useGame } from "@/context/GameContext";
import { useKeyboard } from "@/hooks/useKeyboard";
import {
  GameBoard,
  GameControls,
  GameInfo,
  MobileControls,
  GameOverModal
} from "@/components/game";

export function GamePage(): JSX.Element {
  const { changeDirection, pauseGame, restartGame, isPlaying } = useGame();

  useKeyboard({
    onDirectionChange: changeDirection,
    onPause: pauseGame,
    onRestart: restartGame,
    isPlaying
  });

  return (
    <div
      className="min-h-screen py-8 px-4"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1
            className="text-4xl font-bold mb-2"
            style={{ color: "var(--color-text)" }}
          >
            Snake Game
          </h1>
          <p className="hidden sm:block" style={{ color: "var(--color-text)" }}>
            Use arrow keys or WASD to move • Space to pause • R to restart
          </p>
        </header>

        <GameInfo />
        <GameBoard />

        <div className="mt-6 space-y-4">
          <GameControls />
          <MobileControls />
        </div>

        <GameOverModal />
      </div>
    </div>
  );
}
