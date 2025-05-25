import { useGame } from "@/context/GameContext";

export function GameInfo(): JSX.Element {
  const { score, highScore } = useGame();

  return (
    <div className="flex justify-between items-center w-full max-w-lg mx-auto mb-4">
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
  );
}
