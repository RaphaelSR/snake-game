import { Play, Pause, RotateCcw } from "lucide-react";
import { useGame } from "@/context/GameContext";
import { useI18n } from "@/context/I18nContext";
import { Button } from "@/components/ui";

export function GameControls(): JSX.Element {
  const { isPlaying, isGameOver, startGame, pauseGame, restartGame } =
    useGame();
  const { t } = useI18n();

  return (
    <div className="flex gap-3 justify-center flex-wrap">
      {!isPlaying && !isGameOver && (
        <Button onClick={startGame} size="lg">
          <Play className="w-5 h-5 mr-2" />
          {t("game.start")}
        </Button>
      )}

      {isPlaying && (
        <Button onClick={pauseGame} size="lg" variant="secondary">
          <Pause className="w-5 h-5 mr-2" />
          {t("game.pause")}
        </Button>
      )}

      <Button onClick={restartGame} size="lg" variant="secondary">
        <RotateCcw className="w-5 h-5 mr-2" />
        {t("game.restart")}
      </Button>
    </div>
  );
}
