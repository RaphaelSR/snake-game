import type { Language } from "@/constants";
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from "@/constants";

export function detectUserLanguage(): Language {
  const browserLang = navigator.language;

  const supportedLang = SUPPORTED_LANGUAGES.find((lang) =>
    browserLang.startsWith(lang.split("-")[0])
  );

  if (supportedLang) {
    return supportedLang;
  }

  return DEFAULT_LANGUAGE;
}

export function getNestedValue(obj: any, path: string): string {
  return path.split(".").reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : path;
  }, obj);
}
