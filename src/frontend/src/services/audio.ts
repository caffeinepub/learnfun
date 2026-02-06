import type { SoundId, BackgroundSoundId } from '../lib/sounds';
import { isValidSoundId, isValidBackgroundSoundId } from '../lib/sounds';
import { isAndroidAudioOnlyMode } from '../config/audioConfig';

/**
 * Audio service for Android WebView MP3-only playback.
 * 
 * ANDROID MODE:
 * - Uses window.BackgroundAudio.start() for background music (looping MediaPlayer)
 * - Uses window.AndroidAudio.playSound() for SFX (new MediaPlayer per call)
 * - NO Web Audio API, NO HTMLAudioElement, NO AudioContext
 * - All sounds are MP3 in res/raw/<soundId>.mp3
 * - Sound IDs passed WITHOUT extensions
 * 
 * CRITICAL GUARANTEES:
 * - Background and SFX playback are completely independent
 * - SFX never stops/pauses background music
 * - Background switching never interrupts SFX
 * - No shared MediaPlayer instances
 */

// Track current background audio state
let currentBackgroundId: BackgroundSoundId | null = null;

// Track warned invalid IDs to avoid spam
const warnedInvalidIds = new Set<string>();

// Global mute states (set by audio settings context)
let globalSfxMuted = false;
let globalBgMusicMuted = false;

/**
 * Set global SFX mute state
 */
export function setSfxMuted(muted: boolean): void {
  globalSfxMuted = muted;
}

/**
 * Set global background music mute state
 * When muted, immediately stops any playing background music
 */
export function setBgMusicMuted(muted: boolean): void {
  globalBgMusicMuted = muted;
  
  // If muting, immediately stop any playing background music
  if (muted) {
    stopBackgroundAudio();
  }
}

/**
 * Play a one-shot sound effect by ID.
 * 
 * ANDROID MODE:
 * - Calls window.AndroidAudio.playSound(soundId) - bare ID, no extension
 * - Each call creates a new MediaPlayer instance
 * - Never affects background music playback
 * 
 * @param soundId - The sound resource name (no extension)
 */
export function playSound(soundId: SoundId): void {
  try {
    // Check if SFX is muted
    if (globalSfxMuted) {
      return;
    }

    // Validate sound ID
    if (!isValidSoundId(soundId)) {
      if (!warnedInvalidIds.has(soundId)) {
        console.warn(`Invalid sound ID: ${soundId}`);
        warnedInvalidIds.add(soundId);
      }
      return;
    }

    // Check for Android SFX bridge
    if (window.AndroidAudio && typeof window.AndroidAudio.playSound === 'function') {
      // Call Android bridge - pass bare soundId (no extension)
      // Maps to res/raw/<soundId>.mp3
      window.AndroidAudio.playSound(soundId);
      return;
    }

    // If Android-only mode is enabled and bridge is not available, do nothing
    // NO web fallback, NO HTMLAudioElement creation
    if (isAndroidAudioOnlyMode()) {
      return;
    }

    // Web fallback (only if Android-only mode is disabled)
    playWebAudio(soundId);
  } catch (error) {
    // Fail gracefully - log but don't crash
    console.warn(`Failed to play sound: ${soundId}`, error);
  }
}

/**
 * Start playing a looping background track.
 * 
 * ANDROID MODE:
 * - Calls window.BackgroundAudio.start(soundId) - bare ID, no extension
 * - Creates a new looping MediaPlayer instance
 * - Stops previous background track automatically
 * - Never affects SFX playback
 * 
 * @param soundId - The background sound resource name (no extension)
 */
export function startBackgroundAudio(soundId: BackgroundSoundId): void {
  try {
    // Check if background music is muted
    if (globalBgMusicMuted) {
      // Stop any playing background music
      stopBackgroundAudio();
      return;
    }

    // Validate background sound ID
    if (!isValidBackgroundSoundId(soundId)) {
      if (!warnedInvalidIds.has(soundId)) {
        console.warn(`Invalid background sound ID: ${soundId}`);
        warnedInvalidIds.add(soundId);
      }
      return;
    }

    // If same track is already playing, do nothing
    if (currentBackgroundId === soundId) {
      return;
    }

    // Update current background ID
    currentBackgroundId = soundId;

    // Check for Android background audio bridge
    if (window.BackgroundAudio && typeof window.BackgroundAudio.start === 'function') {
      // Call Android bridge - pass bare soundId (no extension)
      // Maps to res/raw/<soundId>.mp3
      // Android side handles stopping previous track
      window.BackgroundAudio.start(soundId);
      return;
    }

    // If Android-only mode is enabled and bridge is not available, do nothing
    // NO web fallback, NO HTMLAudioElement creation
    if (isAndroidAudioOnlyMode()) {
      return;
    }

    // Web fallback (only if Android-only mode is disabled)
    playWebBackgroundAudio(soundId);
  } catch (error) {
    console.warn(`Failed to start background audio: ${soundId}`, error);
  }
}

/**
 * Stop the currently playing background track.
 * 
 * Attempts to stop background music in both Android bridge mode and web fallback.
 */
export function stopBackgroundAudio(): void {
  try {
    currentBackgroundId = null;

    // Try to stop Android bridge background music if available
    // Note: The bridge may not expose a stop method, but we try pause if available
    if (window.BackgroundAudio) {
      // Check if pause method exists (optional extension)
      if (typeof (window.BackgroundAudio as any).pause === 'function') {
        (window.BackgroundAudio as any).pause();
      }
      // Check if stop method exists (optional extension)
      if (typeof (window.BackgroundAudio as any).stop === 'function') {
        (window.BackgroundAudio as any).stop();
      }
    }
    
    // Always stop web audio fallback (if not in Android-only mode)
    if (!isAndroidAudioOnlyMode()) {
      stopWebBackgroundAudio();
    }
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

// ============================================================================
// WEB FALLBACK (only used when Android-only mode is disabled)
// ============================================================================

let currentWebBackgroundAudio: HTMLAudioElement | null = null;

/**
 * Play audio from web static assets (one-shot)
 * Only called when NOT in Android-only mode
 */
function playWebAudio(soundId: SoundId): void {
  try {
    const audio = new Audio(`/assets/audio/${soundId}.mp3`);
    
    audio.onerror = () => {
      // No "Sound not found" message - just silent failure
      // Android bridge will log if resource is missing in res/raw
    };
    
    audio.play().catch(() => {
      // Silently fail if play is blocked or fails
    });
  } catch (error) {
    // Silent failure - avoid misleading logs in Android mode
  }
}

/**
 * Play looping background audio from web static assets
 * Only called when NOT in Android-only mode
 */
function playWebBackgroundAudio(soundId: BackgroundSoundId): void {
  try {
    // Stop previous web background audio
    stopWebBackgroundAudio();

    const audio = new Audio(`/assets/audio/${soundId}.mp3`);
    audio.loop = true;
    audio.volume = 0.3; // Lower volume for background music
    
    audio.onerror = () => {
      // No "Sound not found" message - just silent failure
    };
    
    audio.play().catch(() => {
      // Silently fail if play is blocked
    });
    
    currentWebBackgroundAudio = audio;
  } catch (error) {
    // Silent failure
  }
}

/**
 * Stop web background audio
 * Only called when NOT in Android-only mode
 */
function stopWebBackgroundAudio(): void {
  if (currentWebBackgroundAudio) {
    currentWebBackgroundAudio.pause();
    currentWebBackgroundAudio.currentTime = 0;
    currentWebBackgroundAudio = null;
  }
}
