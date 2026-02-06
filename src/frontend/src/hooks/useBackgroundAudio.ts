import { useEffect, useRef, useState } from 'react';
import { startBackgroundAudio, stopBackgroundAudio, getCurrentBackgroundAudio } from '../services/audio';
import type { BackgroundSoundId } from '../lib/sounds';

/**
 * Hook to manage background audio playback with user-interaction gating.
 * 
 * Ensures background audio only starts after a user interaction to avoid
 * browser autoplay blocks, and prevents overlapping/restarting on re-renders.
 */
export function useBackgroundAudio(soundId: BackgroundSoundId | null) {
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const hasStartedRef = useRef(false);

  // Listen for first user interaction
  useEffect(() => {
    if (hasUserInteracted) return;

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
  }, [hasUserInteracted]);

  // Start background audio after user interaction
  useEffect(() => {
    if (!soundId || !hasUserInteracted) return;

    // Check if this exact track is already playing
    const currentTrack = getCurrentBackgroundAudio();
    if (currentTrack === soundId && hasStartedRef.current) {
      return; // Already playing, don't restart
    }

    try {
      startBackgroundAudio(soundId);
      hasStartedRef.current = true;
    } catch (error) {
      console.warn('Failed to start background audio:', error);
    }

    // Cleanup: stop background audio when component unmounts
    return () => {
      if (hasStartedRef.current) {
        stopBackgroundAudio();
        hasStartedRef.current = false;
      }
    };
  }, [soundId, hasUserInteracted]);

  return { hasUserInteracted };
}
