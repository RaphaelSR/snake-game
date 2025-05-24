import React from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { useGame } from "@/context/GameContext";
import { Button } from "@/components/ui";

export function GameControls(): JSX.Element {
  const { isPlaying, isGameOver, startGame, pauseGame, restartGame } =
    useGame();

  return (
    <div className="flex gap-3 justify-center flex-wrap">
      {!isPlaying && !isGameOver && (
        <Button onClick={startGame} size="lg">
          <Play className="w-5 h-5 mr-2" />
          Start
        </Button>
      )}

      {isPlaying && (
        <Button onClick={pauseGame} size="lg" variant="secondary">
          <Pause className="w-5 h-5 mr-2" />
          Pause
        </Button>
      )}

      <Button onClick={restartGame} size="lg" variant="secondary">
        <RotateCcw className="w-5 h-5 mr-2" />
        Restart
      </Button>
    </div>
  );
}
