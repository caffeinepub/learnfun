/**
 * Audio configuration module for controlling audio playback behavior.
 * 
 * Supports Android WebView bridge-only mode where web audio fallback is disabled
 * when the Android bridge or required methods are not available.
 */

/**
 * Check if Android WebView bridge-only audio mode is enabled.
 * 
 * When enabled:
 * - Audio only plays through window.Android bridge methods
 * - Web audio fallback is disabled when bridge/methods are missing
 * - No HTMLAudioElement instances are created for missing bridge methods
 * 
 * Enable via:
 * 1. Runtime config (highest priority): window.__AUDIO_CONFIG__.androidOnly = true
 * 2. Environment variable: VITE_ANDROID_AUDIO_ONLY=true
 */
export function isAndroidAudioOnlyMode(): boolean {
  // Check runtime config first (allows dynamic override)
  if (typeof window !== 'undefined' && window.__AUDIO_CONFIG__?.androidOnly !== undefined) {
    return window.__AUDIO_CONFIG__.androidOnly;
  }
  
  // Fallback to environment variable
  return import.meta.env.VITE_ANDROID_AUDIO_ONLY === 'true';
}

/**
 * Runtime audio configuration interface
 */
declare global {
  interface Window {
    __AUDIO_CONFIG__?: {
      androidOnly?: boolean;
    };
  }
}

export {};
