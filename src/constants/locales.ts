export type Language = "pt-BR" | "en-US" | "es-AR";

export const SUPPORTED_LANGUAGES: Language[] = ["pt-BR", "en-US", "es-AR"];

export const LANGUAGE_FLAGS = {
  "pt-BR": "🇧🇷",
  "en-US": "🇺🇸",
  "es-AR": "🇦🇷"
} as const;

export const LANGUAGE_NAMES = {
  "pt-BR": "Português",
  "en-US": "English",
  "es-AR": "Español"
} as const;

export const DEFAULT_LANGUAGE: Language = "pt-BR";
