import { Sparkles, Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../lib/translations';

export default function Footer() {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <footer className="bg-white/10 backdrop-blur-md border-t-4 border-white/20 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center gap-4">
          {/* Decorative stars */}
          <div className="flex justify-center items-center gap-3 text-white/90">
            <Star className="w-5 h-5 text-fun-yellow fill-fun-yellow animate-pulse" />
            <Sparkles className="w-4 h-4 text-fun-pink fill-fun-pink" />
            <Star className="w-6 h-6 text-fun-orange fill-fun-orange animate-pulse" style={{ animationDelay: '0.5s' }} />
            <Sparkles className="w-4 h-4 text-fun-purple fill-fun-purple" />
            <Star className="w-5 h-5 text-fun-blue fill-fun-blue animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          {/* Privacy Policy Link */}
          <div className="text-center">
            <a
              href="https://sites.google.com/view/learnfungame/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white text-sm underline underline-offset-4 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent rounded px-2 py-1"
            >
              {t.privacyPolicy}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
