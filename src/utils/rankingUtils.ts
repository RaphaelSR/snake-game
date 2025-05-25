import type { Language } from "@/constants";

const DEFAULT_PLAYER_NAMES: Record<Language, string> = {
  "pt-BR": "Anônimo",
  "en-US": "Anonymous",
  "es-AR": "Anónimo"
} as const;

export function getDefaultPlayerName(language: Language): string {
  return DEFAULT_PLAYER_NAMES[language] || DEFAULT_PLAYER_NAMES["en-US"];
}

export function validatePlayerName(
  name: string,
  minLength: number,
  maxLength: number
): boolean {
  const trimmedName = name.trim();
  return trimmedName.length >= minLength && trimmedName.length <= maxLength;
}

export function sanitizePlayerName(name: string): string {
  return name
    .trim()
    .replace(/[<>\"'&]/g, "")
    .replace(/\s+/g, " ")
    .substring(0, 20);
}

export function isValidPlayerName(name: string): boolean {
  const sanitized = sanitizePlayerName(name);
  return (
    sanitized.length >= 2 &&
    sanitized.length <= 20 &&
    /^[a-zA-Z0-9\s\-_\.]+$/.test(sanitized)
  );
}

export function isValidRankingEntry(entry: any): boolean {
  return (
    entry &&
    typeof entry.score === "number" &&
    !isNaN(entry.score) &&
    typeof entry.playerName === "string" &&
    entry.playerName.trim().length > 0 &&
    typeof entry.mode === "string" &&
    typeof entry.difficulty === "string"
  );
}

export function isValidScore(score: number): boolean {
  return (
    typeof score === "number" &&
    !isNaN(score) &&
    isFinite(score) &&
    score >= 10 &&
    score <= 100000
  );
}

export function formatRank(rank: number | undefined): string {
  if (!rank || isNaN(rank) || rank < 1) {
    return "?";
  }
  return rank.toString();
}

export function getRankingSuffix(rank: number, language: string): string {
  if (!rank || isNaN(rank)) return "";

  switch (language) {
    case "pt-BR":
      return `${rank}º`;
    case "es-AR":
      return `${rank}º`;
    case "en-US":
    default:
      if (rank === 1) return "1st";
      if (rank === 2) return "2nd";
      if (rank === 3) return "3rd";
      return `${rank}th`;
  }
}
