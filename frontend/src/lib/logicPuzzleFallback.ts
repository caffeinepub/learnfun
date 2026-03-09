import type { LanguageCode } from './translations';

export type PuzzleType = 'number' | 'pattern' | 'word' | 'spatial' | 'time';
export type AgeGroupKey = '3-5' | '6-8' | '9-12' | '13-15';

export interface FallbackPuzzle {
  question: string;
  answer: string;
  difficulty: number;
  type: PuzzleType;
}

export function getFallbackTimePuzzle(ageGroup: AgeGroupKey, language: LanguageCode): FallbackPuzzle {
  if (language === 'tr') {
    if (ageGroup === '3-5') {
      const puzzles = [
        { question: 'Sabah, ?', answer: 'Akşam', type: 'time' as const },
        { question: 'Gündüz, ?', answer: 'Gece', type: 'time' as const },
      ];
      const selected = puzzles[Math.floor(Math.random() * puzzles.length)];
      return { ...selected, difficulty: 1 };
    } else if (ageGroup === '6-8') {
      const puzzles = [
        { question: 'Sabah, Öğle, ?', answer: 'Akşam', type: 'time' as const },
        { question: 'Pazartesi, Salı, ?', answer: 'Çarşamba', type: 'time' as const },
        { question: 'İlkbahar, Yaz, ?', answer: 'Sonbahar', type: 'time' as const },
      ];
      const selected = puzzles[Math.floor(Math.random() * puzzles.length)];
      return { ...selected, difficulty: 1 };
    } else if (ageGroup === '9-12') {
      const puzzles = [
        { question: 'Ocak, Şubat, Mart, ?', answer: 'Nisan', type: 'time' as const },
        { question: '1 saat = ? dakika', answer: '60', type: 'time' as const },
        { question: '1 hafta = ? gün', answer: '7', type: 'time' as const },
        { question: 'Dün, Bugün, ?', answer: 'Yarın', type: 'time' as const },
      ];
      const selected = puzzles[Math.floor(Math.random() * puzzles.length)];
      return { ...selected, difficulty: 2 };
    } else {
      const puzzles = [
        { question: 'Ocak, Şubat, Mart, Nisan, ?', answer: 'Mayıs', type: 'time' as const },
        { question: '1 gün = ? saat', answer: '24', type: 'time' as const },
        { question: '1 yıl = ? ay', answer: '12', type: 'time' as const },
        { question: 'Dün, Bugün, Yarın, ?', answer: 'Öbürgün', type: 'time' as const },
      ];
      const selected = puzzles[Math.floor(Math.random() * puzzles.length)];
      return { ...selected, difficulty: 3 };
    }
  } else {
    // English
    if (ageGroup === '3-5') {
      const puzzles = [
        { question: 'Morning, ?', answer: 'Evening', type: 'time' as const },
        { question: 'Day, ?', answer: 'Night', type: 'time' as const },
      ];
      const selected = puzzles[Math.floor(Math.random() * puzzles.length)];
      return { ...selected, difficulty: 1 };
    } else if (ageGroup === '6-8') {
      const puzzles = [
        { question: 'Morning, Noon, ?', answer: 'Evening', type: 'time' as const },
        { question: 'Monday, Tuesday, ?', answer: 'Wednesday', type: 'time' as const },
        { question: 'Spring, Summer, ?', answer: 'Autumn', type: 'time' as const },
      ];
      const selected = puzzles[Math.floor(Math.random() * puzzles.length)];
      return { ...selected, difficulty: 1 };
    } else if (ageGroup === '9-12') {
      const puzzles = [
        { question: 'January, February, March, ?', answer: 'April', type: 'time' as const },
        { question: '1 hour = ? minutes', answer: '60', type: 'time' as const },
        { question: '1 week = ? days', answer: '7', type: 'time' as const },
        { question: 'Yesterday, Today, ?', answer: 'Tomorrow', type: 'time' as const },
      ];
      const selected = puzzles[Math.floor(Math.random() * puzzles.length)];
      return { ...selected, difficulty: 2 };
    } else {
      const puzzles = [
        { question: 'January, February, March, April, ?', answer: 'May', type: 'time' as const },
        { question: '1 day = ? hours', answer: '24', type: 'time' as const },
        { question: '1 year = ? months', answer: '12', type: 'time' as const },
        { question: 'Yesterday, Today, Tomorrow, ?', answer: 'Day after tomorrow', type: 'time' as const },
      ];
      const selected = puzzles[Math.floor(Math.random() * puzzles.length)];
      return { ...selected, difficulty: 3 };
    }
  }
}
