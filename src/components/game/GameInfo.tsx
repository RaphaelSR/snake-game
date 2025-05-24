import { useGame } from "@/context/GameContext";

export function GameInfo(): JSX.Element {
  const { score, highScore } = useGame();

  return (
    <div className="flex justify-between items-center w-full max-w-lg mx-auto mb-4">
      <div className="text-center">
        <div className="text-sm text-gray-600">Score</div>
        <div className="text-2xl font-bold text-gray-900">{score}</div>
      </div>

      <div className="text-center">
        <div className="text-sm text-gray-600">High Score</div>
        <div className="text-2xl font-bold text-blue-600">{highScore}</div>
      </div>
    </div>
  );
}
