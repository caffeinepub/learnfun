import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import { useQuizQuestions } from '../hooks/useQueries';
import { Progress } from '@/components/ui/progress';
import CelebrationModal from '../components/CelebrationModal';
import { toast } from 'sonner';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../lib/translations';

interface QuizZoneProps {
  ageGroup: '3-5' | '6-8' | '9-12' | '13-15';
  onBack: () => void;
}

type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: string;
};

export default function QuizZone({ ageGroup, onBack }: QuizZoneProps) {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const { data: backendQuestions, isLoading } = useQuizQuestions(ageGroup);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  // Generate fallback quiz questions based on age group and language
  const generateQuizQuestions = (): QuizQuestion[] => {
    const quizData = {
      tr: {
        '3-5': [
          { question: 'Hangi hayvan miyavlar?', options: ['Kedi', 'Köpek', 'Kuş'], correctAnswer: 'Kedi' },
          { question: 'Kaç tane parmağın var?', options: ['5', '10', '20'], correctAnswer: '10' },
          { question: 'Güneş hangi renktir?', options: ['Sarı', 'Mavi', 'Yeşil'], correctAnswer: 'Sarı' },
          { question: 'Hangi şekil yuvarlaktır?', options: ['Daire', 'Kare', 'Üçgen'], correctAnswer: 'Daire' },
          { question: 'Hangi hayvan havlar?', options: ['Köpek', 'Kedi', 'Kuş'], correctAnswer: 'Köpek' },
        ],
        '6-8': [
          { question: '5 + 3 = ?', options: ['7', '8', '9'], correctAnswer: '8' },
          { question: 'Bir haftada kaç gün var?', options: ['5', '6', '7'], correctAnswer: '7' },
          { question: 'Hangi mevsim en sıcaktır?', options: ['Yaz', 'Kış', 'Sonbahar'], correctAnswer: 'Yaz' },
          { question: '10 - 4 = ?', options: ['5', '6', '7'], correctAnswer: '6' },
          { question: 'Hangi hayvan denizde yaşar?', options: ['Balık', 'Kedi', 'Köpek'], correctAnswer: 'Balık' },
          { question: 'Bir günde kaç saat var?', options: ['12', '24', '48'], correctAnswer: '24' },
        ],
        '9-12': [
          { question: '12 × 3 = ?', options: ['34', '36', '38'], correctAnswer: '36' },
          { question: 'Türkiye\'nin başkenti neresidir?', options: ['İstanbul', 'Ankara', 'İzmir'], correctAnswer: 'Ankara' },
          { question: '50 ÷ 5 = ?', options: ['8', '10', '12'], correctAnswer: '10' },
          { question: 'Bir yılda kaç ay var?', options: ['10', '11', '12'], correctAnswer: '12' },
          { question: 'Hangi gezegen Güneş\'e en yakındır?', options: ['Merkür', 'Venüs', 'Dünya'], correctAnswer: 'Merkür' },
          { question: '15 + 27 = ?', options: ['40', '42', '44'], correctAnswer: '42' },
        ],
        '13-15': [
          { question: '144 ÷ 12 = ?', options: ['10', '11', '12'], correctAnswer: '12' },
          { question: 'Hangi element su molekülünde bulunur?', options: ['Hidrojen', 'Karbon', 'Azot'], correctAnswer: 'Hidrojen' },
          { question: '2³ = ?', options: ['6', '8', '9'], correctAnswer: '8' },
          { question: 'Fotosent hangi organelde gerçekleşir?', options: ['Kloroplast', 'Mitokondri', 'Ribozom'], correctAnswer: 'Kloroplast' },
          { question: '√64 = ?', options: ['6', '7', '8'], correctAnswer: '8' },
          { question: 'Hangi yıl Cumhuriyet ilan edildi?', options: ['1920', '1923', '1925'], correctAnswer: '1923' },
        ],
      },
      en: {
        '3-5': [
          { question: 'Which animal meows?', options: ['Cat', 'Dog', 'Bird'], correctAnswer: 'Cat' },
          { question: 'How many fingers do you have?', options: ['5', '10', '20'], correctAnswer: '10' },
          { question: 'What color is the sun?', options: ['Yellow', 'Blue', 'Green'], correctAnswer: 'Yellow' },
          { question: 'Which shape is round?', options: ['Circle', 'Square', 'Triangle'], correctAnswer: 'Circle' },
          { question: 'Which animal barks?', options: ['Dog', 'Cat', 'Bird'], correctAnswer: 'Dog' },
        ],
        '6-8': [
          { question: '5 + 3 = ?', options: ['7', '8', '9'], correctAnswer: '8' },
          { question: 'How many days in a week?', options: ['5', '6', '7'], correctAnswer: '7' },
          { question: 'Which season is hottest?', options: ['Summer', 'Winter', 'Fall'], correctAnswer: 'Summer' },
          { question: '10 - 4 = ?', options: ['5', '6', '7'], correctAnswer: '6' },
          { question: 'Which animal lives in the sea?', options: ['Fish', 'Cat', 'Dog'], correctAnswer: 'Fish' },
          { question: 'How many hours in a day?', options: ['12', '24', '48'], correctAnswer: '24' },
        ],
        '9-12': [
          { question: '12 × 3 = ?', options: ['34', '36', '38'], correctAnswer: '36' },
          { question: 'What is the capital of France?', options: ['London', 'Paris', 'Berlin'], correctAnswer: 'Paris' },
          { question: '50 ÷ 5 = ?', options: ['8', '10', '12'], correctAnswer: '10' },
          { question: 'How many months in a year?', options: ['10', '11', '12'], correctAnswer: '12' },
          { question: 'Which planet is closest to the Sun?', options: ['Mercury', 'Venus', 'Earth'], correctAnswer: 'Mercury' },
          { question: '15 + 27 = ?', options: ['40', '42', '44'], correctAnswer: '42' },
        ],
        '13-15': [
          { question: '144 ÷ 12 = ?', options: ['10', '11', '12'], correctAnswer: '12' },
          { question: 'Which element is in water?', options: ['Hydrogen', 'Carbon', 'Nitrogen'], correctAnswer: 'Hydrogen' },
          { question: '2³ = ?', options: ['6', '8', '9'], correctAnswer: '8' },
          { question: 'Where does photosynthesis occur?', options: ['Chloroplast', 'Mitochondria', 'Ribosome'], correctAnswer: 'Chloroplast' },
          { question: '√64 = ?', options: ['6', '7', '8'], correctAnswer: '8' },
          { question: 'What year was the UN founded?', options: ['1943', '1945', '1947'], correctAnswer: '1945' },
        ],
      },
    };

    const langData = quizData[language as 'tr' | 'en'] || quizData.en;
    return langData[ageGroup] || langData['6-8'];
  };

  // Initialize questions from backend or generate fallback
  useEffect(() => {
    if (backendQuestions && backendQuestions.length > 0) {
      // Use backend questions if available
      const formattedQuestions = backendQuestions
        .filter(q => q.question && q.correctAnswer && q.options.length > 0)
        .map(q => ({
          question: q.question || '',
          options: q.options,
          correctAnswer: q.correctAnswer || '',
        }));
      
      if (formattedQuestions.length > 0) {
        setQuestions(formattedQuestions);
        return;
      }
    }
    
    // Generate fallback questions
    setQuestions(generateQuizQuestions());
  }, [backendQuestions, ageGroup, language]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-8 border-fun-blue border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-2xl font-bold text-white">{t.quizLoading}</p>
        </div>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Button
          onClick={onBack}
          size="lg"
          className="bg-white/90 hover:bg-white text-fun-purple font-bold shadow-lg"
        >
          <ArrowLeft className="w-6 h-6 mr-2" />
          {t.back}
        </Button>
        <div className="text-center text-white text-2xl bg-white/20 backdrop-blur-sm p-8 rounded-3xl">
          {t.quizNotFound}
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isCorrect = selectedAnswer === question.correctAnswer;

  const handleAnswerSelect = (answer: string) => {
    if (showResult) return;
    
    setSelectedAnswer(answer);
    setShowResult(true);
    
    if (answer === question.correctAnswer) {
      setScore(score + 1);
      toast.success(t.correctAnswer, {
        duration: 2000,
      });
    } else {
      toast.error(t.dontGiveUp, {
        duration: 2000,
      });
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setShowCelebration(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setShowCelebration(false);
  };

  return (
    <>
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
          <h1 className="text-3xl md:text-5xl font-black text-white drop-shadow-lg">
            🧠 {t.quizZone}
          </h1>
        </div>

        {/* Progress Bar */}
        <Card className="bg-white/95 backdrop-blur-sm border-4 border-fun-blue shadow-xl">
          <CardContent className="p-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-fun-purple">
                  {t.question} {currentQuestion + 1} / {questions.length}
                </span>
                <span className="text-lg font-bold text-fun-orange">
                  {t.score}: {score} 🌟
                </span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>
          </CardContent>
        </Card>

        {/* Question Card */}
        <Card className="bg-white/95 backdrop-blur-sm border-4 border-fun-purple shadow-2xl">
          <CardContent className="p-8 md:p-12">
            <div className="space-y-8">
              <h2 className="text-2xl md:text-4xl font-black text-fun-purple text-center leading-relaxed">
                {question.question}
              </h2>

              <div className="grid grid-cols-1 gap-4">
                {question.options.map((option, index) => {
                  const isSelected = selectedAnswer === option;
                  const isCorrectAnswer = option === question.correctAnswer;
                  
                  let buttonClass = "h-20 text-xl md:text-2xl font-bold border-4 transition-all";
                  
                  if (!showResult) {
                    buttonClass += " bg-gradient-to-r from-fun-sky to-fun-blue hover:scale-105 border-white text-white";
                  } else if (isCorrectAnswer) {
                    buttonClass += " bg-gradient-to-r from-green-400 to-green-600 border-green-700 text-white scale-105";
                  } else if (isSelected && !isCorrect) {
                    buttonClass += " bg-gradient-to-r from-red-400 to-red-600 border-red-700 text-white";
                  } else {
                    buttonClass += " bg-gray-200 border-gray-300 text-gray-500";
                  }

                  return (
                    <Button
                      key={index}
                      onClick={() => handleAnswerSelect(option)}
                      disabled={showResult}
                      className={buttonClass}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span>{option}</span>
                        {showResult && isCorrectAnswer && (
                          <CheckCircle2 className="w-8 h-8 animate-bounce" />
                        )}
                        {showResult && isSelected && !isCorrect && (
                          <XCircle className="w-8 h-8" />
                        )}
                      </div>
                    </Button>
                  );
                })}
              </div>

              {showResult && (
                <div className="text-center animate-in slide-in-from-bottom duration-500">
                  <Button
                    onClick={handleNext}
                    size="lg"
                    className="h-16 px-12 text-2xl font-black bg-gradient-to-r from-fun-orange to-fun-yellow hover:scale-105 transition-transform shadow-xl"
                  >
                    {currentQuestion < questions.length - 1 ? t.nextQuestion : t.finish}
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <CelebrationModal 
        isOpen={showCelebration}
        onClose={handleRestart}
        level={score}
        totalQuestions={questions.length}
        isQuiz
      />
    </>
  );
}
