import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslation } from '../../lib/translations';

interface MathPuzzleGameProps {
  ageGroup: '3-5' | '6-8' | '9-12' | '13-15';
  onBack: () => void;
  onComplete: (level: number) => void;
}

type MathProblem = {
  question: string;
  answer: number;
  options: number[];
};

export default function MathPuzzleGame({ ageGroup, onBack, onComplete }: MathPuzzleGameProps) {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [problem, setProblem] = useState<MathProblem | null>(null);
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const totalQuestions = 5;

  const generateProblem = (): MathProblem => {
    if (ageGroup === '3-5') {
      const num1 = Math.floor(Math.random() * 5) + 1;
      const num2 = Math.floor(Math.random() * 5) + 1;
      const answer = num1 + num2;
      const question = `${num1} + ${num2} = ?`;

      const options = [answer];
      while (options.length < 3) {
        const wrong = answer + Math.floor(Math.random() * 6) - 3;
        if (wrong > 0 && !options.includes(wrong)) {
          options.push(wrong);
        }
      }

      return {
        question,
        answer,
        options: options.sort(() => Math.random() - 0.5),
      };
    } else if (ageGroup === '6-8') {
      const num1 = Math.floor(Math.random() * 10) + 1;
      const num2 = Math.floor(Math.random() * 10) + 1;
      const operation = Math.random() > 0.5 ? '+' : '-';
      
      let answer: number;
      let question: string;
      
      if (operation === '+') {
        answer = num1 + num2;
        question = `${num1} + ${num2} = ?`;
      } else {
        const larger = Math.max(num1, num2);
        const smaller = Math.min(num1, num2);
        answer = larger - smaller;
        question = `${larger} - ${smaller} = ?`;
      }

      const options = [answer];
      while (options.length < 3) {
        const wrong = answer + Math.floor(Math.random() * 10) - 5;
        if (wrong > 0 && !options.includes(wrong)) {
          options.push(wrong);
        }
      }

      return {
        question,
        answer,
        options: options.sort(() => Math.random() - 0.5),
      };
    } else if (ageGroup === '9-12') {
      const num1 = Math.floor(Math.random() * 12) + 1;
      const num2 = Math.floor(Math.random() * 12) + 1;
      const operations = ['+', '-', '×'];
      const operation = operations[Math.floor(Math.random() * operations.length)];
      
      let answer: number;
      let question: string;
      
      if (operation === '+') {
        answer = num1 + num2;
        question = `${num1} + ${num2} = ?`;
      } else if (operation === '-') {
        const larger = Math.max(num1, num2);
        const smaller = Math.min(num1, num2);
        answer = larger - smaller;
        question = `${larger} - ${smaller} = ?`;
      } else {
        answer = num1 * num2;
        question = `${num1} × ${num2} = ?`;
      }

      const options = [answer];
      while (options.length < 4) {
        const wrong = answer + Math.floor(Math.random() * 20) - 10;
        if (wrong > 0 && !options.includes(wrong)) {
          options.push(wrong);
        }
      }

      return {
        question,
        answer,
        options: options.sort(() => Math.random() - 0.5),
      };
    } else {
      const num1 = Math.floor(Math.random() * 15) + 1;
      const num2 = Math.floor(Math.random() * 15) + 1;
      const operations = ['+', '-', '×', '÷'];
      const operation = operations[Math.floor(Math.random() * operations.length)];
      
      let answer: number;
      let question: string;
      
      if (operation === '+') {
        answer = num1 + num2;
        question = `${num1} + ${num2} = ?`;
      } else if (operation === '-') {
        const larger = Math.max(num1, num2);
        const smaller = Math.min(num1, num2);
        answer = larger - smaller;
        question = `${larger} - ${smaller} = ?`;
      } else if (operation === '×') {
        answer = num1 * num2;
        question = `${num1} × ${num2} = ?`;
      } else {
        const divisor = Math.floor(Math.random() * 10) + 1;
        const dividend = divisor * (Math.floor(Math.random() * 10) + 1);
        answer = dividend / divisor;
        question = `${dividend} ÷ ${divisor} = ?`;
      }

      const options = [answer];
      while (options.length < 4) {
        const wrong = answer + Math.floor(Math.random() * 30) - 15;
        if (wrong > 0 && !options.includes(wrong)) {
          options.push(wrong);
        }
      }

      return {
        question,
        answer,
        options: options.sort(() => Math.random() - 0.5),
      };
    }
  };

  useEffect(() => {
    setProblem(generateProblem());
  }, [ageGroup]);

  const handleAnswer = (selectedAnswer: number) => {
    if (!problem) return;

    if (selectedAnswer === problem.answer) {
      toast.success(t.correctAnswer, { duration: 1500 });
      setScore(score + 1);
    } else {
      toast.error(`${t.correctAnswerWas} ${problem.answer} 💪`, { duration: 1500 });
    }

    const newQuestionsAnswered = questionsAnswered + 1;
    setQuestionsAnswered(newQuestionsAnswered);

    if (newQuestionsAnswered >= totalQuestions) {
      setTimeout(() => onComplete(score + (selectedAnswer === problem.answer ? 1 : 0)), 1000);
    } else {
      setTimeout(() => setProblem(generateProblem()), 1500);
    }
  };

  if (!problem) return null;

  const gridCols = ageGroup === '3-5' || ageGroup === '6-8' ? 'grid-cols-3' : 'grid-cols-2 md:grid-cols-4';

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
          {t.question}: {questionsAnswered + 1}/{totalQuestions} | {t.score}: {score} 🌟
        </div>
      </div>

      <Card className="bg-white/95 backdrop-blur-sm border-4 border-fun-yellow shadow-2xl">
        <CardContent className="p-8 md:p-12">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-black text-fun-purple">
                {t.colorfulMath}
              </h2>
              <p className="text-lg md:text-xl text-gray-700 font-semibold">
                {t.solveAndFind}
              </p>
            </div>

            <div className="bg-gradient-to-r from-fun-orange to-fun-yellow p-8 md:p-12 rounded-3xl shadow-xl">
              <p className="text-5xl md:text-7xl font-black text-white drop-shadow-lg">
                {problem.question}
              </p>
            </div>

            <div className={`grid ${gridCols} gap-4`}>
              {problem.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="h-24 text-4xl font-black bg-gradient-to-br from-fun-blue to-fun-purple hover:scale-110 transition-transform shadow-xl border-4 border-white"
                >
                  {option}
                </Button>
              ))}
            </div>

            <div className="flex justify-center pt-4">
              <img 
                src="/assets/generated/happy-numbers.dim_600x400.png"
                alt="Happy Numbers"
                className="w-64 h-48 object-contain"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
