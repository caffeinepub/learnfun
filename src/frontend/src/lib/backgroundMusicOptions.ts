import type { BackgroundSoundId } from './sounds';

export interface BackgroundMusicOption {
  id: BackgroundSoundId;
  label: string;
}

export const BACKGROUND_MUSIC_OPTIONS: BackgroundMusicOption[] = [
  { id: 'bg_playful_melody', label: 'Playful Melody' },
  { id: 'bg_happy_adventure', label: 'Happy Adventure' },
  { id: 'bg_gentle_wonder', label: 'Gentle Wonder' },
  { id: 'bg_cheerful_exploration', label: 'Cheerful Exploration' },
  { id: 'bg_magical_journey', label: 'Magical Journey' },
];
