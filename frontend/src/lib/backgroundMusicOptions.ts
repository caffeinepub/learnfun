import type { BackgroundSoundId } from './sounds';

export interface BackgroundMusicOption {
  id: BackgroundSoundId;
  labelKey: string;
}

export const BACKGROUND_MUSIC_OPTIONS: BackgroundMusicOption[] = [
  { id: 'bg_playful_melody', labelKey: 'playfulMelody' },
  { id: 'bg_happy_adventure', labelKey: 'happyAdventure' },
  { id: 'bg_gentle_wonder', labelKey: 'gentleWonder' },
  { id: 'bg_cheerful_exploration', labelKey: 'cheerfulExploration' },
  { id: 'bg_magical_journey', labelKey: 'magicalJourney' },
];
