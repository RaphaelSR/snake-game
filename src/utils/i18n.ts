import type { Language } from "@/constants";
import { SUPPORTED_LANGUAGES } from "@/constants";

export function detectUserLanguage(): Language {
  const browserLang = navigator.language.toLowerCase();

  for (const lang of SUPPORTED_LANGUAGES) {
    if (browserLang.startsWith(lang.toLowerCase())) {
      return lang;
    }
  }

  return "en-US";
}

export function getNestedValue(
  obj: any,
  path: string,
  params?: Record<string, any>
): string {
  const value = path.split(".").reduce((current, key) => current?.[key], obj);

  if (typeof value !== "string") {
    return path;
  }

  if (!params) {
    return value;
  }

  return Object.entries(params).reduce((result, [key, val]) => {
    return result.replace(new RegExp(`{${key}}`, "g"), String(val));
  }, value);
}
