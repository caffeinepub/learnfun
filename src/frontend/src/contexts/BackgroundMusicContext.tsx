import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { BackgroundSoundId } from '../lib/sounds';
import { isValidBackgroundSoundId } from '../lib/sounds';

const STORAGE_KEY = 'learnfun_background_music';
const DEFAULT_TRACK: BackgroundSoundId = 'bg_playful_melody';

interface BackgroundMusicContextType {
  selectedTrack: BackgroundSoundId;
  setSelectedTrack: (track: BackgroundSoundId) => void;
}

const BackgroundMusicContext = createContext<BackgroundMusicContextType | undefined>(undefined);

export function BackgroundMusicProvider({ children }: { children: ReactNode }) {
  const [selectedTrack, setSelectedTrackState] = useState<BackgroundSoundId>(() => {
    // Load from localStorage on initialization
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && isValidBackgroundSoundId(stored)) {
        return stored;
      }
    } catch (error) {
      console.warn('Failed to load background music selection:', error);
    }
    return DEFAULT_TRACK;
  });

  const setSelectedTrack = (track: BackgroundSoundId) => {
    setSelectedTrackState(track);
    // Persist to localStorage
    try {
      localStorage.setItem(STORAGE_KEY, track);
    } catch (error) {
      console.warn('Failed to save background music selection:', error);
    }
  };

  return (
    <BackgroundMusicContext.Provider value={{ selectedTrack, setSelectedTrack }}>
      {children}
    </BackgroundMusicContext.Provider>
  );
}

export function useBackgroundMusic() {
  const context = useContext(BackgroundMusicContext);
  if (!context) {
    throw new Error('useBackgroundMusic must be used within BackgroundMusicProvider');
  }
  return context;
}
