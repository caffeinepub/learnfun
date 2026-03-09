// Selection utilities for Sorting/Classification game with repetition avoidance

import {
  ITEM_POOLS_BY_AGE,
  CATEGORIES_BY_AGE,
  SESSION_ITEM_COUNT,
  type SortingItem,
  type AgeGroupKey,
} from './sortingClassificationItemPools';

// Re-export AgeGroupKey for use in components
export type { AgeGroupKey };

const STORAGE_KEY_PREFIX = 'sorting-classification-history-';

// Shuffle array using Fisher-Yates algorithm
function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Get recently used item IDs from localStorage
function getRecentlyUsedIds(ageGroup: AgeGroupKey): string[] {
  try {
    const stored = localStorage.getItem(`${STORAGE_KEY_PREFIX}${ageGroup}`);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    // Silently fail if localStorage is unavailable
  }
  return [];
}

// Store recently used item IDs to localStorage
function storeRecentlyUsedIds(ageGroup: AgeGroupKey, ids: string[]): void {
  try {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}${ageGroup}`, JSON.stringify(ids));
  } catch (error) {
    // Silently fail if localStorage is unavailable
  }
}

// Validate that selected items have unique IDs and allowed categories
function validateSelection(items: SortingItem[], ageGroup: AgeGroupKey): boolean {
  const allowedCategories = CATEGORIES_BY_AGE[ageGroup];
  const ids = new Set<string>();
  
  for (const item of items) {
    // Check for duplicate IDs
    if (ids.has(item.id)) {
      return false;
    }
    ids.add(item.id);
    
    // Check if category is allowed for this age group
    if (!allowedCategories.includes(item.category)) {
      return false;
    }
  }
  
  return true;
}

// Select a randomized subset of items with repetition avoidance
export function selectSessionItems(ageGroup: AgeGroupKey): SortingItem[] {
  const pool = ITEM_POOLS_BY_AGE[ageGroup];
  const count = SESSION_ITEM_COUNT[ageGroup];
  const allowedCategories = CATEGORIES_BY_AGE[ageGroup];
  
  // Filter pool to only include items from allowed categories
  const filteredPool = pool.filter(item => allowedCategories.includes(item.category));
  
  if (filteredPool.length === 0) {
    return [];
  }
  
  // If pool is smaller than or equal to count, return all items shuffled
  if (filteredPool.length <= count) {
    return shuffleArray(filteredPool);
  }
  
  // Get recently used IDs for repetition avoidance
  const recentlyUsedIds = getRecentlyUsedIds(ageGroup);
  
  // Separate items into used and unused
  const unusedItems = filteredPool.filter(item => !recentlyUsedIds.includes(item.id));
  const usedItems = filteredPool.filter(item => recentlyUsedIds.includes(item.id));
  
  // Prefer unused items first
  let selectedItems: SortingItem[];
  
  if (unusedItems.length >= count) {
    // We have enough unused items, select from them
    const shuffled = shuffleArray(unusedItems);
    selectedItems = shuffled.slice(0, count);
  } else {
    // Not enough unused items, use all unused + some used
    const shuffledUsed = shuffleArray(usedItems);
    const needed = count - unusedItems.length;
    selectedItems = [...unusedItems, ...shuffledUsed.slice(0, needed)];
    selectedItems = shuffleArray(selectedItems);
  }
  
  // Validate selection
  if (!validateSelection(selectedItems, ageGroup)) {
    // Fallback to pure random selection if validation fails
    const shuffled = shuffleArray(filteredPool);
    selectedItems = shuffled.slice(0, count);
  }
  
  // Update recently used IDs
  const newRecentlyUsedIds = selectedItems.map(item => item.id);
  
  // Keep history manageable: store up to 2x the session count
  const maxHistorySize = count * 2;
  const updatedHistory = [...newRecentlyUsedIds, ...recentlyUsedIds].slice(0, maxHistorySize);
  storeRecentlyUsedIds(ageGroup, updatedHistory);
  
  return selectedItems;
}

// Get categories for an age group
export function getCategoriesForAge(ageGroup: AgeGroupKey): string[] {
  return CATEGORIES_BY_AGE[ageGroup];
}
