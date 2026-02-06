import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Gamepad2, Brain, Sparkles, Palette } from 'lucide-react';
import type { AgeGroup } from '../App';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../lib/translations';

interface HomePageProps {
  selectedAge: AgeGroup;
  onAgeSelect: (age: AgeGroup) => void;
  onNavigate: (page: 'games' | 'quiz' | 'coloring') => void;
}

export default function HomePage({ selectedAge, onAgeSelect, onNavigate }: HomePageProps) {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700">
      {/* Welcome Section */}
      <div className="text-center space-y-4">
        <div className="flex justify-center mb-6">
          <img 
            src="/assets/generated/mascot-character-transparent.dim_200x200.png" 
            alt={t.appName}
            className="w-32 h-32 md:w-40 md:h-40 animate-bounce-slow drop-shadow-2xl"
          />
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white drop-shadow-lg">
          {t.welcome}
        </h1>
        <p className="text-xl md:text-2xl text-white/90 font-semibold">
          {t.welcomeSubtitle}
        </p>
      </div>

      {/* Age Selection */}
      {!selectedAge && (
        <Card className="bg-white/95 backdrop-blur-sm border-4 border-fun-orange shadow-2xl">
          <CardContent className="p-8 md:p-12">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <Sparkles className="w-12 h-12 text-fun-yellow animate-pulse" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-fun-purple">
                {t.howOldAreYou}
              </h2>
              <p className="text-lg md:text-xl text-gray-700">
                {t.selectGamesForYou}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
                <Button
                  size="lg"
                  onClick={() => onAgeSelect('3-5')}
                  className="h-28 md:h-32 text-2xl md:text-3xl font-black bg-gradient-to-br from-fun-pink to-fun-orange hover:scale-105 transition-transform shadow-xl border-4 border-white"
                >
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-4xl md:text-5xl">🎈</span>
                    <span className="text-xl md:text-2xl">{t.age3to5}</span>
                  </div>
                </Button>
                <Button
                  size="lg"
                  onClick={() => onAgeSelect('6-8')}
                  className="h-28 md:h-32 text-2xl md:text-3xl font-black bg-gradient-to-br from-fun-orange to-fun-yellow hover:scale-105 transition-transform shadow-xl border-4 border-white"
                >
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-4xl md:text-5xl">🌟</span>
                    <span className="text-xl md:text-2xl">{t.age6to8}</span>
                  </div>
                </Button>
                <Button
                  size="lg"
                  onClick={() => onAgeSelect('9-12')}
                  className="h-28 md:h-32 text-2xl md:text-3xl font-black bg-gradient-to-br from-fun-blue to-fun-purple hover:scale-105 transition-transform shadow-xl border-4 border-white"
                >
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-4xl md:text-5xl">⭐</span>
                    <span className="text-xl md:text-2xl">{t.age9to12}</span>
                  </div>
                </Button>
                <Button
                  size="lg"
                  onClick={() => onAgeSelect('13-15')}
                  className="h-28 md:h-32 text-2xl md:text-3xl font-black bg-gradient-to-br from-fun-purple to-fun-pink hover:scale-105 transition-transform shadow-xl border-4 border-white"
                >
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-4xl md:text-5xl">🚀</span>
                    <span className="text-xl md:text-2xl">{t.age13to15}</span>
                  </div>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Activity Selection */}
      {selectedAge && (
        <div className="space-y-6 animate-in slide-in-from-bottom duration-500">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
              {t.whatDoYouWantToDo}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Game Zone Card */}
            <Card 
              className="bg-white/95 backdrop-blur-sm border-4 border-fun-orange shadow-2xl hover:scale-105 transition-transform cursor-pointer group"
              onClick={() => onNavigate('games')}
            >
              <CardContent className="p-8 md:p-10">
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="bg-gradient-to-br from-fun-orange to-fun-yellow p-6 rounded-3xl shadow-lg group-hover:animate-bounce">
                      <Gamepad2 className="w-16 h-16 text-white" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-black text-fun-purple">
                    {t.gameZone}
                  </h3>
                  <p className="text-lg text-gray-700">
                    {t.learnWithGames}
                  </p>
                  <div className="pt-4">
                    <img 
                      src="/assets/generated/colorful-shapes.dim_400x300.png"
                      alt={t.gameZone}
                      className="w-full h-32 object-contain"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quiz Zone Card */}
            <Card 
              className="bg-white/95 backdrop-blur-sm border-4 border-fun-blue shadow-2xl hover:scale-105 transition-transform cursor-pointer group"
              onClick={() => onNavigate('quiz')}
            >
              <CardContent className="p-8 md:p-10">
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="bg-gradient-to-br from-fun-blue to-fun-purple p-6 rounded-3xl shadow-lg group-hover:animate-bounce">
                      <Brain className="w-16 h-16 text-white" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-black text-fun-purple">
                    {t.quizZone}
                  </h3>
                  <p className="text-lg text-gray-700">
                    {t.testYourKnowledge}
                  </p>
                  <div className="pt-4">
                    <img 
                      src="/assets/generated/happy-numbers.dim_600x400.png"
                      alt={t.quizZone}
                      className="w-full h-32 object-contain"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Coloring Zone Card */}
            <Card 
              className="bg-white/95 backdrop-blur-sm border-4 border-fun-pink shadow-2xl hover:scale-105 transition-transform cursor-pointer group"
              onClick={() => onNavigate('coloring')}
            >
              <CardContent className="p-8 md:p-10">
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="bg-gradient-to-br from-fun-pink to-fun-purple p-6 rounded-3xl shadow-lg group-hover:animate-bounce">
                      <Palette className="w-16 h-16 text-white" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-black text-fun-purple">
                    {t.coloringZone}
                  </h3>
                  <p className="text-lg text-gray-700">
                    {t.colorAndCreate}
                  </p>
                  <div className="pt-4">
                    <img 
                      src="/assets/generated/simple-cat-outline.dim_400x400.png"
                      alt={t.coloringZone}
                      className="w-full h-32 object-contain"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
