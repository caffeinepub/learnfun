import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Language } from '../backend';
import type { LanguageCode } from '../lib/translations';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  getBackendLanguage: () => Language;
  backendLanguage: Language;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const SUPPORTED_LANGUAGES: LanguageCode[] = ['tr', 'en', 'es', 'fr', 'de', 'it', 'ru', 'pt', 'zh'];
const DEFAULT_LANGUAGE: LanguageCode = 'tr';

const languageMap: Record<LanguageCode, Language> = {
  tr: Language.turkish,
  en: Language.english,
  es: Language.spanish,
  fr: Language.french,
  de: Language.german,
  it: Language.italian,
  ru: Language.russian,
  pt: Language.portuguese,
  zh: Language.chinese,
};

function isValidLanguage(lang: string): lang is LanguageCode {
  return SUPPORTED_LANGUAGES.includes(lang as LanguageCode);
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    const stored = localStorage.getItem('learnfun-language');
    if (stored && isValidLanguage(stored)) {
      return stored;
    }
    // If stored language is invalid or not supported, fall back to default
    if (stored && !isValidLanguage(stored)) {
      localStorage.setItem('learnfun-language', DEFAULT_LANGUAGE);
    }
    return DEFAULT_LANGUAGE;
  });

  // Memoize backend language to ensure stable reference for React Query keys
  const backendLanguage = useMemo(() => languageMap[language], [language]);

  useEffect(() => {
    localStorage.setItem('learnfun-language', language);
  }, [language]);

  const setLanguage = (lang: LanguageCode) => {
    if (isValidLanguage(lang)) {
      setLanguageState(lang);
    } else {
      // If an unsupported language is attempted, fall back to default
      setLanguageState(DEFAULT_LANGUAGE);
      localStorage.setItem('learnfun-language', DEFAULT_LANGUAGE);
    }
  };

  const getBackendLanguage = () => {
    return backendLanguage;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, getBackendLanguage, backendLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
