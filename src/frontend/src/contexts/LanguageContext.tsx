import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../backend';

type LanguageCode = 'tr' | 'en' | 'es' | 'fr' | 'de' | 'it' | 'ru' | 'pt' | 'zh' | 'ja';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  getBackendLanguage: () => Language;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

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
  ja: Language.japanese,
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    const stored = localStorage.getItem('learnfun-language');
    return (stored as LanguageCode) || 'tr';
  });

  useEffect(() => {
    localStorage.setItem('learnfun-language', language);
  }, [language]);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
  };

  const getBackendLanguage = () => {
    return languageMap[language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, getBackendLanguage }}>
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
