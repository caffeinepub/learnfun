/**
 * Canonical list of sound resource names for the LearnFun application.
 * 
 * These names must match Android res/raw resource names exactly (no extensions).
 * All names are lowercase with only letters, numbers, and underscores.
 * 
 * For APK packaging: Place corresponding audio files in Android res/raw/ folder
 * with these exact names (e.g., res/raw/tap_click.mp3, res/raw/card_flip.wav, etc.)
 */

// One-shot sound effects
export const SFX_SOUND_IDS = [
  'tap_click',
  'card_flip',
  'match_success',
  'match_fail',
  'quiz_correct',
  'quiz_wrong',
  'level_complete',
  'celebration',
] as const;

// Looping background/ambient tracks for child-friendly atmosphere
export const BACKGROUND_SOUND_IDS = [
  'bg_playful_melody',
  'bg_happy_adventure',
  'bg_gentle_wonder',
  'bg_cheerful_exploration',
  'bg_magical_journey',
  'bg_sunny_playground',
  'bg_dreamy_clouds',
  'bg_curious_discovery',
] as const;

// Combined list of all sound IDs
export const SOUND_IDS = [...SFX_SOUND_IDS, ...BACKGROUND_SOUND_IDS] as const;

export type SfxSoundId = typeof SFX_SOUND_IDS[number];
export type BackgroundSoundId = typeof BACKGROUND_SOUND_IDS[number];
export type SoundId = typeof SOUND_IDS[number];

/**
 * Validate if a string is a valid sound ID
 */
export function isValidSoundId(id: string): id is SoundId {
  return SOUND_IDS.includes(id as SoundId);
}

/**
 * Validate if a string is a valid SFX sound ID
 */
export function isValidSfxSoundId(id: string): id is SfxSoundId {
  return SFX_SOUND_IDS.includes(id as SfxSoundId);
}

/**
 * Validate if a string is a valid background sound ID
 */
export function isValidBackgroundSoundId(id: string): id is BackgroundSoundId {
  return BACKGROUND_SOUND_IDS.includes(id as BackgroundSoundId);
}
