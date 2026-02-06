import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Music } from 'lucide-react';
import { useState } from 'react';
import { useBackgroundMusic } from '../contexts/BackgroundMusicContext';
import { BACKGROUND_MUSIC_OPTIONS } from '../lib/backgroundMusicOptions';

export default function BackgroundMusicSelectorModal() {
  const [open, setOpen] = useState(false);
  const { selectedTrack, setSelectedTrack } = useBackgroundMusic();

  const handleSelect = (value: string) => {
    const option = BACKGROUND_MUSIC_OPTIONS.find(opt => opt.id === value);
    if (option) {
      setSelectedTrack(option.id);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="lg"
          className="bg-white/90 hover:bg-white text-fun-purple font-bold shadow-lg gap-2"
        >
          <Music className="w-5 h-5" />
          <span className="hidden md:inline">Music</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white dark:bg-gray-950 border-4 border-fun-purple/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-fun-purple flex items-center gap-2">
            <Music className="w-6 h-6" />
            Background Music
          </DialogTitle>
          <DialogDescription className="sr-only">
            Select a background music track to play while using the app. Choose from various child-friendly melodies and ambient sounds.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <RadioGroup value={selectedTrack} onValueChange={handleSelect}>
            <div className="space-y-3">
              {BACKGROUND_MUSIC_OPTIONS.map((option) => (
                <div key={option.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-fun-purple/5 transition-colors">
                  <RadioGroupItem value={option.id} id={option.id} />
                  <Label
                    htmlFor={option.id}
                    className="flex-1 cursor-pointer text-lg font-medium"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>
      </DialogContent>
    </Dialog>
  );
}
