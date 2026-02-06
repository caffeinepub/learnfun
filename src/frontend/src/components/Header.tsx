import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import BackgroundMusicSelectorModal from './BackgroundMusicSelectorModal';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../lib/translations';

interface HeaderProps {
  onBackToHome: () => void;
}

export default function Header({ onBackToHome }: HeaderProps) {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <header className="bg-white/10 backdrop-blur-md border-b-4 border-white/20 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/assets/generated/mascot-character-transparent.dim_200x200.png" 
              alt={t.appName}
              className="w-12 h-12 md:w-16 md:h-16"
            />
            <h1 className="text-2xl md:text-4xl font-black text-white drop-shadow-lg">
              {t.appName}
            </h1>
          </div>
          
          <div className="flex items-center gap-2 md:gap-3">
            <BackgroundMusicSelectorModal />
            <LanguageSelector />
            <Button
              onClick={onBackToHome}
              size="lg"
              className="bg-white/90 hover:bg-white text-fun-purple font-bold shadow-lg"
            >
              <Home className="w-5 h-5 md:w-6 md:h-6 mr-2" />
              <span className="hidden md:inline">{t.home}</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
