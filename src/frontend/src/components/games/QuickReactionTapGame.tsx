import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslation } from '../../lib/translations';
import { playSound } from '../../services/audio';

interface QuickReactionTapGameProps {
  ageGroup: '3-5' | '6-8' | '9-12' | '13-15';
  onBack: () => void;
  onComplete: (level: number) => void;
  restartTrigger?: number;
}

type Target = {
  id: string;
  color: string;
  emoji: string;
  isCorrect: boolean;
};

const colors = [
  '#FF6B6B', '#4ECDC4', '#FFD93D', '#A8E6CF', '#FFB6C1', '#C7CEEA',
  '#FF8C42', '#6C5CE7', '#00D2D3', '#FD79A8', '#FDCB6E', '#74B9FF',
  '#A29BFE', '#55EFC4', '#FF7675', '#00B894', '#E17055', '#DFE6E9'
];

const emojis = [
  '⭐', '❤️', '🌟', '💎', '🎯', '🔥', '🌈', '⚡', '🎨', '🎭',
  '🎪', '🎬', '🎮', '🎲', '🎵', '🎸', '🎺', '🎻', '🎤', '🎧',
  '🏆', '🥇', '🥈', '🥉', '🏅', '🎖️', '🏀', '⚽', '🏈', '⚾',
  '🎾', '🏐', '🏓', '🏸', '🥊', '🥋', '🎿', '⛷️', '🏂', '🏋️'
];

const getGameSettings = (ageGroup: string) => {
  if (ageGroup === '3-5') {
    return { targetCount: 3, timeLimit: 5000, rounds: 5 };
  } else if (ageGroup === '6-8') {
    return { targetCount: 4, timeLimit: 4000, rounds: 7 };
  } else if (ageGroup === '9-12') {
    return { targetCount: 5, timeLimit: 3000, rounds: 10 };
  } else {
    return { targetCount: 6, timeLimit: 2500, rounds: 12 };
  }
};

export default function QuickReactionTapGame({ ageGroup, onBack, onComplete, restartTrigger }: QuickReactionTapGameProps) {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [settings] = useState(getGameSettings(ageGroup));
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [targets, setTargets] = useState<Target[]>([]);
  const [correctTarget, setCorrectTarget] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState(settings.timeLimit);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const generateTargets = useCallback(() => {
    const newTargets: Target[] = [];
    const correctIndex = Math.floor(Math.random() * settings.targetCount);
    const usedEmojis = new Set<string>();
    const usedColors = new Set<string>();
    
    const correctColor = colors[Math.floor(Math.random() * colors.length)];
    const correctEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    usedEmojis.add(correctEmoji);
    usedColors.add(correctColor);

    for (let i = 0; i < settings.targetCount; i++) {
      if (i === correctIndex) {
        newTargets.push({
          id: `target-${i}`,
          color: correctColor,
          emoji: correctEmoji,
          isCorrect: true
        });
        setCorrectTarget(correctEmoji);
      } else {
        let wrongEmoji, wrongColor;
        do {
          wrongEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        } while (usedEmojis.has(wrongEmoji));
        
        do {
          wrongColor = colors[Math.floor(Math.random() * colors.length)];
        } while (usedColors.has(wrongColor) && usedColors.size < colors.length);
        
        usedEmojis.add(wrongEmoji);
        usedColors.add(wrongColor);
        
        newTargets.push({
          id: `target-${i}`,
          color: wrongColor,
          emoji: wrongEmoji,
          isCorrect: false
        });
      }
    }
    setTargets(newTargets);
  }, [settings.targetCount]);

  const startRound = useCallback(() => {
    generateTargets();
    setTimeLeft(settings.timeLimit);
    setIsPlaying(true);
  }, [generateTargets, settings.timeLimit]);

  useEffect(() => {
    setGameStarted(false);
    setRound(1);
    setScore(0);
    setIsPlaying(false);
  }, [restartTrigger]);

  useEffect(() => {
    if (gameStarted && !isPlaying && round <= settings.rounds) {
      const timer = setTimeout(() => {
        startRound();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [gameStarted, isPlaying, round, settings.rounds, startRound]);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 100) {
          setIsPlaying(false);
          playSound('quiz_wrong');
          toast.error(t.reactionTimeUp, { duration: 1500 });
          if (round >= settings.rounds) {
            setTimeout(() => {
              playSound('level_complete');
              onComplete(score);
            }, 1500);
          } else {
            setRound(round + 1);
          }
          return 0;
        }
        return prev - 100;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, round, settings.rounds, score, onComplete, t]);

  const handleTargetClick = (target: Target) => {
    if (!isPlaying) return;

    // Play tap sound
    playSound('tap_click');

    if (target.isCorrect) {
      playSound('quiz_correct');
      toast.success(t.reactionCorrect, { duration: 1000 });
      setScore(score + 1);
      setIsPlaying(false);
      
      if (round >= settings.rounds) {
        setTimeout(() => {
          playSound('level_complete');
          onComplete(score + 1);
        }, 1000);
      } else {
        setRound(round + 1);
      }
    } else {
      playSound('quiz_wrong');
      toast.error(t.reactionWrong, { duration: 1000 });
      setIsPlaying(false);
      
      if (round >= settings.rounds) {
        setTimeout(() => {
          playSound('level_complete');
          onComplete(score);
        }, 1000);
      } else {
        setRound(round + 1);
      }
    }
  };

  const handleStart = () => {
    setGameStarted(true);
    setRound(1);
    setScore(0);
    startRound();
  };

  if (!gameStarted) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
        <div className="flex items-center gap-4">
          <Button
            onClick={onBack}
            size="lg"
            className="bg-white/90 hover:bg-white text-fun-purple font-bold shadow-lg"
          >
            <ArrowLeft className="w-6 h-6 mr-2" />
            {t.back}
          </Button>
        </div>

        <Card className="bg-white/95 backdrop-blur-sm border-4 border-fun-orange shadow-2xl">
          <CardContent className="p-8 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-black text-fun-purple">
              {t.reactionGame}
            </h2>
            <p className="text-lg md:text-xl text-gray-700 font-semibold">
              {t.reactionGameDesc}
            </p>
            <div className="bg-fun-yellow/20 p-6 rounded-2xl">
              <p className="text-xl font-bold text-fun-purple mb-2">{t.reactionInstructions}</p>
              <p className="text-lg text-gray-700">{t.reactionRounds}: {settings.rounds}</p>
            </div>
            <Button
              onClick={handleStart}
              size="lg"
              className="w-full h-16 text-2xl font-bold bg-gradient-to-r from-fun-orange to-fun-yellow hover:shadow-xl"
            >
              {t.reactionStart}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <Button
          onClick={onBack}
          size="lg"
          className="bg-white/90 hover:bg-white text-fun-purple font-bold shadow-lg"
        >
          <ArrowLeft className="w-6 h-6 mr-2" />
          {t.back}
        </Button>
        <div className="flex gap-4">
          <div className="text-white text-xl md:text-2xl font-bold bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
            {t.reactionRound}: {round}/{settings.rounds}
          </div>
          <div className="text-white text-xl md:text-2xl font-bold bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
            {t.score}: {score}
          </div>
        </div>
      </div>

      <Card className="bg-white/95 backdrop-blur-sm border-4 border-fun-orange shadow-2xl">
        <CardContent className="p-8">
          <div className="text-center space-y-6 mb-8">
            <h2 className="text-3xl md:text-4xl font-black text-fun-purple">
              {t.reactionFindTarget}: {correctTarget}
            </h2>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-fun-orange to-fun-yellow h-full transition-all duration-100"
                style={{ width: `${(timeLeft / settings.timeLimit) * 100}%` }}
              />
            </div>
          </div>

          <div className={`grid ${settings.targetCount <= 4 ? 'grid-cols-2' : 'grid-cols-3'} gap-6`}>
            {targets.map((target) => (
              <button
                key={target.id}
                onClick={() => handleTargetClick(target)}
                disabled={!isPlaying}
                className="aspect-square rounded-3xl border-4 border-fun-purple hover:scale-110 transition-all shadow-xl flex items-center justify-center text-8xl bg-white disabled:opacity-50"
                style={{ backgroundColor: target.color }}
              >
                {target.emoji}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
