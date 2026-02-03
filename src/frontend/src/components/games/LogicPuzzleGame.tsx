import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Trophy } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslation } from '../../lib/translations';
import { useLogicPuzzles } from '../../hooks/useQueries';
import type { LocalizedText } from '../../backend';

interface LogicPuzzleGameProps {
  ageGroup: '3-5' | '6-8' | '9-12' | '13-15';
  onBack: () => void;
  onComplete: (level: number) => void;
}

type Puzzle = {
  question: string;
  answer: string;
  difficulty: number;
  type: 'number' | 'pattern' | 'word' | 'spatial' | 'time';
};

export default function LogicPuzzleGame({ ageGroup, onBack, onComplete }: LogicPuzzleGameProps) {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const { data: backendPuzzles } = useLogicPuzzles(ageGroup);
  const [currentPuzzle, setCurrentPuzzle] = useState<Puzzle | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [puzzlesSolved, setPuzzlesSolved] = useState(0);
  const [puzzleType, setPuzzleType] = useState<'number' | 'pattern' | 'word' | 'spatial' | 'time'>('number');
  const [currentLevel, setCurrentLevel] = useState(1);
  const totalPuzzles = 7;

  const getLocalizedText = (localized: LocalizedText): string => {
    const langMap: Record<string, keyof LocalizedText> = {
      tr: 'turkish', en: 'english', es: 'spanish', fr: 'french',
      de: 'german', it: 'italian', ru: 'russian', pt: 'portuguese',
      zh: 'chinese', ja: 'japanese'
    };
    return localized[langMap[language]];
  };

  const generateNumberPuzzle = (): Puzzle => {
    if (ageGroup === '3-5') {
      const patterns = [
        { question: '1, 2, ?', answer: '3', type: 'number' as const },
        { question: '2, 4, ?', answer: '6', type: 'number' as const },
        { question: '1, 3, ?', answer: '5', type: 'number' as const },
        { question: '5, 10, ?', answer: '15', type: 'number' as const },
      ];
      const selected = patterns[Math.floor(Math.random() * patterns.length)];
      return { ...selected, difficulty: 1 };
    } else if (ageGroup === '6-8') {
      const patterns = [
        { question: '2, 4, 6, ?', answer: '8', type: 'number' as const },
        { question: '1, 3, 5, ?', answer: '7', type: 'number' as const },
        { question: '10, 20, 30, ?', answer: '40', type: 'number' as const },
        { question: '5, 10, 15, ?', answer: '20', type: 'number' as const },
        { question: '3, 6, 9, ?', answer: '12', type: 'number' as const },
        { question: '4, 8, 12, ?', answer: '16', type: 'number' as const },
        { question: '7, 14, 21, ?', answer: '28', type: 'number' as const },
      ];
      const selected = patterns[Math.floor(Math.random() * patterns.length)];
      return { ...selected, difficulty: 1 };
    } else if (ageGroup === '9-12') {
      const patterns = [
        { question: '2, 4, 8, 16, ?', answer: '32', type: 'number' as const },
        { question: '1, 1, 2, 3, 5, ?', answer: '8', type: 'number' as const },
        { question: '100, 50, 25, ?', answer: '12.5', type: 'number' as const },
        { question: '3, 6, 12, 24, ?', answer: '48', type: 'number' as const },
        { question: '81, 27, 9, ?', answer: '3', type: 'number' as const },
        { question: '1, 4, 9, 16, ?', answer: '25', type: 'number' as const },
        { question: '2, 6, 12, 20, ?', answer: '30', type: 'number' as const },
        { question: '5, 8, 11, 14, ?', answer: '17', type: 'number' as const },
        { question: '64, 32, 16, ?', answer: '8', type: 'number' as const },
      ];
      const selected = patterns[Math.floor(Math.random() * patterns.length)];
      return { ...selected, difficulty: 2 };
    } else {
      const patterns = [
        { question: '2, 4, 8, 16, 32, ?', answer: '64', type: 'number' as const },
        { question: '1, 1, 2, 3, 5, 8, ?', answer: '13', type: 'number' as const },
        { question: '1000, 100, 10, ?', answer: '1', type: 'number' as const },
        { question: '1, 4, 9, 16, 25, ?', answer: '36', type: 'number' as const },
        { question: '2, 6, 12, 20, 30, ?', answer: '42', type: 'number' as const },
        { question: '3, 9, 27, 81, ?', answer: '243', type: 'number' as const },
        { question: '128, 64, 32, 16, ?', answer: '8', type: 'number' as const },
      ];
      const selected = patterns[Math.floor(Math.random() * patterns.length)];
      return { ...selected, difficulty: 3 };
    }
  };

  const generatePatternPuzzle = (): Puzzle => {
    if (ageGroup === '3-5') {
      const patterns = [
        { question: '⭐🌙⭐?', answer: '🌙', type: 'pattern' as const },
        { question: '🔴🔵🔴?', answer: '🔵', type: 'pattern' as const },
        { question: '🐶🐱🐶?', answer: '🐱', type: 'pattern' as const },
      ];
      const selected = patterns[Math.floor(Math.random() * patterns.length)];
      return { ...selected, difficulty: 1 };
    } else if (ageGroup === '6-8') {
      const patterns = [
        { question: '⭐⭐🌙⭐⭐🌙⭐⭐?', answer: '🌙', type: 'pattern' as const },
        { question: '🔴🔵🔴🔵🔴?', answer: '🔵', type: 'pattern' as const },
        { question: '🐶🐱🐶🐱?', answer: '🐶', type: 'pattern' as const },
        { question: '🌸🌸🌺🌸🌸🌺?', answer: '🌸', type: 'pattern' as const },
        { question: '🍎🍊🍎🍊?', answer: '🍎', type: 'pattern' as const },
        { question: '🎈🎈🎁🎈🎈🎁?', answer: '🎈', type: 'pattern' as const },
      ];
      const selected = patterns[Math.floor(Math.random() * patterns.length)];
      return { ...selected, difficulty: 1 };
    } else if (ageGroup === '9-12') {
      const patterns = [
        { question: '🔺🔻🔺🔺🔻🔺🔺🔺?', answer: '🔻', type: 'pattern' as const },
        { question: '🌟🌟⭐🌟🌟⭐?', answer: '🌟', type: 'pattern' as const },
        { question: '🟥🟧🟨🟩🟦?', answer: '🟪', type: 'pattern' as const },
        { question: '⬛⬜⬛⬛⬜⬛⬛⬛?', answer: '⬜', type: 'pattern' as const },
        { question: '🔷🔶🔷🔷🔶🔷🔷🔷?', answer: '🔶', type: 'pattern' as const },
        { question: '🎯🎯🎪🎯🎯🎪?', answer: '🎯', type: 'pattern' as const },
        { question: '🌈🌈☁️🌈🌈☁️?', answer: '🌈', type: 'pattern' as const },
      ];
      const selected = patterns[Math.floor(Math.random() * patterns.length)];
      return { ...selected, difficulty: 2 };
    } else {
      const patterns = [
        { question: '🔺🔻🔺🔺🔻🔺🔺🔺🔻?', answer: '🔺', type: 'pattern' as const },
        { question: '🌟🌟⭐🌟🌟⭐🌟🌟?', answer: '⭐', type: 'pattern' as const },
        { question: '🟥🟧🟨🟩🟦🟪?', answer: '🟥', type: 'pattern' as const },
        { question: '⬛⬜⬛⬛⬜⬛⬛⬛⬜?', answer: '⬛', type: 'pattern' as const },
        { question: '🔷🔶🔷🔷🔶🔷🔷🔷🔶?', answer: '🔷', type: 'pattern' as const },
      ];
      const selected = patterns[Math.floor(Math.random() * patterns.length)];
      return { ...selected, difficulty: 3 };
    }
  };

  const generateWordPuzzle = (): Puzzle => {
    const wordPuzzles = {
      tr: ageGroup === '3-5'
        ? [
            { question: 'Kedi, Köpek - Hepsi ne?', answer: 'Hayvan', type: 'word' as const },
            { question: 'Elma, Muz - Hepsi ne?', answer: 'Meyve', type: 'word' as const },
            { question: 'Kırmızı, Mavi - Hepsi ne?', answer: 'Renk', type: 'word' as const },
          ]
        : ageGroup === '6-8' 
        ? [
            { question: 'Kedi, Köpek, Kuş - Hepsi ne?', answer: 'Hayvan', type: 'word' as const },
            { question: 'Elma, Armut, Muz - Hepsi ne?', answer: 'Meyve', type: 'word' as const },
            { question: 'Kırmızı, Mavi, Yeşil - Hepsi ne?', answer: 'Renk', type: 'word' as const },
            { question: 'Masa, Sandalye, Dolap - Hepsi ne?', answer: 'Mobilya', type: 'word' as const },
            { question: 'Güneş, Ay, Yıldız - Hepsi nerede?', answer: 'Gökyüzü', type: 'word' as const },
          ]
        : ageGroup === '9-12'
        ? [
            { question: 'Kalem, Defter, Silgi - Bunlar nerede kullanılır?', answer: 'Okul', type: 'word' as const },
            { question: 'Güneş, Ay, Yıldız - Bunlar nerede görülür?', answer: 'Gökyüzü', type: 'word' as const },
            { question: 'Doktor, Öğretmen, Mühendis - Bunlar ne?', answer: 'Meslek', type: 'word' as const },
            { question: 'Kitap, Gazete, Dergi - Bunlar ne için?', answer: 'Okuma', type: 'word' as const },
            { question: 'Futbol, Basketbol, Voleybol - Bunlar ne?', answer: 'Spor', type: 'word' as const },
          ]
        : [
            { question: 'Kalem, Defter, Silgi, Cetvel - Bunlar nerede kullanılır?', answer: 'Okul', type: 'word' as const },
            { question: 'Doktor, Öğretmen, Mühendis, Avukat - Bunlar ne?', answer: 'Meslek', type: 'word' as const },
            { question: 'Kitap, Gazete, Dergi, Roman - Bunlar ne için?', answer: 'Okuma', type: 'word' as const },
            { question: 'Futbol, Basketbol, Voleybol, Tenis - Bunlar ne?', answer: 'Spor', type: 'word' as const },
          ],
      en: ageGroup === '3-5'
        ? [
            { question: 'Cat, Dog - What are they?', answer: 'Animal', type: 'word' as const },
            { question: 'Apple, Banana - What are they?', answer: 'Fruit', type: 'word' as const },
            { question: 'Red, Blue - What are they?', answer: 'Color', type: 'word' as const },
          ]
        : ageGroup === '6-8'
        ? [
            { question: 'Cat, Dog, Bird - What are they?', answer: 'Animal', type: 'word' as const },
            { question: 'Apple, Pear, Banana - What are they?', answer: 'Fruit', type: 'word' as const },
            { question: 'Red, Blue, Green - What are they?', answer: 'Color', type: 'word' as const },
            { question: 'Table, Chair, Cabinet - What are they?', answer: 'Furniture', type: 'word' as const },
            { question: 'Sun, Moon, Star - Where are they?', answer: 'Sky', type: 'word' as const },
          ]
        : ageGroup === '9-12'
        ? [
            { question: 'Pen, Notebook, Eraser - Where are they used?', answer: 'School', type: 'word' as const },
            { question: 'Sun, Moon, Star - Where are they seen?', answer: 'Sky', type: 'word' as const },
            { question: 'Doctor, Teacher, Engineer - What are they?', answer: 'Profession', type: 'word' as const },
            { question: 'Book, Newspaper, Magazine - What are they for?', answer: 'Reading', type: 'word' as const },
            { question: 'Football, Basketball, Volleyball - What are they?', answer: 'Sport', type: 'word' as const },
          ]
        : [
            { question: 'Pen, Notebook, Eraser, Ruler - Where are they used?', answer: 'School', type: 'word' as const },
            { question: 'Doctor, Teacher, Engineer, Lawyer - What are they?', answer: 'Profession', type: 'word' as const },
            { question: 'Book, Newspaper, Magazine, Novel - What are they for?', answer: 'Reading', type: 'word' as const },
            { question: 'Football, Basketball, Volleyball, Tennis - What are they?', answer: 'Sport', type: 'word' as const },
          ],
    };
    
    const puzzles = wordPuzzles[language as 'tr' | 'en'] || wordPuzzles.en;
    const selected = puzzles[Math.floor(Math.random() * puzzles.length)];
    return { ...selected, difficulty: ageGroup === '3-5' ? 1 : ageGroup === '6-8' ? 1 : ageGroup === '9-12' ? 2 : 3 };
  };

  const generateSpatialPuzzle = (): Puzzle => {
    if (ageGroup === '3-5') {
      const puzzles = [
        { question: '🔲 + 🔲 = ?', answer: '🔳', type: 'spatial' as const },
        { question: '⬜ içinde ⬛ = ?', answer: '🔲', type: 'spatial' as const },
      ];
      const selected = puzzles[Math.floor(Math.random() * puzzles.length)];
      return { ...selected, difficulty: 1 };
    } else if (ageGroup === '6-8') {
      const puzzles = [
        { question: '🔲 + 🔲 = ?', answer: '🔳', type: 'spatial' as const },
        { question: '⬜ içinde ⬛ = ?', answer: '🔲', type: 'spatial' as const },
        { question: '🔺 + 🔺 = ?', answer: '🔶', type: 'spatial' as const },
      ];
      const selected = puzzles[Math.floor(Math.random() * puzzles.length)];
      return { ...selected, difficulty: 1 };
    } else if (ageGroup === '9-12') {
      const puzzles = [
        { question: '🔲 döndür 90° = ?', answer: '🔳', type: 'spatial' as const },
        { question: '🔺 + 🔻 = ?', answer: '🔶', type: 'spatial' as const },
        { question: '⬛ içinde ⬜ içinde ⬛ = ?', answer: '🎯', type: 'spatial' as const },
        { question: '🔷 ayna = ?', answer: '🔶', type: 'spatial' as const },
      ];
      const selected = puzzles[Math.floor(Math.random() * puzzles.length)];
      return { ...selected, difficulty: 2 };
    } else {
      const puzzles = [
        { question: '🔲 döndür 180° = ?', answer: '🔲', type: 'spatial' as const },
        { question: '🔺 + 🔻 + 🔺 = ?', answer: '🔶', type: 'spatial' as const },
        { question: '⬛ içinde ⬜ içinde ⬛ içinde ⬜ = ?', answer: '🎯', type: 'spatial' as const },
        { question: '🔷 ayna ayna = ?', answer: '🔷', type: 'spatial' as const },
      ];
      const selected = puzzles[Math.floor(Math.random() * puzzles.length)];
      return { ...selected, difficulty: 3 };
    }
  };

  const generateTimePuzzle = (): Puzzle => {
    if (ageGroup === '3-5') {
      const puzzles = [
        { question: 'Sabah, ?', answer: 'Akşam', type: 'time' as const },
        { question: 'Gündüz, ?', answer: 'Gece', type: 'time' as const },
      ];
      const selected = puzzles[Math.floor(Math.random() * puzzles.length)];
      return { ...selected, difficulty: 1 };
    } else if (ageGroup === '6-8') {
      const puzzles = [
        { question: 'Sabah, Öğle, ?', answer: 'Akşam', type: 'time' as const },
        { question: 'Pazartesi, Salı, ?', answer: 'Çarşamba', type: 'time' as const },
        { question: 'İlkbahar, Yaz, ?', answer: 'Sonbahar', type: 'time' as const },
      ];
      const selected = puzzles[Math.floor(Math.random() * puzzles.length)];
      return { ...selected, difficulty: 1 };
    } else if (ageGroup === '9-12') {
      const puzzles = [
        { question: 'Ocak, Şubat, Mart, ?', answer: 'Nisan', type: 'time' as const },
        { question: '1 saat = ? dakika', answer: '60', type: 'time' as const },
        { question: '1 hafta = ? gün', answer: '7', type: 'time' as const },
        { question: 'Dün, Bugün, ?', answer: 'Yarın', type: 'time' as const },
      ];
      const selected = puzzles[Math.floor(Math.random() * puzzles.length)];
      return { ...selected, difficulty: 2 };
    } else {
      const puzzles = [
        { question: 'Ocak, Şubat, Mart, Nisan, ?', answer: 'Mayıs', type: 'time' as const },
        { question: '1 gün = ? saat', answer: '24', type: 'time' as const },
        { question: '1 yıl = ? ay', answer: '12', type: 'time' as const },
        { question: 'Dün, Bugün, Yarın, ?', answer: 'Öbürgün', type: 'time' as const },
      ];
      const selected = puzzles[Math.floor(Math.random() * puzzles.length)];
      return { ...selected, difficulty: 3 };
    }
  };

  const generatePuzzle = (): Puzzle => {
    switch (puzzleType) {
      case 'number':
        return generateNumberPuzzle();
      case 'pattern':
        return generatePatternPuzzle();
      case 'word':
        return generateWordPuzzle();
      case 'spatial':
        return generateSpatialPuzzle();
      case 'time':
        return generateTimePuzzle();
      default:
        return generateNumberPuzzle();
    }
  };

  useEffect(() => {
    if (backendPuzzles && backendPuzzles.length > 0) {
      const puzzle = backendPuzzles[0];
      setCurrentPuzzle({
        question: getLocalizedText(puzzle.question),
        answer: getLocalizedText(puzzle.answer),
        difficulty: Number(puzzle.difficulty),
        type: 'number',
      });
    } else {
      setCurrentPuzzle(generatePuzzle());
    }
  }, [backendPuzzles, ageGroup, puzzleType]);

  const handleSubmit = () => {
    if (!currentPuzzle || !userAnswer.trim()) return;

    const isCorrect = userAnswer.trim().toLowerCase() === currentPuzzle.answer.toLowerCase();
    
    if (isCorrect) {
      toast.success(t.correctAnswer, { duration: 1500 });
      setScore(score + 1);
    } else {
      toast.error(`${t.correctAnswerWas} ${currentPuzzle.answer}`, { duration: 2000 });
    }

    const newPuzzlesSolved = puzzlesSolved + 1;
    setPuzzlesSolved(newPuzzlesSolved);

    if (newPuzzlesSolved >= totalPuzzles) {
      setTimeout(() => {
        toast.success(`${t.levelComplete} 🎉`, { duration: 2000 });
        onComplete(score + (isCorrect ? 1 : 0));
      }, 1000);
    } else {
      setTimeout(() => {
        setCurrentPuzzle(generatePuzzle());
        setUserAnswer('');
      }, 1500);
    }
  };

  const handleTypeChange = (type: typeof puzzleType) => {
    setPuzzleType(type);
    setCurrentLevel(type === 'number' ? 1 : type === 'pattern' ? 2 : type === 'word' ? 3 : type === 'spatial' ? 4 : 5);
    setCurrentPuzzle(null);
    setTimeout(() => {
      if (type === 'number') setCurrentPuzzle(generateNumberPuzzle());
      else if (type === 'pattern') setCurrentPuzzle(generatePatternPuzzle());
      else if (type === 'word') setCurrentPuzzle(generateWordPuzzle());
      else if (type === 'spatial') setCurrentPuzzle(generateSpatialPuzzle());
      else setCurrentPuzzle(generateTimePuzzle());
    }, 100);
  };

  if (!currentPuzzle) return null;

  const puzzleImage = puzzleType === 'number' 
    ? '/assets/generated/number-sequence-puzzle.dim_400x300.png'
    : puzzleType === 'pattern'
    ? '/assets/generated/pattern-recognition-puzzle.dim_400x300.png'
    : puzzleType === 'word'
    ? '/assets/generated/word-logic-puzzle.dim_400x300.png'
    : puzzleType === 'spatial'
    ? '/assets/generated/spatial-reasoning-3d.dim_400x300.png'
    : '/assets/generated/time-logic-puzzle.dim_400x300.png';

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <Button
          onClick={onBack}
          size="lg"
          className="bg-white/90 hover:bg-white text-fun-purple font-bold shadow-lg transition-all hover:scale-105"
        >
          <ArrowLeft className="w-6 h-6 mr-2" />
          {t.back}
        </Button>
        <div className="flex gap-4 flex-wrap">
          <div className="text-white text-xl md:text-2xl font-bold bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full flex items-center gap-2">
            <Trophy className="w-6 h-6" />
            {t.level} {currentLevel}
          </div>
          <div className="text-white text-xl md:text-2xl font-bold bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
            {t.question}: {puzzlesSolved + 1}/{totalPuzzles} | {t.score}: {score} 🌟
          </div>
        </div>
      </div>

      <Card className="bg-white/95 backdrop-blur-sm border-4 border-fun-purple shadow-2xl">
        <CardContent className="p-8 md:p-12">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-black text-fun-purple">
                {t.logicPuzzle}
              </h2>
              <p className="text-lg md:text-xl text-gray-700 font-semibold">
                {t.completePattern}
              </p>
            </div>

            {/* Puzzle Type Selection */}
            <div className="flex justify-center gap-3 flex-wrap">
              <Button
                onClick={() => handleTypeChange('number')}
                className={`h-12 px-6 text-lg font-bold transition-all ${
                  puzzleType === 'number'
                    ? 'bg-gradient-to-r from-fun-orange to-fun-yellow scale-105'
                    : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                }`}
              >
                🔢 {t.numberSequences}
              </Button>
              <Button
                onClick={() => handleTypeChange('pattern')}
                className={`h-12 px-6 text-lg font-bold transition-all ${
                  puzzleType === 'pattern'
                    ? 'bg-gradient-to-r from-fun-orange to-fun-yellow scale-105'
                    : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                }`}
              >
                🎨 {t.patternRecognition}
              </Button>
              <Button
                onClick={() => handleTypeChange('word')}
                className={`h-12 px-6 text-lg font-bold transition-all ${
                  puzzleType === 'word'
                    ? 'bg-gradient-to-r from-fun-orange to-fun-yellow scale-105'
                    : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                }`}
              >
                📝 {t.wordLogic}
              </Button>
              {(ageGroup === '9-12' || ageGroup === '13-15') && (
                <>
                  <Button
                    onClick={() => handleTypeChange('spatial')}
                    className={`h-12 px-6 text-lg font-bold transition-all ${
                      puzzleType === 'spatial'
                        ? 'bg-gradient-to-r from-fun-orange to-fun-yellow scale-105'
                        : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                    }`}
                  >
                    🧊 {t.spatialReasoning}
                  </Button>
                  <Button
                    onClick={() => handleTypeChange('time')}
                    className={`h-12 px-6 text-lg font-bold transition-all ${
                      puzzleType === 'time'
                        ? 'bg-gradient-to-r from-fun-orange to-fun-yellow scale-105'
                        : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                    }`}
                  >
                    ⏰ {t.timeLogic}
                  </Button>
                </>
              )}
            </div>

            <div className="bg-gradient-to-r from-fun-purple to-fun-blue p-8 md:p-12 rounded-3xl shadow-xl animate-in zoom-in duration-300">
              <p className="text-4xl md:text-6xl font-black text-white drop-shadow-lg">
                {currentPuzzle.question}
              </p>
            </div>

            <div className="space-y-4 max-w-md mx-auto">
              <label className="text-xl font-bold text-fun-purple block">
                {t.yourAnswer}:
              </label>
              <Input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                className="h-16 text-3xl text-center font-bold border-4 border-fun-purple transition-all focus:scale-105"
                placeholder="?"
              />
              <Button
                onClick={handleSubmit}
                className="w-full h-16 text-2xl font-black bg-gradient-to-br from-fun-orange to-fun-yellow hover:scale-105 transition-all shadow-xl"
              >
                {t.submit} ✓
              </Button>
            </div>

            <div className="flex justify-center pt-4">
              <img 
                src={puzzleImage}
                alt="Logic Puzzle"
                className="w-64 h-48 object-contain animate-in fade-in duration-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
