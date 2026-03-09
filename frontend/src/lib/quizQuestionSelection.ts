// Quiz question selection utilities with randomization and repeat-reduction

const QUIZ_SESSION_SIZE = 10; // Number of questions per quiz session

// Shuffle array using Fisher-Yates algorithm
export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Select a fixed-size subset from an array
export function selectSubset<T>(array: T[], count: number): T[] {
  if (array.length <= count) {
    return array;
  }
  return array.slice(0, count);
}

// Get localStorage key for quiz history
function getHistoryKey(ageGroup: string, language: string): string {
  return `quiz-history-${ageGroup}-${language}`;
}

// Get recently used question indices from localStorage
export function getQuizHistory(ageGroup: string, language: string): number[] {
  try {
    const key = getHistoryKey(ageGroup, language);
    const stored = localStorage.getItem(key);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

// Save recently used question indices to localStorage
export function saveQuizHistory(ageGroup: string, language: string, indices: number[]): void {
  try {
    const key = getHistoryKey(ageGroup, language);
    localStorage.setItem(key, JSON.stringify(indices));
  } catch {
    // Silently fail if localStorage is unavailable
  }
}

// Reset quiz history for a specific age group and language
export function resetQuizHistory(ageGroup: string, language: string): void {
  try {
    const key = getHistoryKey(ageGroup, language);
    localStorage.removeItem(key);
  } catch {
    // Silently fail if localStorage is unavailable
  }
}

// Select questions with repeat-reduction logic
export function selectQuestionsWithHistory<T>(
  questions: T[],
  ageGroup: string,
  language: string,
  sessionSize: number = QUIZ_SESSION_SIZE
): { selected: T[]; selectedIndices: number[] } {
  const poolSize = questions.length;
  
  // If pool is smaller than session size, just shuffle and return all
  if (poolSize <= sessionSize) {
    const shuffled = shuffleArray(questions);
    const indices = shuffled.map((_, i) => i);
    return { selected: shuffled, selectedIndices: indices };
  }

  // Get history of recently used indices
  const history = getQuizHistory(ageGroup, language);
  
  // Create array of all indices
  const allIndices = Array.from({ length: poolSize }, (_, i) => i);
  
  // Separate into unseen and seen indices
  const unseenIndices = allIndices.filter(i => !history.includes(i));
  const seenIndices = allIndices.filter(i => history.includes(i));
  
  // If we have enough unseen questions, use only those
  let selectedIndices: number[];
  if (unseenIndices.length >= sessionSize) {
    const shuffledUnseen = shuffleArray(unseenIndices);
    selectedIndices = selectSubset(shuffledUnseen, sessionSize);
  } else {
    // Use all unseen + some seen (shuffled)
    const shuffledSeen = shuffleArray(seenIndices);
    const neededFromSeen = sessionSize - unseenIndices.length;
    selectedIndices = [
      ...shuffleArray(unseenIndices),
      ...selectSubset(shuffledSeen, neededFromSeen)
    ];
  }
  
  // If we've now used most of the pool, reset history
  const newHistory = [...history, ...selectedIndices.filter(i => !history.includes(i))];
  if (newHistory.length >= poolSize * 0.8) {
    // Reset when 80% of pool has been used
    resetQuizHistory(ageGroup, language);
  }
  
  // Map indices to actual questions
  const selected = selectedIndices.map(i => questions[i]);
  
  return { selected, selectedIndices };
}

// Update history after a quiz session
export function updateQuizHistory(
  ageGroup: string,
  language: string,
  newIndices: number[]
): void {
  const history = getQuizHistory(ageGroup, language);
  const updated = [...history, ...newIndices.filter(i => !history.includes(i))];
  saveQuizHistory(ageGroup, language, updated);
}

// Get the configured session size
export function getSessionSize(): number {
  return QUIZ_SESSION_SIZE;
}
