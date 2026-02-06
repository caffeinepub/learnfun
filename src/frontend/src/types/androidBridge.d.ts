/**
 * TypeScript type definitions for the Android WebView bridge.
 * 
 * The Android wrapper app should expose a global `Android` object with methods
 * for playing sounds and managing background audio.
 */

interface AndroidBridge {
  /**
   * Play a one-shot sound from Android res/raw resources
   * @param soundId - The resource name (without extension) matching a file in res/raw/
   */
  playSound(soundId: string): void;

  /**
   * Start playing a looping background track from Android res/raw resources (optional)
   * @param soundId - The resource name (without extension) matching a file in res/raw/
   */
  startBackgroundAudio?(soundId: string): void;

  /**
   * Stop the currently playing background track (optional)
   */
  stopBackgroundAudio?(): void;
}

declare global {
  interface Window {
    /**
     * Android WebView bridge object (only available when running in Android WebView)
     */
    Android?: AndroidBridge;
  }
}

export {};
