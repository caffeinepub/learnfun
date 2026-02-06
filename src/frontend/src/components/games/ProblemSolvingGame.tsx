import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslation } from '../../lib/translations';
import { useProblemSolvingTasks } from '../../hooks/useQueries';
import { resolveLocalizedText } from '../../lib/localizedText';
import { getFallbackProblem, type ProblemCategory, type AgeGroupKey } from '../../lib/problemSolvingFallback';

interface ProblemSolvingGameProps {
  ageGroup: '3-5' | '6-8' | '9-12' | '13-15';
  onBack: () => void;
  onComplete: (level: number) => void;
}

type Problem = {
  scenario: string;
  options: string[];
  correctOption: string;
  category: ProblemCategory;
};

export default function ProblemSolvingGame({ ageGroup, onBack, onComplete }: ProblemSolvingGameProps) {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const { data: backendProblems } = useProblemSolvingTasks(ageGroup);
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);
  const [score, setScore] = useState(0);
  const [problemsSolved, setProblemsSolved] = useState(0);
  const [category, setCategory] = useState<ProblemCategory>('everyday');
  const totalProblems = 5;

  const generateProblem = (): Problem => {
    return getFallbackProblem(ageGroup as AgeGroupKey, category, language);
  };

  useEffect(() => {
    if (backendProblems && backendProblems.length > 0) {
      const problem = backendProblems[0];
      setCurrentProblem({
        scenario: resolveLocalizedText(problem.scenario, language),
        options: problem.options.map(opt => resolveLocalizedText(opt, language)),
        correctOption: resolveLocalizedText(problem.correctOption, language),
        category: 'everyday',
      });
    } else {
      setCurrentProblem(generateProblem());
    }
  }, [backendProblems, ageGroup, category, language]);

  const handleAnswer = (selectedOption: string) => {
    if (!currentProblem) return;

    const isCorrect = selectedOption === currentProblem.correctOption;
    
    if (isCorrect) {
      toast.success(t.correctAnswer, { duration: 1500 });
      setScore(score + 1);
    } else {
      toast.error(`${t.correctAnswerWas} ${currentProblem.correctOption}`, { duration: 2000 });
    }

    const newProblemsSolved = problemsSolved + 1;
    setProblemsSolved(newProblemsSolved);

    if (newProblemsSolved >= totalProblems) {
      setTimeout(() => onComplete(score + (isCorrect ? 1 : 0)), 1000);
    } else {
      setTimeout(() => {
        setCurrentProblem(generateProblem());
      }, 1500);
    }
  };

  const handleCategoryChange = (cat: ProblemCategory) => {
    setCategory(cat);
    setCurrentProblem(null);
    setTimeout(() => {
      setCurrentProblem(generateProblem());
    }, 100);
  };

  if (!currentProblem) return null;

  const categoryImage = category === 'everyday'
    ? '/assets/generated/home-scenario.dim_500x300.png'
    : category === 'social'
    ? '/assets/generated/social-scenario.dim_500x300.png'
    : category === 'creative'
    ? '/assets/generated/creative-thinking.dim_500x300.png'
    : category === 'teamwork'
    ? '/assets/generated/teamwork-collaboration.dim_500x300.png'
    : '/assets/generated/time-management-scenario.dim_500x300.png';

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
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
          {t.question}: {problemsSolved + 1}/{totalProblems} | {t.score}: {score} 🌟
        </div>
      </div>

      <Card className="bg-white/95 backdrop-blur-sm border-4 border-fun-orange shadow-2xl">
        <CardContent className="p-8 md:p-12">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-black text-fun-purple">
                {t.problemSolving}
              </h2>
              <p className="text-lg md:text-xl text-gray-700 font-semibold">
                {t.chooseWisely}
              </p>
            </div>

            {/* Category Selection */}
            <div className="flex justify-center gap-3 flex-wrap">
              <Button
                onClick={() => handleCategoryChange('everyday')}
                className={`h-12 px-6 text-lg font-bold ${
                  category === 'everyday'
                    ? 'bg-gradient-to-r from-fun-orange to-fun-yellow'
                    : 'bg-gray-300 text-gray-700'
                }`}
              >
                🏠 {t.everyday}
              </Button>
              <Button
                onClick={() => handleCategoryChange('social')}
                className={`h-12 px-6 text-lg font-bold ${
                  category === 'social'
                    ? 'bg-gradient-to-r from-fun-orange to-fun-yellow'
                    : 'bg-gray-300 text-gray-700'
                }`}
              >
                👥 {t.social}
              </Button>
              <Button
                onClick={() => handleCategoryChange('creative')}
                className={`h-12 px-6 text-lg font-bold ${
                  category === 'creative'
                    ? 'bg-gradient-to-r from-fun-orange to-fun-yellow'
                    : 'bg-gray-300 text-gray-700'
                }`}
              >
                🎨 {t.creative}
              </Button>
              {(ageGroup === '9-12' || ageGroup === '13-15') && (
                <>
                  <Button
                    onClick={() => handleCategoryChange('teamwork')}
                    className={`h-12 px-6 text-lg font-bold ${
                      category === 'teamwork'
                        ? 'bg-gradient-to-r from-fun-orange to-fun-yellow'
                        : 'bg-gray-300 text-gray-700'
                    }`}
                  >
                    🤝 {t.teamwork}
                  </Button>
                  <Button
                    onClick={() => handleCategoryChange('timeManagement')}
                    className={`h-12 px-6 text-lg font-bold ${
                      category === 'timeManagement'
                        ? 'bg-gradient-to-r from-fun-orange to-fun-yellow'
                        : 'bg-gray-300 text-gray-700'
                    }`}
                  >
                    ⏰ {t.timeManagement}
                  </Button>
                </>
              )}
            </div>

            <div className="bg-gradient-to-r from-fun-blue to-fun-purple p-8 md:p-10 rounded-3xl shadow-xl">
              <p className="text-2xl md:text-3xl font-bold text-white leading-relaxed">
                {currentProblem.scenario}
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-xl font-bold text-fun-purple">
                {t.selectAnswer}:
              </p>
              {currentProblem.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="w-full h-auto min-h-[4rem] text-xl font-bold bg-gradient-to-br from-fun-yellow to-fun-orange hover:scale-105 transition-transform shadow-xl border-4 border-white p-4"
                >
                  {option}
                </Button>
              ))}
            </div>

            <div className="flex justify-center pt-4">
              <img 
                src={categoryImage}
                alt={t.problemSolving}
                className="w-64 h-48 object-contain"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
