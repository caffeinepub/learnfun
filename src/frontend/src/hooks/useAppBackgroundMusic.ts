import { useEffect, useRef, useState } from 'react';
import { startBackgroundAudio, stopBackgroundAudio, getCurrentBackgroundAudio } from '../services/audio';
import type { BackgroundSoundId } from '../lib/sounds';

/**
 * Hook to manage persistent background audio playback across navigation.
 * 
 * Implements environment-aware gating:
 * - Android WebView with background audio bridge: starts immediately on mount
 * - Browser: waits for first user interaction to avoid autoplay blocks
 * 
 * Prevents overlapping/restarting when the same track is already playing.
 */
export function useAppBackgroundMusic(soundId: BackgroundSoundId | null) {
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const hasStartedRef = useRef(false);
  const previousSoundIdRef = useRef<BackgroundSoundId | null>(null);

  // Check if Android bridge with background audio support exists
  const hasAndroidBridge = typeof window !== 'undefined' && 
    window.Android && 
    typeof window.Android.startBackgroundAudio === 'function';

  // Listen for first user interaction (only needed for browser)
  useEffect(() => {
    if (hasAndroidBridge || hasUserInteracted) return;

    const handleInteraction = () => {
      setHasUserInteracted(true);
    };

    // Listen for any user interaction
    window.addEventListener('click', handleInteraction, { once: true });
    window.addEventListener('touchstart', handleInteraction, { once: true });
    window.addEventListener('keydown', handleInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, [hasAndroidBridge, hasUserInteracted]);

  // Start/switch background audio
  useEffect(() => {
    if (!soundId) return;

    // Determine if we can start playback
    const canStart = hasAndroidBridge || hasUserInteracted;
    if (!canStart) return;

    // Check if this exact track is already playing
    const currentTrack = getCurrentBackgroundAudio();
    if (currentTrack === soundId && previousSoundIdRef.current === soundId) {
      return; // Already playing, don't restart
    }

    try {
      // Stop previous track if different
      if (previousSoundIdRef.current && previousSoundIdRef.current !== soundId) {
        stopBackgroundAudio();
      }

      startBackgroundAudio(soundId);
      hasStartedRef.current = true;
      previousSoundIdRef.current = soundId;
    } catch (error) {
      console.warn('Failed to start background audio:', error);
    }

    // Cleanup: stop background audio when component unmounts
    return () => {
      if (hasStartedRef.current) {
        stopBackgroundAudio();
        hasStartedRef.current = false;
        previousSoundIdRef.current = null;
      }
    };
  }, [soundId, hasUserInteracted, hasAndroidBridge]);

  return { hasUserInteracted: hasAndroidBridge || hasUserInteracted };
}
