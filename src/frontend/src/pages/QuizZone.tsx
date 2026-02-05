import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import { useRandomizedQuizQuestions } from '../hooks/useRandomizedQuizQuestions';
import { Progress } from '@/components/ui/progress';
import CelebrationModal from '../components/CelebrationModal';
import { toast } from 'sonner';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../lib/translations';
import { getFallbackQuizQuestions } from '../lib/fallbackQuizQuestions';
import {
  selectQuestionsWithHistory,
  updateQuizHistory,
  getSessionSize,
} from '../lib/quizQuestionSelection';

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
  const sessionSize = getSessionSize();
  
  const { data: backendQuestions, isLoading } = useRandomizedQuizQuestions(ageGroup, sessionSize);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [sessionKey, setSessionKey] = useState(0); // Force re-initialization on restart

  // Initialize questions from backend or generate fallback with history-aware selection
  useEffect(() => {
    // Try backend first
    if (backendQuestions && backendQuestions.length > 0) {
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
    
    // Fallback to frontend pool with history-aware selection
    const fallbackPool = getFallbackQuizQuestions(ageGroup, language);
    const { selected, selectedIndices } = selectQuestionsWithHistory(
      fallbackPool,
      ageGroup,
      language,
      sessionSize
    );
    
    setQuestions(selected);
    
    // Update history after selection
    updateQuizHistory(ageGroup, language, selectedIndices);
  }, [backendQuestions, ageGroup, language, sessionSize, sessionKey]);

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
    setSessionKey(prev => prev + 1); // Trigger new question selection
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
