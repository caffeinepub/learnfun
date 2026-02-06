import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslation } from '../../lib/translations';
import { useVisualRecognitionTasks } from '../../hooks/useQueries';

interface VisualRecognitionGameProps {
  ageGroup: '3-5' | '6-8' | '9-12' | '13-15';
  onBack: () => void;
  onComplete: (level: number) => void;
}

type Difference = {
  x: number;
  y: number;
  found: boolean;
};

type SceneType = 'nature' | 'school' | 'animals' | 'forest' | 'ocean' | 'classroom' | 'playground' | 'mountain' | 'city' | 'artStudio' | 'makerSpace';

export default function VisualRecognitionGame({ ageGroup, onBack, onComplete }: VisualRecognitionGameProps) {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const { data: backendTasks } = useVisualRecognitionTasks(ageGroup);
  const [differences, setDifferences] = useState<Difference[]>([]);
  const [foundCount, setFoundCount] = useState(0);
  const [sceneType, setSceneType] = useState<SceneType>('nature');
  const totalDifferences = ageGroup === '3-5' ? 2 : ageGroup === '6-8' ? 3 : ageGroup === '9-12' ? 5 : 7;

  useEffect(() => {
    initializeGame();
  }, [ageGroup, sceneType]);

  const initializeGame = () => {
    const newDifferences: Difference[] = [];
    for (let i = 0; i < totalDifferences; i++) {
      newDifferences.push({
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
        found: false,
      });
    }
    setDifferences(newDifferences);
    setFoundCount(0);
  };

  const handleClick = (clickX: number, clickY: number) => {
    let found = false;
    const newDifferences = differences.map(diff => {
      if (!diff.found) {
        const distance = Math.sqrt(
          Math.pow(clickX - diff.x, 2) + Math.pow(clickY - diff.y, 2)
        );
        if (distance < 8) {
          found = true;
          return { ...diff, found: true };
        }
      }
      return diff;
    });

    if (found) {
      toast.success(t.greatMatch, { duration: 1500 });
      setDifferences(newDifferences);
      const newFoundCount = foundCount + 1;
      setFoundCount(newFoundCount);
      
      if (newFoundCount === totalDifferences) {
        setTimeout(() => onComplete(1), 1000);
      }
    } else {
      toast.error(t.tryAgainShort, { duration: 1000 });
    }
  };

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    handleClick(x, y);
  };

  const handleSceneChange = (scene: SceneType) => {
    setSceneType(scene);
  };

  const getSceneImage = () => {
    switch (sceneType) {
      case 'nature':
        return '/assets/generated/nature-find-differences.dim_600x400.png';
      case 'school':
        return '/assets/generated/school-recognition-scene.dim_600x400.png';
      case 'animals':
        return '/assets/generated/visual-recognition-scene.dim_600x400.png';
      case 'forest':
        return '/assets/generated/forest-landscape.dim_600x400.png';
      case 'ocean':
        return '/assets/generated/ocean-scene.dim_600x400.png';
      case 'classroom':
        return '/assets/generated/classroom-scene.dim_600x400.png';
      case 'playground':
        return '/assets/generated/playground-scene.dim_600x400.png';
      case 'mountain':
        return '/assets/generated/mountain-landscape.dim_600x400.png';
      case 'city':
        return '/assets/generated/city-street-scene.dim_600x400.png';
      case 'artStudio':
        return '/assets/generated/art-studio-scene.dim_600x400.png';
      case 'makerSpace':
        return '/assets/generated/maker-space-scene.dim_600x400.png';
      default:
        return '/assets/generated/visual-recognition-scene.dim_600x400.png';
    }
  };

  const getInstructionText = () => {
    return t.findDifferences;
  };

  const isNatureCategory = ['nature', 'forest', 'ocean', 'mountain'].includes(sceneType);
  const isSchoolCategory = ['school', 'classroom', 'playground'].includes(sceneType);
  const isCityCategory = sceneType === 'city';
  const isCreativeCategory = ['artStudio', 'makerSpace'].includes(sceneType);

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <Button
          onClick={onBack}
          size="lg"
          className="bg-white/90 hover:bg-white text-fun-purple font-bold shadow-lg"
        >
          <ArrowLeft className="w-6 h-6 mr-2" />
          {t.back}
        </Button>
        <div className="text-white text-xl md:text-2xl font-bold bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
          {t.differencesFound}: {foundCount}/{totalDifferences}
        </div>
      </div>

      <Card className="bg-white/95 backdrop-blur-sm border-4 border-fun-green shadow-2xl">
        <CardContent className="p-8">
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-3xl md:text-4xl font-black text-fun-purple">
              {t.visualRecognition}
            </h2>
            <p className="text-lg md:text-xl text-gray-700 font-semibold">
              {getInstructionText()}
            </p>
          </div>

          {/* Main Scene Categories */}
          <div className="flex justify-center gap-3 mb-4 flex-wrap">
            <Button
              onClick={() => handleSceneChange('nature')}
              className={`h-12 px-6 text-lg font-bold ${
                isNatureCategory
                  ? 'bg-gradient-to-r from-fun-orange to-fun-yellow'
                  : 'bg-gray-300 text-gray-700'
              }`}
            >
              🌳 {t.nature}
            </Button>
            <Button
              onClick={() => handleSceneChange('school')}
              className={`h-12 px-6 text-lg font-bold ${
                isSchoolCategory
                  ? 'bg-gradient-to-r from-fun-orange to-fun-yellow'
                  : 'bg-gray-300 text-gray-700'
              }`}
            >
              🏫 {t.school}
            </Button>
            <Button
              onClick={() => handleSceneChange('city')}
              className={`h-12 px-6 text-lg font-bold ${
                isCityCategory
                  ? 'bg-gradient-to-r from-fun-orange to-fun-yellow'
                  : 'bg-gray-300 text-gray-700'
              }`}
            >
              🏙️ {t.city}
            </Button>
            <Button
              onClick={() => handleSceneChange('artStudio')}
              className={`h-12 px-6 text-lg font-bold ${
                isCreativeCategory
                  ? 'bg-gradient-to-r from-fun-orange to-fun-yellow'
                  : 'bg-gray-300 text-gray-700'
              }`}
            >
              🎨 {t.creative}
            </Button>
            <Button
              onClick={() => handleSceneChange('animals')}
              className={`h-12 px-6 text-lg font-bold ${
                sceneType === 'animals'
                  ? 'bg-gradient-to-r from-fun-orange to-fun-yellow'
                  : 'bg-gray-300 text-gray-700'
              }`}
            >
              🐾 {t.animals}
            </Button>
          </div>

          {/* Nature Subcategories */}
          {isNatureCategory && (
            <div className="flex justify-center gap-2 mb-6 flex-wrap">
              <Button
                onClick={() => handleSceneChange('nature')}
                className={`h-10 px-4 text-sm font-bold ${
                  sceneType === 'nature'
                    ? 'bg-gradient-to-r from-fun-green to-fun-blue'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                🌄 {t.landscape}
              </Button>
              <Button
                onClick={() => handleSceneChange('forest')}
                className={`h-10 px-4 text-sm font-bold ${
                  sceneType === 'forest'
                    ? 'bg-gradient-to-r from-fun-green to-fun-blue'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                🌲 {t.forest}
              </Button>
              <Button
                onClick={() => handleSceneChange('ocean')}
                className={`h-10 px-4 text-sm font-bold ${
                  sceneType === 'ocean'
                    ? 'bg-gradient-to-r from-fun-green to-fun-blue'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                🌊 {t.ocean}
              </Button>
              <Button
                onClick={() => handleSceneChange('mountain')}
                className={`h-10 px-4 text-sm font-bold ${
                  sceneType === 'mountain'
                    ? 'bg-gradient-to-r from-fun-green to-fun-blue'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                ⛰️ {t.mountain}
              </Button>
            </div>
          )}

          {/* School Subcategories */}
          {isSchoolCategory && (
            <div className="flex justify-center gap-2 mb-6 flex-wrap">
              <Button
                onClick={() => handleSceneChange('school')}
                className={`h-10 px-4 text-sm font-bold ${
                  sceneType === 'school'
                    ? 'bg-gradient-to-r from-fun-green to-fun-blue'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                🏫 {t.schoolBuilding}
              </Button>
              <Button
                onClick={() => handleSceneChange('classroom')}
                className={`h-10 px-4 text-sm font-bold ${
                  sceneType === 'classroom'
                    ? 'bg-gradient-to-r from-fun-green to-fun-blue'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                📚 {t.classroom}
              </Button>
              <Button
                onClick={() => handleSceneChange('playground')}
                className={`h-10 px-4 text-sm font-bold ${
                  sceneType === 'playground'
                    ? 'bg-gradient-to-r from-fun-green to-fun-blue'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                🎪 {t.playground}
              </Button>
            </div>
          )}

          {/* Creative Subcategories */}
          {isCreativeCategory && (
            <div className="flex justify-center gap-2 mb-6 flex-wrap">
              <Button
                onClick={() => handleSceneChange('artStudio')}
                className={`h-10 px-4 text-sm font-bold ${
                  sceneType === 'artStudio'
                    ? 'bg-gradient-to-r from-fun-green to-fun-blue'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                🎨 {t.artStudio}
              </Button>
              <Button
                onClick={() => handleSceneChange('makerSpace')}
                className={`h-10 px-4 text-sm font-bold ${
                  sceneType === 'makerSpace'
                    ? 'bg-gradient-to-r from-fun-green to-fun-blue'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                🔧 {t.makerSpace}
              </Button>
            </div>
          )}

          <div 
            className="relative w-full aspect-video bg-gradient-to-br from-fun-yellow to-fun-orange rounded-3xl cursor-pointer overflow-hidden"
            onClick={handleImageClick}
          >
            <img 
              src={getSceneImage()}
              alt={t.visualRecognition}
              className="w-full h-full object-cover"
            />
            {differences.map((diff, index) => (
              diff.found && (
                <div
                  key={index}
                  className="absolute w-12 h-12 border-4 border-green-500 rounded-full bg-green-200/50 animate-ping"
                  style={{
                    left: `${diff.x}%`,
                    top: `${diff.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              )
            ))}
          </div>

          <div className="mt-6 text-center">
            <p className="text-lg text-gray-600 font-semibold">
              👆 {getInstructionText()}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
