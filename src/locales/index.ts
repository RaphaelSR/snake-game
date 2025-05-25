import { ptBR } from "./pt-BR";
import { enUS } from "./en-US";
import { esAR } from "./es-AR";
import type { Language } from "@/constants";
import type { Translations } from "@/types/i18n";

export const translations: Record<Language, Translations> = {
  "pt-BR": ptBR,
  "en-US": enUS,
  "es-AR": esAR
};

export * from "./pt-BR";
export * from "./en-US";
export * from "./es-AR";
