import React, { useState, useEffect, useRef } from "react";
import { User, Trophy } from "lucide-react";
import { Modal, Button, Input } from "@/components/ui";
import { useI18n } from "@/context/I18nContext";
import { RANKING_CONSTANTS } from "@/constants/rankings";
import {
  validatePlayerName,
  sanitizePlayerName,
  getDefaultPlayerName
} from "@/utils/rankingUtils";

interface PlayerNameModalProps {
  isOpen: boolean;
  onSubmit: (playerName: string) => void;
  onSkip: () => void;
  score: number;
}

export function PlayerNameModal({
  isOpen,
  onSubmit,
  onSkip,
  score
}: PlayerNameModalProps): JSX.Element {
  const { t, language } = useI18n();
  const [playerName, setPlayerName] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      const savedName = localStorage.getItem(
        RANKING_CONSTANTS.STORAGE_KEYS.PLAYER_NAME
      );

      if (savedName && savedName.trim()) {
        setPlayerName(savedName);
      } else {
        setPlayerName("");
      }
      setError("");

      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    }
  }, [isOpen, language]);

  const handleSubmit = () => {
    const finalName = playerName.trim() || getDefaultPlayerName(language);
    const sanitizedName = sanitizePlayerName(finalName);

    if (
      !validatePlayerName(
        sanitizedName,
        RANKING_CONSTANTS.MIN_PLAYER_NAME_LENGTH,
        RANKING_CONSTANTS.MAX_PLAYER_NAME_LENGTH
      )
    ) {
      setError(t("rankings.invalidName"));
      return;
    }

    localStorage.setItem(
      RANKING_CONSTANTS.STORAGE_KEYS.PLAYER_NAME,
      sanitizedName
    );
    onSubmit(sanitizedName);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onSkip} title={t("rankings.enterName")}>
      <div className="space-y-4">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Trophy
              className="w-8 h-8 mr-2"
              style={{ color: "var(--color-accent)" }}
            />
            <span
              className="text-2xl font-bold"
              style={{ color: "var(--color-text)" }}
            >
              {score}
            </span>
          </div>
          <p style={{ color: "var(--color-text)" }}>
            {t("rankings.qualifiedForRanking")}
          </p>
        </div>

        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "var(--color-text)" }}
          >
            {t("rankings.playerName")}
          </label>
          <div className="relative">
            <User
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
              style={{
                color: "var(--color-text)",
                opacity: 0.5,
                pointerEvents: "none",
                zIndex: 1
              }}
            />
            <Input
              ref={inputRef}
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t("rankings.namePlaceholder")}
              maxLength={RANKING_CONSTANTS.MAX_PLAYER_NAME_LENGTH}
              error={!!error}
              style={{ paddingLeft: "2.5rem" }}
            />
          </div>
          {error && (
            <p className="text-sm mt-1" style={{ color: "#ef4444" }}>
              {error}
            </p>
          )}
          <p
            className="text-xs mt-1"
            style={{ color: "var(--color-text)", opacity: 0.7 }}
          >
            {playerName.length}/{RANKING_CONSTANTS.MAX_PLAYER_NAME_LENGTH}{" "}
            {t("rankings.characters")}
          </p>
        </div>

        <div className="flex gap-3">
          <Button onClick={onSkip} variant="secondary" className="flex-1">
            {t("rankings.skip")}
          </Button>
          <Button onClick={handleSubmit} className="flex-1">
            {t("rankings.submit")}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
