/**
 * TypeScript type definitions for the Android WebView bridge.
 * 
 * The Android wrapper app exposes separate bridge objects for background audio
 * and sound effects, ensuring independent playback without interference.
 * 
 * ANDROID AUDIO ARCHITECTURE:
 * - All audio files are MP3 format in res/raw/
 * - Sound IDs are passed WITHOUT file extensions
 * - Example: "tap_click" maps to res/raw/tap_click.mp3
 * - MediaPlayer MP3 support is assumed; no format detection/conversion
 * 
 * BRIDGE SEPARATION:
 * - window.BackgroundAudio: Looping background music (single MediaPlayer instance)
 * - window.AndroidAudio: One-shot sound effects (new MediaPlayer per call)
 * - Background and SFX playback are completely independent
 */

interface BackgroundAudioBridge {
  /**
   * Start playing a looping background track from Android res/raw/<soundId>.mp3
   * 
   * - Stops any previously playing background track
   * - Creates a new looping MediaPlayer instance
   * - Does NOT affect sound effects playback
   * 
   * @param soundId - The resource name (without .mp3 extension) matching res/raw/<soundId>.mp3
   */
  start(soundId: string): void;

  /**
   * Optional: Pause the currently playing background track
   * Not all Android implementations may expose this method
   */
  pause?(): void;

  /**
   * Optional: Stop the currently playing background track
   * Not all Android implementations may expose this method
   */
  stop?(): void;
}

interface AndroidAudioBridge {
  /**
   * Play a one-shot sound effect from Android res/raw/<soundId>.mp3
   * 
   * - Creates a new MediaPlayer instance for each call
   * - Does NOT affect background music playback
   * - Multiple SFX can overlap
   * 
   * @param soundId - The resource name (without .mp3 extension) matching res/raw/<soundId>.mp3
   */
  playSound(soundId: string): void;
}

declare global {
  interface Window {
    /**
     * Android WebView bridge for background music (looping)
     * Only available when running in Android WebView with audio support
     */
    BackgroundAudio?: BackgroundAudioBridge;

    /**
     * Android WebView bridge for sound effects (one-shot)
     * Only available when running in Android WebView with audio support
     */
    AndroidAudio?: AndroidAudioBridge;
  }
}

export {};
