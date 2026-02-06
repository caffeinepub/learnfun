/**
 * Audio configuration module for controlling audio playback behavior.
 * 
 * ANDROID-ONLY MODE:
 * When enabled, the app uses ONLY Android WebView bridge audio:
 * - window.BackgroundAudio.start() for background music
 * - window.AndroidAudio.playSound() for SFX
 * - NO Web Audio API (AudioContext)
 * - NO HTML audio (new Audio(), HTMLAudioElement)
 * - NO web fallback when bridge is missing
 * 
 * Detection is based on the presence of the new bridge objects
 * (window.AndroidAudio and/or window.BackgroundAudio), not the legacy window.Android.
 */

/**
 * Check if Android WebView bridge-only audio mode is enabled.
 * 
 * Detection priority:
 * 1. Runtime config (highest): window.__AUDIO_CONFIG__.androidOnly = true
 * 2. Environment variable: VITE_ANDROID_AUDIO_ONLY=true
 * 
 * When enabled:
 * - Audio only plays through window.BackgroundAudio and window.AndroidAudio
 * - Web audio fallback is completely disabled
 * - No HTMLAudioElement instances are created
 * - Chrome DevTools will not show Web Audio errors
 */
export function isAndroidAudioOnlyMode(): boolean {
  // Check runtime config first (set by index.html detection script)
  if (typeof window !== 'undefined' && window.__AUDIO_CONFIG__?.androidOnly !== undefined) {
    return window.__AUDIO_CONFIG__.androidOnly;
  }
  
  // Fallback to environment variable
  return import.meta.env.VITE_ANDROID_AUDIO_ONLY === 'true';
}

/**
 * Runtime audio configuration interface
 * Set by index.html early detection script based on bridge presence
 */
declare global {
  interface Window {
    __AUDIO_CONFIG__?: {
      /**
       * Enable Android-only audio mode (no web fallback)
       * Set to true when window.AndroidAudio or window.BackgroundAudio is detected
       */
      androidOnly?: boolean;
    };
  }
}

export {};
