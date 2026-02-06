import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Trophy } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslation } from '../../lib/translations';
import { useMemoryGames } from '../../hooks/useQueries';
import { playSound } from '../../services/audio';

interface MemoryCardGameProps {
  ageGroup: '3-5' | '6-8' | '9-12' | '13-15';
  onBack: () => void;
  onComplete: (level: number) => void;
}

type MemoryCard = {
  id: string;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
};

const colorTheme = ['🔴', '🟠', '🟡', '🟢', '🔵', '🟣', '🟤', '⚫', '⚪', '🟥', '🟧', '🟨'];
const animalTheme = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮'];
const numberTheme = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟', '🔢', '💯'];
const shapeTheme = ['⭐', '🔷', '🔶', '🔺', '🔻', '⬛', '⬜', '🟨', '🟦', '🟧', '🟪', '🟩'];
const farmAnimalTheme = ['🐄', '🐷', '🐑', '🐔', '🐴', '🦆', '🐓', '🐖', '🐏', '🦃', '🐐', '🦙'];
const wildAnimalTheme = ['🦁', '🐯', '🐻', '🦊', '🐺', '🦝', '🦘', '🦒', '🦓', '🐘', '🦏', '🦛'];
const seaAnimalTheme = ['🐠', '🐟', '🐡', '🦈', '🐙', '🦑', '🐚', '🦀', '🦞', '🐬', '🐳', '🦭'];
const jungleAnimalTheme = ['🦍', '🐒', '🦧', '🐆', '🦜', '🦩', '🐍', '🦎', '🐊', '🦥', '🦨', '🐅'];
const arcticAnimalTheme = ['🐧', '🦭', '🐻‍❄️', '🦌', '🦊', '🐺', '🦉', '🦅', '🐋', '🦈', '🐟', '🦦'];
const desertAnimalTheme = ['🐪', '🦎', '🐍', '🦂', '🦅', '🦉', '🐀', '🦔', '🦘', '🐫', '🦙', '🐁'];
const prehistoricAnimalTheme = ['🦕', '🦖', '🦣', '🦴', '🐉', '🦎', '🐊', '🦈', '🐢', '🦂', '🕷️', '🦗'];
const mythicalCreatureTheme = ['🐉', '🦄', '🧚', '🧜', '🧞', '🧛', '🧙', '👻', '👽', '🤖', '🦸', '🦹'];
const petAnimalTheme = ['🐶', '🐱', '🐭', '🐹', '🐰', '🐦', '🐠', '🐢', '🦎', '🐍', '🦜', '🦔'];
const spaceAnimalTheme = ['👽', '🛸', '🚀', '🌟', '⭐', '🌙', '☄️', '🪐', '🌍', '🌌', '🛰️', '👾'];
const householdItemTheme = ['🪑', '🛋️', '🛏️', '🚪', '🪟', '💡', '🕯️', '🧹', '🧺', '🧴', '🧻', '🧼'];
const vehicleTheme = ['🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚐', '🛻', '🚚'];
const letterTheme = ['🅰️', '🅱️', '🆎', '🅾️', '🆑', '🆒', '🆓', '🆕', '🆗', '🆙', '🆚', '🈁'];
const musicTheme = ['🎵', '🎶', '🎼', '🎹', '🎸', '🎺', '🎷', '🥁', '🎻', '🪕', '🪘', '🎤'];
const spaceObjectTheme = ['🚀', '🛸', '🛰️', '🌟', '⭐', '🌙', '☄️', '🪐', '🌍', '🌌', '👽', '👾'];
const seasonalItemTheme = ['☀️', '🌸', '🍂', '❄️', '🌺', '🍁', '⛄', '🌻', '🌷', '🍃', '🌞', '🌨️'];
const professionalToolTheme = ['🔨', '🔧', '🩺', '📚', '🎨', '🍳', '🔬', '💻', '📐', '✏️', '🧪', '🎭'];
// NEW THEMES
const spaceAdventureTheme = ['🚀', '👨‍🚀', '👩‍🚀', '🛸', '🪐', '🌟', '🛰️', '🌙', '☄️', '🌌', '👽', '🔭'];
const springGardenTheme = ['🌸', '🌺', '🌷', '🌻', '🦋', '🐝', '🌱', '🌿', '☀️', '🌈', '🐛', '🌼'];
const summerBeachTheme = ['🏖️', '🌊', '🏄', '🏊', '⛱️', '🩱', '🕶️', '🍉', '🍦', '☀️', '🐚', '🦀'];
const autumnForestTheme = ['🍂', '🍁', '🌰', '🦔', '🦊', '🍄', '🌲', '🦌', '🐿️', '🍃', '🎃', '🦃'];
const winterWonderlandTheme = ['❄️', '⛄', '🎿', '⛷️', '🏂', '🧊', '🎅', '🤶', '🎁', '🔔', '🕯️', '🌨️'];
const worldMonumentsTheme = ['🗼', '🗽', '🗿', '🕌', '⛩️', '🏛️', '🏰', '🕍', '⛪', '🏯', '🗻', '🌉'];
const culturalSymbolsTheme = ['🎭', '🎨', '🎪', '🎬', '🎤', '🎧', '🎼', '🎹', '🎺', '🎸', '🥁', '🎻'];

type ThemeType = 'colors' | 'animals' | 'numbers' | 'shapes' | 'farm' | 'wild' | 'sea' | 'jungle' | 'arctic' | 'desert' | 'prehistoric' | 'mythical' | 'pets' | 'spaceAnimals' | 'household' | 'vehicles' | 'letters' | 'music' | 'spaceObjects' | 'seasonalItems' | 'professionalTools' | 'spaceAdventure' | 'springGarden' | 'summerBeach' | 'autumnForest' | 'winterWonderland' | 'worldMonuments' | 'culturalSymbols';

export default function MemoryCardGame({ ageGroup, onBack, onComplete }: MemoryCardGameProps) {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const { data: backendGames } = useMemoryGames(ageGroup);
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [pairsFound, setPairsFound] = useState(0);
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('animals');
  const [difficulty, setDifficulty] = useState(1);
  const [currentLevel, setCurrentLevel] = useState(1);

  useEffect(() => {
    initializeGame();
  }, [ageGroup, currentTheme, difficulty]);

  const getThemeContent = () => {
    switch (currentTheme) {
      case 'colors': return colorTheme;
      case 'animals': return animalTheme;
      case 'numbers': return numberTheme;
      case 'shapes': return shapeTheme;
      case 'farm': return farmAnimalTheme;
      case 'wild': return wildAnimalTheme;
      case 'sea': return seaAnimalTheme;
      case 'jungle': return jungleAnimalTheme;
      case 'arctic': return arcticAnimalTheme;
      case 'desert': return desertAnimalTheme;
      case 'prehistoric': return prehistoricAnimalTheme;
      case 'mythical': return mythicalCreatureTheme;
      case 'pets': return petAnimalTheme;
      case 'spaceAnimals': return spaceAnimalTheme;
      case 'household': return householdItemTheme;
      case 'vehicles': return vehicleTheme;
      case 'letters': return letterTheme;
      case 'music': return musicTheme;
      case 'spaceObjects': return spaceObjectTheme;
      case 'seasonalItems': return seasonalItemTheme;
      case 'professionalTools': return professionalToolTheme;
      case 'spaceAdventure': return spaceAdventureTheme;
      case 'springGarden': return springGardenTheme;
      case 'summerBeach': return summerBeachTheme;
      case 'autumnForest': return autumnForestTheme;
      case 'winterWonderland': return winterWonderlandTheme;
      case 'worldMonuments': return worldMonumentsTheme;
      case 'culturalSymbols': return culturalSymbolsTheme;
      default: return animalTheme;
    }
  };

  const initializeGame = () => {
    const pairCount = ageGroup === '3-5' ? 4 : ageGroup === '6-8' ? (difficulty === 1 ? 6 : 8) : ageGroup === '9-12' ? (difficulty === 1 ? 8 : difficulty === 2 ? 10 : 12) : (difficulty === 1 ? 10 : difficulty === 2 ? 12 : 14);
    const themeContent = getThemeContent();
    const selectedContent = themeContent.slice(0, pairCount);
    
    const cardPairs = selectedContent.flatMap((content, index) => [
      { id: `${index}-a`, content, isFlipped: false, isMatched: false },
      { id: `${index}-b`, content, isFlipped: false, isMatched: false },
    ]);
    const shuffled = cardPairs.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setPairsFound(0);
  };

  const handleCardClick = (cardId: string) => {
    if (flippedCards.length === 2) return;
    
    const card = cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    // Play card flip sound
    playSound('card_flip');

    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);
    
    setCards(cards.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    ));

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      const [firstId, secondId] = newFlipped;
      const firstCard = cards.find(c => c.id === firstId);
      const secondCard = cards.find(c => c.id === secondId);

      if (firstCard && secondCard && firstCard.content === secondCard.content) {
        playSound('match_success');
        toast.success(t.greatMatch, { duration: 1500 });
        setCards(cards.map(c => 
          c.id === firstId || c.id === secondId ? { ...c, isMatched: true } : c
        ));
        setFlippedCards([]);
        
        const newPairsFound = pairsFound + 1;
        setPairsFound(newPairsFound);
        
        const totalPairs = ageGroup === '3-5' ? 4 : ageGroup === '6-8' ? (difficulty === 1 ? 6 : 8) : ageGroup === '9-12' ? (difficulty === 1 ? 8 : difficulty === 2 ? 10 : 12) : (difficulty === 1 ? 10 : difficulty === 2 ? 12 : 14);
        if (newPairsFound === totalPairs) {
          setTimeout(() => {
            playSound('level_complete');
            toast.success(`${t.levelComplete} 🎉`, { duration: 2000 });
            onComplete(currentLevel);
          }, 1000);
        }
      } else {
        playSound('match_fail');
        toast.error(t.tryAgainShort, { duration: 1500 });
        setTimeout(() => {
          setCards(cards.map(c => 
            c.id === firstId || c.id === secondId ? { ...c, isFlipped: false } : c
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const handleThemeChange = (theme: ThemeType) => {
    setCurrentTheme(theme);
  };

  const handleDifficultyChange = (diff: number) => {
    setDifficulty(diff);
    setCurrentLevel(diff);
  };

  const totalPairs = ageGroup === '3-5' ? 4 : ageGroup === '6-8' ? (difficulty === 1 ? 6 : 8) : ageGroup === '9-12' ? (difficulty === 1 ? 8 : difficulty === 2 ? 10 : 12) : (difficulty === 1 ? 10 : difficulty === 2 ? 12 : 14);
  const gridCols = ageGroup === '3-5' ? 'grid-cols-4' : ageGroup === '6-8' 
    ? (difficulty === 1 ? 'grid-cols-4' : 'grid-cols-4') 
    : ageGroup === '9-12' ? (difficulty === 1 ? 'grid-cols-4' : difficulty === 2 ? 'grid-cols-5' : 'grid-cols-6') : (difficulty === 1 ? 'grid-cols-5' : difficulty === 2 ? 'grid-cols-6' : 'grid-cols-7');

  const isAnimalCategory = ['animals', 'farm', 'wild', 'sea', 'jungle', 'arctic', 'desert', 'prehistoric', 'mythical', 'pets', 'spaceAnimals'].includes(currentTheme);
  const isSpaceCategory = ['spaceObjects', 'spaceAdventure'].includes(currentTheme);
  const isSeasonalCategory = ['seasonalItems', 'springGarden', 'summerBeach', 'autumnForest', 'winterWonderland'].includes(currentTheme);
  const isCulturalCategory = ['worldMonuments', 'culturalSymbols'].includes(currentTheme);

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
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
            {t.moves}: {moves}
          </div>
          <div className="text-white text-xl md:text-2xl font-bold bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
            {t.pairsFound}: {pairsFound}/{totalPairs}
          </div>
        </div>
      </div>

      <Card className="bg-white/95 backdrop-blur-sm border-4 border-fun-blue shadow-2xl">
        <CardContent className="p-8">
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-3xl md:text-4xl font-black text-fun-purple">
              {t.memoryGame}
            </h2>
            <p className="text-lg md:text-xl text-gray-700 font-semibold">
              {t.findPairs}
            </p>
          </div>

          {/* Main Theme Selection */}
          <div className="flex justify-center gap-2 mb-6 flex-wrap">
            <Button
              onClick={() => handleThemeChange('colors')}
              className={`h-12 px-4 text-base font-bold transition-all ${
                currentTheme === 'colors'
                  ? 'bg-gradient-to-r from-fun-orange to-fun-yellow scale-105'
                  : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
              }`}
            >
              🎨 {t.colors}
            </Button>
            <Button
              onClick={() => handleThemeChange('animals')}
              className={`h-12 px-4 text-base font-bold transition-all ${
                isAnimalCategory
                  ? 'bg-gradient-to-r from-fun-orange to-fun-yellow scale-105'
                  : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
              }`}
            >
              🐾 {t.animals}
            </Button>
            <Button
              onClick={() => handleThemeChange('numbers')}
              className={`h-12 px-4 text-base font-bold transition-all ${
                currentTheme === 'numbers'
                  ? 'bg-gradient-to-r from-fun-orange to-fun-yellow scale-105'
                  : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
              }`}
            >
              🔢 {t.numbers}
            </Button>
            <Button
              onClick={() => handleThemeChange('shapes')}
              className={`h-12 px-4 text-base font-bold transition-all ${
                currentTheme === 'shapes'
                  ? 'bg-gradient-to-r from-fun-orange to-fun-yellow scale-105'
                  : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
              }`}
            >
              ⭐ {t.shapes}
            </Button>
            <Button
              onClick={() => handleThemeChange('spaceAdventure')}
              className={`h-12 px-4 text-base font-bold transition-all ${
                isSpaceCategory
                  ? 'bg-gradient-to-r from-fun-orange to-fun-yellow scale-105'
                  : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
              }`}
            >
              🚀 {t.spaceAdventures}
            </Button>
            <Button
              onClick={() => handleThemeChange('springGarden')}
              className={`h-12 px-4 text-base font-bold transition-all ${
                isSeasonalCategory
                  ? 'bg-gradient-to-r from-fun-orange to-fun-yellow scale-105'
                  : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
              }`}
            >
              🌸 {t.seasonalScenes}
            </Button>
            <Button
              onClick={() => handleThemeChange('worldMonuments')}
              className={`h-12 px-4 text-base font-bold transition-all ${
                isCulturalCategory
                  ? 'bg-gradient-to-r from-fun-orange to-fun-yellow scale-105'
                  : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
              }`}
            >
              🗼 {t.culturalLandmarks}
            </Button>
            <Button
              onClick={() => handleThemeChange('household')}
              className={`h-12 px-4 text-base font-bold transition-all ${
                currentTheme === 'household'
                  ? 'bg-gradient-to-r from-fun-orange to-fun-yellow scale-105'
                  : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
              }`}
            >
              🏠 {t.householdItems}
            </Button>
            <Button
              onClick={() => handleThemeChange('vehicles')}
              className={`h-12 px-4 text-base font-bold transition-all ${
                currentTheme === 'vehicles'
                  ? 'bg-gradient-to-r from-fun-orange to-fun-yellow scale-105'
                  : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
              }`}
            >
              🚗 {t.vehicles}
            </Button>
            <Button
              onClick={() => handleThemeChange('letters')}
              className={`h-12 px-4 text-base font-bold transition-all ${
                currentTheme === 'letters'
                  ? 'bg-gradient-to-r from-fun-orange to-fun-yellow scale-105'
                  : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
              }`}
            >
              🅰️ {t.letters}
            </Button>
            <Button
              onClick={() => handleThemeChange('music')}
              className={`h-12 px-4 text-base font-bold transition-all ${
                currentTheme === 'music'
                  ? 'bg-gradient-to-r from-fun-orange to-fun-yellow scale-105'
                  : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
              }`}
            >
              🎵 {t.music}
            </Button>
            <Button
              onClick={() => handleThemeChange('professionalTools')}
              className={`h-12 px-4 text-base font-bold transition-all ${
                currentTheme === 'professionalTools'
                  ? 'bg-gradient-to-r from-fun-orange to-fun-yellow scale-105'
                  : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
              }`}
            >
              🔧 {t.professionalTools}
            </Button>
          </div>

          {/* Animal Subcategories */}
          {isAnimalCategory && (
            <div className="flex justify-center gap-2 mb-6 flex-wrap">
              <Button
                onClick={() => handleThemeChange('farm')}
                className={`h-10 px-4 text-sm font-bold transition-all ${
                  currentTheme === 'farm'
                    ? 'bg-gradient-to-r from-fun-green to-fun-blue scale-105'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                🐄 {t.farmAnimals}
              </Button>
              <Button
                onClick={() => handleThemeChange('wild')}
                className={`h-10 px-4 text-sm font-bold transition-all ${
                  currentTheme === 'wild'
                    ? 'bg-gradient-to-r from-fun-green to-fun-blue scale-105'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                🦁 {t.wildAnimals}
              </Button>
              <Button
                onClick={() => handleThemeChange('sea')}
                className={`h-10 px-4 text-sm font-bold transition-all ${
                  currentTheme === 'sea'
                    ? 'bg-gradient-to-r from-fun-green to-fun-blue scale-105'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                🐠 {t.seaAnimals}
              </Button>
              <Button
                onClick={() => handleThemeChange('jungle')}
                className={`h-10 px-4 text-sm font-bold transition-all ${
                  currentTheme === 'jungle'
                    ? 'bg-gradient-to-r from-fun-green to-fun-blue scale-105'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                🦍 {t.jungleAnimals}
              </Button>
              <Button
                onClick={() => handleThemeChange('arctic')}
                className={`h-10 px-4 text-sm font-bold transition-all ${
                  currentTheme === 'arctic'
                    ? 'bg-gradient-to-r from-fun-green to-fun-blue scale-105'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                🐧 {t.arcticAnimals}
              </Button>
              <Button
                onClick={() => handleThemeChange('desert')}
                className={`h-10 px-4 text-sm font-bold transition-all ${
                  currentTheme === 'desert'
                    ? 'bg-gradient-to-r from-fun-green to-fun-blue scale-105'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                🐪 {t.desertAnimals}
              </Button>
              <Button
                onClick={() => handleThemeChange('prehistoric')}
                className={`h-10 px-4 text-sm font-bold transition-all ${
                  currentTheme === 'prehistoric'
                    ? 'bg-gradient-to-r from-fun-green to-fun-blue scale-105'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                🦕 {t.prehistoricAnimals}
              </Button>
              <Button
                onClick={() => handleThemeChange('mythical')}
                className={`h-10 px-4 text-sm font-bold transition-all ${
                  currentTheme === 'mythical'
                    ? 'bg-gradient-to-r from-fun-green to-fun-blue scale-105'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                🐉 {t.mythicalCreatures}
              </Button>
              <Button
                onClick={() => handleThemeChange('pets')}
                className={`h-10 px-4 text-sm font-bold transition-all ${
                  currentTheme === 'pets'
                    ? 'bg-gradient-to-r from-fun-green to-fun-blue scale-105'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                🐶 {t.petAnimals}
              </Button>
              <Button
                onClick={() => handleThemeChange('spaceAnimals')}
                className={`h-10 px-4 text-sm font-bold transition-all ${
                  currentTheme === 'spaceAnimals'
                    ? 'bg-gradient-to-r from-fun-green to-fun-blue scale-105'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                👽 {t.spaceAnimals}
              </Button>
            </div>
          )}

          {/* Space Subcategories */}
          {isSpaceCategory && (
            <div className="flex justify-center gap-2 mb-6 flex-wrap">
              <Button
                onClick={() => handleThemeChange('spaceObjects')}
                className={`h-10 px-4 text-sm font-bold transition-all ${
                  currentTheme === 'spaceObjects'
                    ? 'bg-gradient-to-r from-fun-green to-fun-blue scale-105'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                🛰️ {t.spaceObjects}
              </Button>
              <Button
                onClick={() => handleThemeChange('spaceAdventure')}
                className={`h-10 px-4 text-sm font-bold transition-all ${
                  currentTheme === 'spaceAdventure'
                    ? 'bg-gradient-to-r from-fun-green to-fun-blue scale-105'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                👨‍🚀 {t.astronauts}
              </Button>
            </div>
          )}

          {/* Seasonal Subcategories */}
          {isSeasonalCategory && (
            <div className="flex justify-center gap-2 mb-6 flex-wrap">
              <Button
                onClick={() => handleThemeChange('springGarden')}
                className={`h-10 px-4 text-sm font-bold transition-all ${
                  currentTheme === 'springGarden'
                    ? 'bg-gradient-to-r from-fun-green to-fun-blue scale-105'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                🌸 {t.springGarden}
              </Button>
              <Button
                onClick={() => handleThemeChange('summerBeach')}
                className={`h-10 px-4 text-sm font-bold transition-all ${
                  currentTheme === 'summerBeach'
                    ? 'bg-gradient-to-r from-fun-green to-fun-blue scale-105'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                🏖️ {t.summerBeach}
              </Button>
              <Button
                onClick={() => handleThemeChange('autumnForest')}
                className={`h-10 px-4 text-sm font-bold transition-all ${
                  currentTheme === 'autumnForest'
                    ? 'bg-gradient-to-r from-fun-green to-fun-blue scale-105'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                🍂 {t.autumnForest}
              </Button>
              <Button
                onClick={() => handleThemeChange('winterWonderland')}
                className={`h-10 px-4 text-sm font-bold transition-all ${
                  currentTheme === 'winterWonderland'
                    ? 'bg-gradient-to-r from-fun-green to-fun-blue scale-105'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                ❄️ {t.winterWonderland}
              </Button>
              <Button
                onClick={() => handleThemeChange('seasonalItems')}
                className={`h-10 px-4 text-sm font-bold transition-all ${
                  currentTheme === 'seasonalItems'
                    ? 'bg-gradient-to-r from-fun-green to-fun-blue scale-105'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                ☀️ {t.seasonalItems}
              </Button>
            </div>
          )}

          {/* Cultural Subcategories */}
          {isCulturalCategory && (
            <div className="flex justify-center gap-2 mb-6 flex-wrap">
              <Button
                onClick={() => handleThemeChange('worldMonuments')}
                className={`h-10 px-4 text-sm font-bold transition-all ${
                  currentTheme === 'worldMonuments'
                    ? 'bg-gradient-to-r from-fun-green to-fun-blue scale-105'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                🗼 {t.worldMonuments}
              </Button>
              <Button
                onClick={() => handleThemeChange('culturalSymbols')}
                className={`h-10 px-4 text-sm font-bold transition-all ${
                  currentTheme === 'culturalSymbols'
                    ? 'bg-gradient-to-r from-fun-green to-fun-blue scale-105'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                🎭 {t.culturalSymbols}
              </Button>
            </div>
          )}

          {/* Difficulty Selection */}
          {ageGroup !== '3-5' && (
            <div className="flex justify-center gap-3 mb-6 flex-wrap">
              <Button
                onClick={() => handleDifficultyChange(1)}
                className={`h-10 px-5 text-base font-bold transition-all ${
                  difficulty === 1
                    ? 'bg-gradient-to-r from-fun-blue to-fun-purple scale-105'
                    : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                }`}
              >
                ⭐ {t.easy}
              </Button>
              <Button
                onClick={() => handleDifficultyChange(2)}
                className={`h-10 px-5 text-base font-bold transition-all ${
                  difficulty === 2
                    ? 'bg-gradient-to-r from-fun-blue to-fun-purple scale-105'
                    : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                }`}
              >
                ⭐⭐ {ageGroup === '6-8' ? t.hard : t.medium}
              </Button>
              {(ageGroup === '9-12' || ageGroup === '13-15') && (
                <Button
                  onClick={() => handleDifficultyChange(3)}
                  className={`h-10 px-5 text-base font-bold transition-all ${
                    difficulty === 3
                      ? 'bg-gradient-to-r from-fun-blue to-fun-purple scale-105'
                      : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                  }`}
                >
                  ⭐⭐⭐ {t.expert}
                </Button>
              )}
            </div>
          )}

          <div className={`grid ${gridCols} gap-4`}>
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                disabled={card.isMatched}
                className={`
                  aspect-square rounded-2xl border-4 transition-all duration-300 text-5xl md:text-6xl
                  ${card.isMatched ? 'bg-green-100 border-green-400 opacity-50 scale-95' : 
                    card.isFlipped ? 'bg-white border-fun-yellow scale-105' : 
                    'bg-gradient-to-br from-fun-blue to-fun-purple border-fun-purple hover:scale-105'}
                  ${card.isFlipped ? 'shadow-2xl' : 'shadow-lg'}
                `}
              >
                {card.isFlipped || card.isMatched ? card.content : '❓'}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
