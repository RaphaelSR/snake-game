import { useGame } from "@/context/GameContext";
import { Modal, Button } from "@/components/ui";

export function GameOverModal(): JSX.Element {
  const { isGameOver, score, highScore, restartGame } = useGame();

  const isNewHighScore = score === highScore && score > 0;

  return (
    <Modal isOpen={isGameOver} onClose={restartGame} title="Game Over">
      <div className="text-center space-y-4">
        <div className="text-3xl font-bold text-gray-900">{score}</div>

        {isNewHighScore && (
          <div className="text-green-600 font-semibold">New High Score! 🎉</div>
        )}

        <div className="text-gray-600">
          High Score: <span className="font-semibold">{highScore}</span>
        </div>

        <Button onClick={restartGame} size="lg" className="w-full">
          Play Again
        </Button>
      </div>
    </Modal>
  );
}
