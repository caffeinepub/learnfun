import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Music } from 'lucide-react';
import { useState } from 'react';
import { useBackgroundMusic } from '../contexts/BackgroundMusicContext';
import { useAudioSettings } from '../contexts/AudioSettingsContext';
import { BACKGROUND_MUSIC_OPTIONS } from '../lib/backgroundMusicOptions';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../lib/translations';

export default function MusicControlsPopup() {
  const [open, setOpen] = useState(false);
  const { selectedTrack, setSelectedTrack } = useBackgroundMusic();
  const { isBgMusicMuted, isSfxMuted, toggleBgMusic, toggleSfx } = useAudioSettings();
  const { language } = useLanguage();
  const t = useTranslation(language);

  const handleTrackSelect = (value: string) => {
    const option = BACKGROUND_MUSIC_OPTIONS.find(opt => opt.id === value);
    if (option) {
      setSelectedTrack(option.id);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="lg"
          className="bg-white/90 hover:bg-white text-fun-purple font-bold shadow-lg gap-2"
        >
          <Music className="w-5 h-5 md:w-6 md:h-6" />
          <span className="hidden md:inline">{t.music}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 bg-white dark:bg-gray-950 border-4 border-fun-purple/30 p-6"
        align="end"
      >
        <div className="space-y-6">
          <div className="flex items-center gap-2 pb-2 border-b-2 border-fun-purple/20">
            <Music className="w-6 h-6 text-fun-purple" />
            <h3 className="text-xl font-bold text-fun-purple">{t.music}</h3>
          </div>

          {/* Background Music Toggle */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-fun-purple/5">
            <Label htmlFor="bg-music-toggle" className="text-base font-medium cursor-pointer">
              {isBgMusicMuted ? t.bgMusicOff : t.bgMusicOn}
            </Label>
            <Switch
              id="bg-music-toggle"
              checked={!isBgMusicMuted}
              onCheckedChange={toggleBgMusic}
            />
          </div>

          {/* Sound Effects Toggle */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-fun-purple/5">
            <Label htmlFor="sfx-toggle" className="text-base font-medium cursor-pointer">
              {isSfxMuted ? t.sfxOff : t.sfxOn}
            </Label>
            <Switch
              id="sfx-toggle"
              checked={!isSfxMuted}
              onCheckedChange={toggleSfx}
            />
          </div>

          {/* Track Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Background Track
            </Label>
            <RadioGroup value={selectedTrack} onValueChange={handleTrackSelect}>
              <div className="space-y-2">
                {BACKGROUND_MUSIC_OPTIONS.map((option) => (
                  <div 
                    key={option.id} 
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-fun-purple/5 transition-colors"
                  >
                    <RadioGroupItem value={option.id} id={option.id} />
                    <Label
                      htmlFor={option.id}
                      className="flex-1 cursor-pointer text-sm font-medium"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
