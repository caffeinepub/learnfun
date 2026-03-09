type AgeGroup = '3-5' | '6-8' | '9-12' | '13-15';
type GameType = 'shape-matching' | 'math-puzzle' | 'memory-card' | 'logic-puzzle' | 'visual-recognition' | 'problem-solving' | 'sorting-classification' | 'quick-reaction-tap';

const STORAGE_KEY = 'learnfun-daily-surprise';

interface DailySurpriseData {
  date: string;
  ageGroup: AgeGroup;
  gameId: GameType;
}

const allGames: GameType[] = [
  'shape-matching',
  'math-puzzle',
  'memory-card',
  'logic-puzzle',
  'visual-recognition',
  'problem-solving',
  'sorting-classification',
  'quick-reaction-tap'
];

function getTodayString(): string {
  const today = new Date();
  return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
}

function selectRandomGame(ageGroup: AgeGroup, date: string): GameType {
  const seed = `${ageGroup}-${date}`.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const index = seed % allGames.length;
  return allGames[index];
}

export function getDailySurpriseGame(ageGroup: AgeGroup): GameType {
  const today = getTodayString();
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data: DailySurpriseData = JSON.parse(stored);
      if (data.date === today && data.ageGroup === ageGroup) {
        return data.gameId;
      }
    }
  } catch (e) {
    console.error('Error reading daily surprise from localStorage:', e);
  }

  const selectedGame = selectRandomGame(ageGroup, today);
  
  try {
    const data: DailySurpriseData = {
      date: today,
      ageGroup,
      gameId: selectedGame
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving daily surprise to localStorage:', e);
  }

  return selectedGame;
}
