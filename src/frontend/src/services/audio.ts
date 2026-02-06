import type { SoundId, BackgroundSoundId } from '../lib/sounds';
import { isValidSoundId, isValidBackgroundSoundId } from '../lib/sounds';
import { isAndroidAudioOnlyMode } from '../config/audioConfig';

/**
 * Audio service that plays sounds via Android bridge when available,
 * falling back to web audio assets when not (unless Android-only mode is enabled).
 * 
 * Supports both one-shot SFX and looping background audio.
 */

// Track current background audio
let currentBackgroundAudio: HTMLAudioElement | null = null;
let currentBackgroundId: BackgroundSoundId | null = null;

// Track warned invalid IDs to avoid spam
const warnedInvalidIds = new Set<string>();

/**
 * Play a one-shot sound effect by ID.
 * 
 * - Validates sound ID before attempting playback
 * - If running in Android WebView (window.Android exists), calls the bridge to play from res/raw
 * - Otherwise, attempts to play from frontend static assets at /assets/audio/<soundId>.mp3
 *   (unless Android-only mode is enabled)
 * - Fails gracefully if sound is missing or bridge/audio unavailable
 * 
 * @param soundId - The sound resource name to play
 */
export function playSound(soundId: SoundId): void {
  try {
    // Validate sound ID
    if (!isValidSoundId(soundId)) {
      if (!warnedInvalidIds.has(soundId)) {
        console.warn(`Invalid sound ID: ${soundId}`);
        warnedInvalidIds.add(soundId);
      }
      return;
    }

    // Check for Android WebView bridge
    if (window.Android && typeof window.Android.playSound === 'function') {
      // Call Android bridge to play from res/raw
      window.Android.playSound(soundId);
      return;
    }

    // If Android-only mode is enabled and bridge is not available, do nothing
    if (isAndroidAudioOnlyMode()) {
      return;
    }

    // Fallback to web audio
    playWebAudio(soundId);
  } catch (error) {
    // Fail gracefully - log but don't crash
    console.warn(`Failed to play sound: ${soundId}`, error);
  }
}

/**
 * Start playing a looping background track.
 * Stops any currently playing background track before starting the new one.
 * 
 * @param soundId - The background sound resource name to play
 */
export function startBackgroundAudio(soundId: BackgroundSoundId): void {
  try {
    // Validate background sound ID
    if (!isValidBackgroundSoundId(soundId)) {
      if (!warnedInvalidIds.has(soundId)) {
        console.warn(`Invalid background sound ID: ${soundId}`);
        warnedInvalidIds.add(soundId);
      }
      return;
    }

    // If same track is already playing, do nothing
    if (currentBackgroundId === soundId && currentBackgroundAudio && !currentBackgroundAudio.paused) {
      return;
    }

    // Stop current background audio if any
    stopBackgroundAudio();

    // Check for Android WebView bridge with background audio support
    if (window.Android && typeof window.Android.startBackgroundAudio === 'function') {
      window.Android.startBackgroundAudio(soundId);
      currentBackgroundId = soundId;
      return;
    }

    // If Android-only mode is enabled and bridge method is not available, do nothing
    if (isAndroidAudioOnlyMode()) {
      currentBackgroundId = soundId; // Track intent even if not playing
      return;
    }

    // Fallback to web audio
    playWebBackgroundAudio(soundId);
  } catch (error) {
    console.warn(`Failed to start background audio: ${soundId}`, error);
  }
}

/**
 * Stop the currently playing background track.
 */
export function stopBackgroundAudio(): void {
  try {
    // Stop Android bridge background audio if available
    if (window.Android && typeof window.Android.stopBackgroundAudio === 'function') {
      window.Android.stopBackgroundAudio();
    }

    // Stop web audio (always clear state even if bridge method is missing)
    if (currentBackgroundAudio) {
      currentBackgroundAudio.pause();
      currentBackgroundAudio.currentTime = 0;
      currentBackgroundAudio = null;
    }

    currentBackgroundId = null;
  } catch (error) {
    console.warn('Failed to stop background audio', error);
  }
}

/**
 * Get the currently playing background track ID, if any.
 */
export function getCurrentBackgroundAudio(): BackgroundSoundId | null {
  return currentBackgroundId;
}

/**
 * Play audio from web static assets (one-shot)
 */
function playWebAudio(soundId: SoundId): void {
  try {
    // Try .mp3 first, then .wav as fallback
    const audio = new Audio(`/assets/audio/${soundId}.mp3`);
    
    audio.onerror = () => {
      // Try .wav as fallback
      const audioWav = new Audio(`/assets/audio/${soundId}.wav`);
      audioWav.onerror = () => {
        console.warn(`Web audio file not found: ${soundId}`);
      };
      audioWav.play().catch(() => {
        // Silently fail if play is blocked or fails
      });
    };
    
    audio.play().catch(() => {
      // Silently fail if play is blocked or fails
    });
  } catch (error) {
    console.warn(`Failed to play web audio: ${soundId}`, error);
  }
}

/**
 * Play looping background audio from web static assets
 */
function playWebBackgroundAudio(soundId: BackgroundSoundId): void {
  try {
    const audio = new Audio(`/assets/audio/${soundId}.mp3`);
    audio.loop = true;
    audio.volume = 0.3; // Lower volume for background music
    
    audio.onerror = () => {
      // Try .wav as fallback
      const audioWav = new Audio(`/assets/audio/${soundId}.wav`);
      audioWav.loop = true;
      audioWav.volume = 0.3;
      
      audioWav.onerror = () => {
        console.warn(`Web background audio file not found: ${soundId}`);
      };
      
      audioWav.play().catch((err) => {
        console.warn(`Failed to play background audio: ${soundId}`, err);
      });
      
      currentBackgroundAudio = audioWav;
      currentBackgroundId = soundId;
    };
    
    audio.play().catch((err) => {
      console.warn(`Failed to play background audio: ${soundId}`, err);
    });
    
    currentBackgroundAudio = audio;
    currentBackgroundId = soundId;
  } catch (error) {
    console.warn(`Failed to play web background audio: ${soundId}`, error);
  }
}
