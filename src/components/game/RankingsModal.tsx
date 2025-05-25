import { useState, useEffect } from "react";
import { Trophy, Medal, Award, Clock, User } from "lucide-react";
import { Modal } from "@/components/ui";
import { useI18n } from "@/context/I18nContext";
import { useGameSettings } from "@/context/GameSettingsContext";
import { rankingService } from "@/services/rankingService";
import { formatRank, isValidRankingEntry } from "@/utils/rankingUtils";
import type { RankingEntry, RankingsData } from "@/types/rankings";
import type { GameMode, Difficulty } from "@/types";

interface RankingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RankingsModal({
  isOpen,
  onClose
}: RankingsModalProps): JSX.Element {
  const { t } = useI18n();
  const { settings } = useGameSettings();
  const [rankings, setRankings] = useState<RankingsData>({});
  const [loading, setLoading] = useState(false);
  const [selectedMode, setSelectedMode] = useState<GameMode>(settings.mode);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(
    settings.difficulty
  );

  useEffect(() => {
    if (isOpen) {
      loadCurrentRankings();
    }
  }, [isOpen]);

  const loadCurrentRankings = async () => {
    setLoading(true);

    try {
      const currentRankings = await rankingService.getRankings(
        selectedMode,
        selectedDifficulty
      );

      setRankings((prev) => ({
        ...prev,
        [selectedMode]: {
          ...prev[selectedMode],
          [selectedDifficulty]: currentRankings
        }
      }));
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const loadRankingsForSelection = async (
    mode: GameMode,
    difficulty: Difficulty
  ) => {
    if (rankings[mode]?.[difficulty]) {
      return;
    }

    setLoading(true);

    try {
      const newRankings = await rankingService.getRankings(mode, difficulty);

      setRankings((prev) => ({
        ...prev,
        [mode]: {
          ...prev[mode],
          [difficulty]: newRankings
        }
      }));
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadRankingsForSelection(selectedMode, selectedDifficulty);
    }
  }, [selectedMode, selectedDifficulty, isOpen]);

  const getCurrentRankings = (): RankingEntry[] => {
    return rankings[selectedMode]?.[selectedDifficulty] || [];
  };

  const loadAllRankings = async () => {
    setLoading(true);

    try {
      const data = await rankingService.getAllRankings();
      setRankings(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    const validRank = parseInt(formatRank(rank));

    if (isNaN(validRank) || validRank < 1) {
      return (
        <span
          className="w-5 h-5 flex items-center justify-center text-sm font-bold"
          style={{ color: "var(--color-text)", opacity: 0.5 }}
        >
          ?
        </span>
      );
    }

    switch (validRank) {
      case 1:
        return <Trophy className="w-5 h-5" style={{ color: "#FFD700" }} />;
      case 2:
        return <Medal className="w-5 h-5" style={{ color: "#C0C0C0" }} />;
      case 3:
        return <Award className="w-5 h-5" style={{ color: "#CD7F32" }} />;
      default:
        return (
          <span
            className="w-5 h-5 flex items-center justify-center text-sm font-bold"
            style={{ color: "var(--color-text)" }}
          >
            {validRank}
          </span>
        );
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  const modes: GameMode[] = [
    "classic",
    "infinite",
    "moving_food",
    "time_attack"
  ];
  const difficulties: Difficulty[] = ["easy", "regular", "hard"];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t("rankings.title")}>
      <div className="space-y-4">
        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "var(--color-text)" }}
          >
            {t("settings.gameMode")}
          </label>
          <div className="grid grid-cols-2 gap-2">
            {modes.map((mode) => (
              <button
                key={mode}
                onClick={() => setSelectedMode(mode)}
                className="p-2 rounded-lg text-sm transition-all"
                style={{
                  backgroundColor:
                    selectedMode === mode
                      ? "var(--color-accent)"
                      : "var(--color-background)",
                  color:
                    selectedMode === mode
                      ? "var(--color-background)"
                      : "var(--color-text)",
                  border: `1px solid var(--color-accent)`
                }}
              >
                {t(`modes.${mode}.name`)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "var(--color-text)" }}
          >
            {t("settings.difficulty")}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {difficulties.map((difficulty) => (
              <button
                key={difficulty}
                onClick={() => setSelectedDifficulty(difficulty)}
                className="p-2 rounded-lg text-sm transition-all"
                style={{
                  backgroundColor:
                    selectedDifficulty === difficulty
                      ? "var(--color-accent)"
                      : "var(--color-background)",
                  color:
                    selectedDifficulty === difficulty
                      ? "var(--color-background)"
                      : "var(--color-text)",
                  border: `1px solid var(--color-accent)`
                }}
              >
                {t(`difficulty.${difficulty}.name`)}
              </button>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={loadAllRankings}
            className="text-xs px-3 py-1 rounded transition-all"
            style={{
              backgroundColor: "var(--color-grid)",
              color: "var(--color-text)",
              border: "none"
            }}
            disabled={loading}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = "var(--color-accent)";
                e.currentTarget.style.color = "var(--color-background)";
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = "var(--color-grid)";
                e.currentTarget.style.color = "var(--color-text)";
              }
            }}
          >
            {loading ? t("common.loading") : t("rankings.loadAll")}
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto">
          {loading ? (
            <div
              className="text-center py-8"
              style={{ color: "var(--color-text)" }}
            >
              {t("common.loading")}
            </div>
          ) : getCurrentRankings().length === 0 ? (
            <div
              className="text-center py-8"
              style={{ color: "var(--color-text)" }}
            >
              {t("rankings.empty")}
            </div>
          ) : (
            <div className="space-y-2">
              {getCurrentRankings()
                .filter(isValidRankingEntry)
                .map((entry, index) => {
                  const displayRank = entry.rank || index + 1;
                  const displayScore = entry.score || 0;

                  return (
                    <div
                      key={entry.id || `entry-${index}`}
                      className="flex items-center justify-between p-3 rounded-lg transition-all hover:opacity-80"
                      style={{
                        backgroundColor: "var(--color-background)",
                        border: `1px solid var(--color-grid)`
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-8">
                          {getRankIcon(displayRank)}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <User
                              className="w-4 h-4"
                              style={{ color: "var(--color-text)" }}
                            />
                            <span
                              className="font-semibold"
                              style={{ color: "var(--color-text)" }}
                            >
                              {entry.playerName || "Unknown"}
                            </span>
                          </div>
                          <div
                            className="flex items-center space-x-2 text-xs"
                            style={{ color: "var(--color-text)", opacity: 0.7 }}
                          >
                            <Clock className="w-3 h-3" />
                            <span>{formatDate(entry.timestamp)}</span>
                          </div>
                        </div>
                      </div>
                      <div
                        className="text-lg font-bold"
                        style={{ color: "var(--color-accent)" }}
                      >
                        {displayScore.toLocaleString()}
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
