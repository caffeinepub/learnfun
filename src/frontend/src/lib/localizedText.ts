import type { LocalizedText } from '../backend';
import type { LanguageCode } from './translations';

/**
 * Resolves a backend LocalizedText object to a string in the current UI language.
 * Falls back to English if the requested language is not available.
 */
export function resolveLocalizedText(localized: LocalizedText, language: LanguageCode): string {
  const langMap: Record<LanguageCode, keyof LocalizedText> = {
    tr: 'turkish',
    en: 'english',
    es: 'spanish',
    fr: 'french',
    de: 'german',
    it: 'italian',
    ru: 'russian',
    pt: 'portuguese',
    zh: 'chinese',
    ja: 'japanese',
  };
  
  const key = langMap[language];
  return localized[key] || localized.english || '';
}
