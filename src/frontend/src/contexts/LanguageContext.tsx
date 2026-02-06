import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { Language } from '../backend';
import type { LanguageCode } from '../lib/translations';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  backendLanguage: Language;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const SUPPORTED_LANGUAGES: LanguageCode[] = ['tr', 'en', 'es', 'fr', 'de', 'it', 'ru', 'pt', 'zh', 'ja'];

function mapLanguageToBackend(lang: LanguageCode): Language {
  const mapping: Record<LanguageCode, Language> = {
    tr: Language.turkish,
    en: Language.english,
    es: Language.spanish,
    fr: Language.french,
    de: Language.german,
    it: Language.italian,
    ru: Language.russian,
    pt: Language.portuguese,
    zh: Language.chinese,
    ja: Language.japanese,
  };
  return mapping[lang] || Language.english;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    const stored = localStorage.getItem('language') as LanguageCode;
    if (stored && SUPPORTED_LANGUAGES.includes(stored)) {
      return stored;
    }
    return 'en';
  });

  const backendLanguage = useMemo(() => mapLanguageToBackend(language), [language]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguage = (lang: LanguageCode) => {
    if (SUPPORTED_LANGUAGES.includes(lang)) {
      setLanguageState(lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, backendLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
