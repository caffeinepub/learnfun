import { useEffect, useRef, useState } from 'react';
import { startBackgroundAudio, stopBackgroundAudio, getCurrentBackgroundAudio } from '../services/audio';
import type { BackgroundSoundId } from '../lib/sounds';

/**
 * Hook to manage persistent background audio playback across navigation.
 * 
 * ENVIRONMENT-AWARE GATING:
 * - Android WebView (window.BackgroundAudio.start exists): starts immediately on mount
 * - Browser (no Android bridge): waits for first user interaction to avoid autoplay blocks
 * 
 * Prevents overlapping/restarting when the same track is already playing.
 * Respects mute settings and stops playback when soundId becomes null.
 */
export function useAppBackgroundMusic(soundId: BackgroundSoundId | null) {
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const hasStartedRef = useRef(false);
  const previousSoundIdRef = useRef<BackgroundSoundId | null>(null);

  // Check if Android background audio bridge exists (new bridge API)
  const hasAndroidBridge = typeof window !== 'undefined' && 
    window.BackgroundAudio && 
    typeof window.BackgroundAudio.start === 'function';

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

  // Start/switch/stop background audio
  useEffect(() => {
    // If soundId is null, stop any playing background music
    if (!soundId) {
      if (hasStartedRef.current) {
        stopBackgroundAudio();
        hasStartedRef.current = false;
        previousSoundIdRef.current = null;
      }
      return;
    }

    // Determine if we can start playback
    const canStart = hasAndroidBridge || hasUserInteracted;
    if (!canStart) return;

    // Check if this exact track is already playing
    const currentTrack = getCurrentBackgroundAudio();
    if (currentTrack === soundId && previousSoundIdRef.current === soundId) {
      return; // Already playing, don't restart
    }

    try {
      // Stop previous track if different (only for web fallback)
      if (previousSoundIdRef.current && previousSoundIdRef.current !== soundId && !hasAndroidBridge) {
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
