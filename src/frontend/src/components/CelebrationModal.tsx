import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useEncouragementMessage } from '../hooks/useQueries';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../lib/translations';

interface CelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  level: number;
  totalQuestions?: number;
  isQuiz?: boolean;
}

export default function CelebrationModal({ 
  isOpen, 
  onClose, 
  level, 
  totalQuestions,
  isQuiz = false 
}: CelebrationModalProps) {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [showConfetti, setShowConfetti] = useState(false);
  const { data: message } = useEncouragementMessage(level);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-gradient-to-br from-fun-yellow via-fun-orange to-fun-pink border-8 border-white shadow-2xl">
        <div className="text-center space-y-6 py-8">
          {showConfetti && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-confetti"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: '-10%',
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${2 + Math.random() * 2}s`,
                  }}
                >
                  {['🎉', '⭐', '🌟', '✨', '🎊'][Math.floor(Math.random() * 5)]}
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-center animate-bounce">
            <img 
              src="/assets/generated/trophy-sparkles-transparent.dim_150x150.png"
              alt="Trophy"
              className="w-32 h-32 md:w-40 md:h-40 drop-shadow-2xl"
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-black text-white drop-shadow-lg">
              {t.congratulations}
            </h2>
            
            {isQuiz ? (
              <div className="space-y-2">
                <p className="text-2xl md:text-3xl font-bold text-white">
                  {t.quizCompleted}
                </p>
                <p className="text-3xl md:text-4xl font-black text-white">
                  {level} / {totalQuestions} {t.correct}
                </p>
              </div>
            ) : (
              <p className="text-2xl md:text-3xl font-bold text-white">
                {message}
              </p>
            )}

            <div className="flex justify-center">
              <img 
                src="/assets/generated/celebration-elements-transparent.dim_300x300.png"
                alt="Celebration"
                className="w-48 h-48 object-contain animate-pulse"
              />
            </div>
          </div>

          <Button
            onClick={onClose}
            size="lg"
            className="h-16 px-12 text-2xl font-black bg-white text-fun-purple hover:bg-white/90 hover:scale-105 transition-transform shadow-xl"
          >
            {isQuiz ? t.tryAgain : t.continue}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
