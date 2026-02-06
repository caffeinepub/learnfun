import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { useGames } from '../hooks/useQueries';
import ShapeMatchingGame from '../components/games/ShapeMatchingGame';
import MathPuzzleGame from '../components/games/MathPuzzleGame';
import MemoryCardGame from '../components/games/MemoryCardGame';
import LogicPuzzleGame from '../components/games/LogicPuzzleGame';
import VisualRecognitionGame from '../components/games/VisualRecognitionGame';
import ProblemSolvingGame from '../components/games/ProblemSolvingGame';
import SortingClassificationGame from '../components/games/SortingClassificationGame';
import QuickReactionTapGame from '../components/games/QuickReactionTapGame';
import CelebrationModal from '../components/CelebrationModal';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../lib/translations';
import { getDailySurpriseGame } from '../lib/dailySurprise';

interface GameZoneProps {
  ageGroup: '3-5' | '6-8' | '9-12' | '13-15';
  onBack: () => void;
}

type GameType = 'shape-matching' | 'math-puzzle' | 'memory-card' | 'logic-puzzle' | 'visual-recognition' | 'problem-solving' | 'sorting-classification' | 'quick-reaction-tap';

export default function GameZone({ ageGroup, onBack }: GameZoneProps) {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const { data: games, isLoading } = useGames(ageGroup);
  const [selectedGame, setSelectedGame] = useState<GameType | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [completedLevel, setCompletedLevel] = useState(1);
  const [restartTrigger, setRestartTrigger] = useState(0);

  const dailySurpriseGame = getDailySurpriseGame(ageGroup);

  const handleGameComplete = (level: number) => {
    setCompletedLevel(level);
    setShowCelebration(true);
  };

  const handleCelebrationClose = () => {
    setShowCelebration(false);
    setSelectedGame(null);
  };

  const handleContinue = () => {
    setShowCelebration(false);
    setRestartTrigger(prev => prev + 1);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-8 border-fun-orange border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-2xl font-bold text-white">{t.gamesLoading}</p>
        </div>
      </div>
    );
  }

  if (selectedGame === 'shape-matching') {
    return (
      <>
        <ShapeMatchingGame 
          ageGroup={ageGroup} 
          onBack={() => setSelectedGame(null)}
          onComplete={handleGameComplete}
          restartTrigger={restartTrigger}
        />
        <CelebrationModal 
          isOpen={showCelebration}
          onClose={handleCelebrationClose}
          onContinue={handleContinue}
          level={completedLevel}
        />
      </>
    );
  }

  if (selectedGame === 'math-puzzle') {
    return (
      <>
        <MathPuzzleGame 
          ageGroup={ageGroup} 
          onBack={() => setSelectedGame(null)}
          onComplete={handleGameComplete}
          restartTrigger={restartTrigger}
        />
        <CelebrationModal 
          isOpen={showCelebration}
          onClose={handleCelebrationClose}
          onContinue={handleContinue}
          level={completedLevel}
        />
      </>
    );
  }

  if (selectedGame === 'memory-card') {
    return (
      <>
        <MemoryCardGame 
          ageGroup={ageGroup} 
          onBack={() => setSelectedGame(null)}
          onComplete={handleGameComplete}
        />
        <CelebrationModal 
          isOpen={showCelebration}
          onClose={handleCelebrationClose}
          level={completedLevel}
        />
      </>
    );
  }

  if (selectedGame === 'logic-puzzle') {
    return (
      <>
        <LogicPuzzleGame 
          ageGroup={ageGroup} 
          onBack={() => setSelectedGame(null)}
          onComplete={handleGameComplete}
        />
        <CelebrationModal 
          isOpen={showCelebration}
          onClose={handleCelebrationClose}
          level={completedLevel}
        />
      </>
    );
  }

  if (selectedGame === 'visual-recognition') {
    return (
      <>
        <VisualRecognitionGame 
          ageGroup={ageGroup} 
          onBack={() => setSelectedGame(null)}
          onComplete={handleGameComplete}
        />
        <CelebrationModal 
          isOpen={showCelebration}
          onClose={handleCelebrationClose}
          level={completedLevel}
        />
      </>
    );
  }

  if (selectedGame === 'problem-solving') {
    return (
      <>
        <ProblemSolvingGame 
          ageGroup={ageGroup} 
          onBack={() => setSelectedGame(null)}
          onComplete={handleGameComplete}
        />
        <CelebrationModal 
          isOpen={showCelebration}
          onClose={handleCelebrationClose}
          level={completedLevel}
        />
      </>
    );
  }

  if (selectedGame === 'sorting-classification') {
    return (
      <>
        <SortingClassificationGame 
          ageGroup={ageGroup} 
          onBack={() => setSelectedGame(null)}
          onComplete={handleGameComplete}
          restartTrigger={restartTrigger}
        />
        <CelebrationModal 
          isOpen={showCelebration}
          onClose={handleCelebrationClose}
          onContinue={handleContinue}
          level={completedLevel}
        />
      </>
    );
  }

  if (selectedGame === 'quick-reaction-tap') {
    return (
      <>
        <QuickReactionTapGame 
          ageGroup={ageGroup} 
          onBack={() => setSelectedGame(null)}
          onComplete={handleGameComplete}
          restartTrigger={restartTrigger}
        />
        <CelebrationModal 
          isOpen={showCelebration}
          onClose={handleCelebrationClose}
          onContinue={handleContinue}
          level={completedLevel}
        />
      </>
    );
  }

  const gamesList = [
    { id: 'shape-matching', name: games?.[0]?.name || t.shapeMatching, description: games?.[0]?.description || t.findMatchingShapes, image: '/assets/generated/colorful-shapes.dim_400x300.png' },
    { id: 'math-puzzle', name: t.colorfulMath, description: t.solveAndFind, image: '/assets/generated/happy-numbers.dim_600x400.png' },
    { id: 'memory-card', name: t.memoryGame, description: t.memoryGameDesc, image: '/assets/generated/memory-cards.dim_400x300.png' },
    { id: 'logic-puzzle', name: t.logicPuzzle, description: t.logicPuzzleDesc, image: '/assets/generated/logic-puzzle-pieces.dim_400x300.png' },
    { id: 'visual-recognition', name: t.visualRecognition, description: t.visualRecognitionDesc, image: '/assets/generated/visual-recognition-scene.dim_600x400.png' },
    { id: 'problem-solving', name: t.problemSolving, description: t.problemSolvingDesc, image: '/assets/generated/problem-solving-scene.dim_500x300.png' },
    { id: 'sorting-classification', name: t.sortingGame, description: t.sortingGameDesc, image: '/assets/generated/sorting-classification-game-card.dim_600x400.png' },
    { id: 'quick-reaction-tap', name: t.reactionGame, description: t.reactionGameDesc, image: '/assets/generated/quick-reaction-tap-game-card.dim_600x400.png' },
  ];

  const dailySurpriseGameData = gamesList.find(g => g.id === dailySurpriseGame);

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <Button
          onClick={onBack}
          size="lg"
          className="bg-white/90 hover:bg-white text-fun-purple font-bold shadow-lg"
        >
          <ArrowLeft className="w-6 h-6 mr-2" />
          {t.back}
        </Button>
        <h1 className="text-3xl md:text-5xl font-black text-white drop-shadow-lg">
          🎮 {t.gameZone}
        </h1>
      </div>

      {dailySurpriseGameData && (
        <Card className="bg-gradient-to-r from-fun-yellow via-fun-orange to-fun-pink border-4 border-white shadow-2xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center animate-pulse">
                  <Sparkles className="w-12 h-12 text-fun-orange" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
                  ✨ {t.dailySurpriseTitle}
                </h2>
                <p className="text-lg text-white/90 font-semibold mb-1">
                  {t.dailySurpriseSubtitle}
                </p>
                <p className="text-xl font-bold text-white">
                  {dailySurpriseGameData.name}
                </p>
              </div>
              <div className="flex-shrink-0">
                <Button
                  onClick={() => setSelectedGame(dailySurpriseGame)}
                  size="lg"
                  className="h-14 px-8 text-xl font-bold bg-white text-fun-purple hover:bg-white/90 shadow-xl"
                >
                  {t.dailySurprisePlay}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gamesList.map((game) => (
          <Card 
            key={game.id}
            className="bg-white/95 backdrop-blur-sm border-4 border-fun-orange shadow-2xl hover:scale-105 transition-transform cursor-pointer group"
            onClick={() => setSelectedGame(game.id as GameType)}
          >
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl font-black text-fun-purple text-center">
                {game.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg text-center text-gray-700 font-semibold">
                {game.description}
              </p>
              <div className="flex justify-center">
                <img 
                  src={game.image}
                  alt={game.name}
                  className="w-full h-40 object-contain group-hover:scale-110 transition-transform"
                />
              </div>
              <Button 
                className="w-full h-14 text-xl font-bold bg-gradient-to-r from-fun-orange to-fun-yellow hover:shadow-xl"
              >
                {t.play}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
