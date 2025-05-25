import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect
} from "react";
import type { Language } from "@/constants";
import type { I18nContextType } from "@/types/i18n";
import { SUPPORTED_LANGUAGES, STORAGE_KEYS } from "@/constants";
import { translations } from "@/locales";
import { detectUserLanguage, getNestedValue } from "@/utils/i18n";

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem(
      STORAGE_KEYS.LANGUAGE
    ) as Language;
    if (savedLanguage && SUPPORTED_LANGUAGES.includes(savedLanguage)) {
      return savedLanguage;
    }

    return detectUserLanguage();
  });

  const changeLanguage = useCallback((newLanguage: Language) => {
    if (SUPPORTED_LANGUAGES.includes(newLanguage)) {
      setLanguage(newLanguage);
      localStorage.setItem(STORAGE_KEYS.LANGUAGE, newLanguage);
    }
  }, []);

  const t = useCallback(
    (key: string, params?: Record<string, any>): string => {
      const translation = getNestedValue(translations[language], key, params);
      return translation || key;
    },
    [language]
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, language);
  }, [language]);

  const value: I18nContextType = {
    language,
    changeLanguage,
    t,
    availableLanguages: SUPPORTED_LANGUAGES
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
};
