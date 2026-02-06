import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { setBgMusicMuted, setSfxMuted } from '../services/audio';

const BG_MUSIC_MUTE_KEY = 'learnfun_bg_music_muted';
const SFX_MUTE_KEY = 'learnfun_sfx_muted';

interface AudioSettingsContextType {
  isBgMusicMuted: boolean;
  isSfxMuted: boolean;
  toggleBgMusic: () => void;
  toggleSfx: () => void;
}

const AudioSettingsContext = createContext<AudioSettingsContextType | undefined>(undefined);

export function AudioSettingsProvider({ children }: { children: ReactNode }) {
  const [isBgMusicMuted, setIsBgMusicMuted] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem(BG_MUSIC_MUTE_KEY);
      return stored === 'true';
    } catch {
      return false;
    }
  });

  const [isSfxMuted, setIsSfxMuted] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem(SFX_MUTE_KEY);
      return stored === 'true';
    } catch {
      return false;
    }
  });

  // Synchronize background music mute state with audio service
  useEffect(() => {
    setBgMusicMuted(isBgMusicMuted);
  }, [isBgMusicMuted]);

  // Synchronize SFX mute state with audio service
  useEffect(() => {
    setSfxMuted(isSfxMuted);
  }, [isSfxMuted]);

  const toggleBgMusic = () => {
    setIsBgMusicMuted(prev => {
      const newValue = !prev;
      try {
        localStorage.setItem(BG_MUSIC_MUTE_KEY, String(newValue));
      } catch (error) {
        console.warn('Failed to save background music mute setting:', error);
      }
      return newValue;
    });
  };

  const toggleSfx = () => {
    setIsSfxMuted(prev => {
      const newValue = !prev;
      try {
        localStorage.setItem(SFX_MUTE_KEY, String(newValue));
      } catch (error) {
        console.warn('Failed to save SFX mute setting:', error);
      }
      return newValue;
    });
  };

  return (
    <AudioSettingsContext.Provider value={{ isBgMusicMuted, isSfxMuted, toggleBgMusic, toggleSfx }}>
      {children}
    </AudioSettingsContext.Provider>
  );
}

export function useAudioSettings() {
  const context = useContext(AudioSettingsContext);
  if (!context) {
    throw new Error('useAudioSettings must be used within AudioSettingsProvider');
  }
  return context;
}
