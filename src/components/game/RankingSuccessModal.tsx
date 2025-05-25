import { Trophy, Star, Award, TrendingUp } from "lucide-react";
import { Modal, Button } from "@/components/ui";
import { useI18n } from "@/context/I18nContext";
import type { PlayerRankingResult } from "@/types/rankings";

interface RankingSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: PlayerRankingResult | null;
}

export function RankingSuccessModal({
  isOpen,
  onClose,
  result
}: RankingSuccessModalProps): JSX.Element {
  const { t } = useI18n();

  if (!result || !result.isNewRanking) return <></>;

  const getRankIcon = () => {
    if (!result.rank || isNaN(result.rank))
      return (
        <Trophy className="w-8 h-8" style={{ color: "var(--color-accent)" }} />
      );

    if (result.rank === 1) {
      return <Trophy className="w-8 h-8" style={{ color: "#FFD700" }} />;
    } else if (result.rank <= 3) {
      return <Award className="w-8 h-8" style={{ color: "#C0C0C0" }} />;
    } else {
      return (
        <Star className="w-8 h-8" style={{ color: "var(--color-accent)" }} />
      );
    }
  };

  const getRankMessage = () => {
    if (!result.rank || isNaN(result.rank))
      return t("rankings.success.general");

    if (result.rank === 1) {
      return t("rankings.success.firstPlace");
    } else if (result.rank <= 3) {
      return t("rankings.success.topThree", { rank: result.rank });
    } else {
      return t("rankings.success.topTen", { rank: result.rank });
    }
  };

  const getImprovedMessage = () => {
    if (
      result.previousRank &&
      result.rank &&
      !isNaN(result.previousRank) &&
      !isNaN(result.rank) &&
      result.rank < result.previousRank
    ) {
      return t("rankings.success.improved", {
        oldRank: result.previousRank,
        newRank: result.rank
      });
    }
    return null;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t("rankings.success.title")}
    >
      <div className="text-center space-y-4">
        <div className="flex flex-col items-center">
          {getRankIcon()}
          <div className="mt-2">
            <div
              className="text-3xl font-bold"
              style={{ color: "var(--color-text)" }}
            >
              {result.score && !isNaN(result.score) ? result.score : 0}
            </div>
            <div
              className="text-sm"
              style={{ color: "var(--color-text)", opacity: 0.8 }}
            >
              {t(`modes.${result.mode}.name`)} •{" "}
              {t(`difficulty.${result.difficulty}.name`)}
            </div>
          </div>
        </div>

        <div>
          <p className="font-semibold" style={{ color: "var(--color-accent)" }}>
            {getRankMessage()}
          </p>
          {getImprovedMessage() && (
            <div className="flex items-center justify-center mt-2">
              <TrendingUp
                className="w-4 h-4 mr-1"
                style={{ color: "#10b981" }}
              />
              <p className="text-sm" style={{ color: "#10b981" }}>
                {getImprovedMessage()}
              </p>
            </div>
          )}
        </div>

        <Button onClick={onClose} size="lg" className="w-full">
          {t("common.continue")}
        </Button>
      </div>
    </Modal>
  );
}
