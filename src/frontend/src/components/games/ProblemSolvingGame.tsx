import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslation } from '../../lib/translations';
import { useProblemSolvingTasks } from '../../hooks/useQueries';
import type { LocalizedText } from '../../backend';

interface ProblemSolvingGameProps {
  ageGroup: '3-5' | '6-8' | '9-12' | '13-15';
  onBack: () => void;
  onComplete: (level: number) => void;
}

type Problem = {
  scenario: string;
  options: string[];
  correctOption: string;
  category: 'everyday' | 'social' | 'creative' | 'teamwork' | 'timeManagement';
};

export default function ProblemSolvingGame({ ageGroup, onBack, onComplete }: ProblemSolvingGameProps) {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const { data: backendProblems } = useProblemSolvingTasks(ageGroup);
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);
  const [score, setScore] = useState(0);
  const [problemsSolved, setProblemsSolved] = useState(0);
  const [category, setCategory] = useState<'everyday' | 'social' | 'creative' | 'teamwork' | 'timeManagement'>('everyday');
  const totalProblems = 5;

  const getLocalizedText = (localized: LocalizedText): string => {
    const langMap: Record<string, keyof LocalizedText> = {
      tr: 'turkish', en: 'english', es: 'spanish', fr: 'french',
      de: 'german', it: 'italian', ru: 'russian', pt: 'portuguese',
      zh: 'chinese', ja: 'japanese'
    };
    return localized[langMap[language]];
  };

  const generateEverydayProblem = (): Problem => {
    if (ageGroup === '3-5') {
      const problems = [
        {
          scenario: 'Oyuncaklarını toplamayı unutmuşsun. Ne yapmalısın?',
          options: ['Hemen topla', 'Bırak öyle kalsın'],
          correctOption: 'Hemen topla',
          category: 'everyday' as const,
        },
        {
          scenario: 'Ellerini ne zaman yıkamalısın?',
          options: ['Yemekten önce', 'Hiç'],
          correctOption: 'Yemekten önce',
          category: 'everyday' as const,
        },
      ];
      return problems[Math.floor(Math.random() * problems.length)];
    } else if (ageGroup === '6-8') {
      const problems = [
        {
          scenario: 'Sabah okula gitmeden önce ne yapmalısın?',
          options: ['Kahvaltı yap ve hazırlan', 'Sadece uyu', 'Oyun oyna'],
          correctOption: 'Kahvaltı yap ve hazırlan',
          category: 'everyday' as const,
        },
        {
          scenario: 'Oyuncaklarını toplamayı unutmuşsun. Ne yapmalısın?',
          options: ['Hemen topla', 'Bırak öyle kalsın', 'Başkası toplasın'],
          correctOption: 'Hemen topla',
          category: 'everyday' as const,
        },
        {
          scenario: 'Dişlerini ne zaman fırçalamalısın?',
          options: ['Sabah ve akşam', 'Sadece sabah', 'Hiç'],
          correctOption: 'Sabah ve akşam',
          category: 'everyday' as const,
        },
        {
          scenario: 'Yemek yerken ne yapmalısın?',
          options: ['Masada otur ve yavaş ye', 'Koşarak ye', 'TV izle'],
          correctOption: 'Masada otur ve yavaş ye',
          category: 'everyday' as const,
        },
      ];
      return problems[Math.floor(Math.random() * problems.length)];
    } else if (ageGroup === '9-12') {
      const problems = [
        {
          scenario: 'Ödevini yapmayı unutmuşsun ve yarın teslim günü. Ne yaparsın?',
          options: ['Hemen başla ve bitir', 'Bahane uydur', 'Hiçbir şey yapma'],
          correctOption: 'Hemen başla ve bitir',
          category: 'everyday' as const,
        },
        {
          scenario: 'Harçlığını nasıl kullanmalısın?',
          options: ['Biraz biriktir, biraz harca', 'Hepsini hemen harca', 'Hiç harcama'],
          correctOption: 'Biraz biriktir, biraz harca',
          category: 'everyday' as const,
        },
        {
          scenario: 'Evde elektrik kesildi. Ne yaparsın?',
          options: ['Mum yak ve güvenli ol', 'Panikle', 'Hiçbir şey yapma'],
          correctOption: 'Mum yak ve güvenli ol',
          category: 'everyday' as const,
        },
      ];
      return problems[Math.floor(Math.random() * problems.length)];
    } else {
      const problems = [
        {
          scenario: 'Ödevini yapmayı unutmuşsun ve yarın teslim günü. Ayrıca sınav da var. Ne yaparsın?',
          options: ['Öncelik belirle ve planla', 'Bahane uydur', 'Panikle'],
          correctOption: 'Öncelik belirle ve planla',
          category: 'everyday' as const,
        },
        {
          scenario: 'Harçlığını nasıl yönetmelisin?',
          options: ['Bütçe yap, biriktir ve akıllıca harca', 'Hepsini hemen harca', 'Hiç harcama'],
          correctOption: 'Bütçe yap, biriktir ve akıllıca harca',
          category: 'everyday' as const,
        },
        {
          scenario: 'Evde acil bir durum var. Ne yaparsın?',
          options: ['Sakin kal ve yardım çağır', 'Panikle', 'Görmezden gel'],
          correctOption: 'Sakin kal ve yardım çağır',
          category: 'everyday' as const,
        },
      ];
      return problems[Math.floor(Math.random() * problems.length)];
    }
  };

  const generateSocialProblem = (): Problem => {
    if (ageGroup === '3-5') {
      const problems = [
        {
          scenario: 'Arkadaşın üzgün görünüyor. Ne yapmalısın?',
          options: ['Onu teselli et', 'Görmezden gel'],
          correctOption: 'Onu teselli et',
          category: 'social' as const,
        },
        {
          scenario: 'Oyun oynarken sıra sende değil. Ne yapmalısın?',
          options: ['Sabırla bekle', 'Hemen oyna'],
          correctOption: 'Sabırla bekle',
          category: 'social' as const,
        },
      ];
      return problems[Math.floor(Math.random() * problems.length)];
    } else if (ageGroup === '6-8') {
      const problems = [
        {
          scenario: 'Arkadaşın üzgün görünüyor. Ne yapmalısın?',
          options: ['Onu teselli et ve sor', 'Görmezden gel', 'Gül'],
          correctOption: 'Onu teselli et ve sor',
          category: 'social' as const,
        },
        {
          scenario: 'Oyun oynarken sıra sende değil. Ne yapmalısın?',
          options: ['Sabırla bekle', 'Hemen oyna', 'Oyunu boz'],
          correctOption: 'Sabırla bekle',
          category: 'social' as const,
        },
        {
          scenario: 'Arkadaşın seninle paylaşmıyor. Ne yaparsın?',
          options: ['Nazikçe iste', 'Al', 'Ağla'],
          correctOption: 'Nazikçe iste',
          category: 'social' as const,
        },
      ];
      return problems[Math.floor(Math.random() * problems.length)];
    } else if (ageGroup === '9-12') {
      const problems = [
        {
          scenario: 'Grup projesinde bir arkadaşın çalışmıyor. Ne yaparsın?',
          options: ['Nazikçe konuş ve yardım öner', 'Şikayet et', 'Görmezden gel'],
          correctOption: 'Nazikçe konuş ve yardım öner',
          category: 'social' as const,
        },
        {
          scenario: 'Yeni bir öğrenci sınıfa geldi ve yalnız. Ne yaparsın?',
          options: ['Yanına git ve tanış', 'Bekle', 'Hiçbir şey yapma'],
          correctOption: 'Yanına git ve tanış',
          category: 'social' as const,
        },
        {
          scenario: 'Arkadaşlarınla tartıştın. Ne yaparsın?',
          options: ['Sakinleş ve konuş', 'Kız', 'Küs'],
          correctOption: 'Sakinleş ve konuş',
          category: 'social' as const,
        },
      ];
      return problems[Math.floor(Math.random() * problems.length)];
    } else {
      const problems = [
        {
          scenario: 'Grup projesinde bir arkadaşın çalışmıyor ve bu projeyi etkiliyor. Ne yaparsın?',
          options: ['Empatiyle yaklaş, konuş ve çözüm ara', 'Şikayet et', 'Görmezden gel'],
          correctOption: 'Empatiyle yaklaş, konuş ve çözüm ara',
          category: 'social' as const,
        },
        {
          scenario: 'Yeni bir öğrenci sınıfa geldi ve farklı bir kültürden. Ne yaparsın?',
          options: ['Yanına git, tanış ve kültürünü öğren', 'Bekle', 'Uzak dur'],
          correctOption: 'Yanına git, tanış ve kültürünü öğren',
          category: 'social' as const,
        },
        {
          scenario: 'Arkadaşlarınla ciddi bir anlaşmazlık yaşadın. Ne yaparsın?',
          options: ['Sakinleş, dinle ve yapıcı konuş', 'Kız', 'Küs'],
          correctOption: 'Sakinleş, dinle ve yapıcı konuş',
          category: 'social' as const,
        },
      ];
      return problems[Math.floor(Math.random() * problems.length)];
    }
  };

  const generateCreativeProblem = (): Problem => {
    if (ageGroup === '3-5') {
      const problems = [
        {
          scenario: 'Resim yapmak istiyorsun ama kağıdın yok. Ne yapabilirsin?',
          options: ['Başka bir şey kullan', 'Vazgeç'],
          correctOption: 'Başka bir şey kullan',
          category: 'creative' as const,
        },
        {
          scenario: 'Oyuncağın bozuldu. Ne yapabilirsin?',
          options: ['Tamir etmeyi dene', 'At çöpe'],
          correctOption: 'Tamir etmeyi dene',
          category: 'creative' as const,
        },
      ];
      return problems[Math.floor(Math.random() * problems.length)];
    } else if (ageGroup === '6-8') {
      const problems = [
        {
          scenario: 'Resim yapmak istiyorsun ama kağıdın yok. Ne yapabilirsin?',
          options: ['Başka bir şey kullan (karton, taş)', 'Vazgeç', 'Ağla'],
          correctOption: 'Başka bir şey kullan (karton, taş)',
          category: 'creative' as const,
        },
        {
          scenario: 'Oyuncağın bozuldu. Ne yapabilirsin?',
          options: ['Tamir etmeyi dene', 'At çöpe', 'Üzül'],
          correctOption: 'Tamir etmeyi dene',
          category: 'creative' as const,
        },
        {
          scenario: 'Yeni bir oyun icat etmek istiyorsun. Ne yaparsın?',
          options: ['Hayal et ve dene', 'Vazgeç', 'Başkasını kopyala'],
          correctOption: 'Hayal et ve dene',
          category: 'creative' as const,
        },
      ];
      return problems[Math.floor(Math.random() * problems.length)];
    } else if (ageGroup === '9-12') {
      const problems = [
        {
          scenario: 'Proje için malzemen eksik. Ne yaparsın?',
          options: ['Alternatif malzeme bul', 'Vazgeç', 'Bekle'],
          correctOption: 'Alternatif malzeme bul',
          category: 'creative' as const,
        },
        {
          scenario: 'Hikaye yazıyorsun ama fikir bulamıyorsun. Ne yaparsın?',
          options: ['Çevrene bak, ilham al', 'Bırak', 'Kopyala'],
          correctOption: 'Çevrene bak, ilham al',
          category: 'creative' as const,
        },
        {
          scenario: 'Müzik aleti çalmayı öğrenmek istiyorsun. Ne yaparsın?',
          options: ['Pratik yap ve sabırlı ol', 'Hemen vazgeç', 'Sadece dinle'],
          correctOption: 'Pratik yap ve sabırlı ol',
          category: 'creative' as const,
        },
      ];
      return problems[Math.floor(Math.random() * problems.length)];
    } else {
      const problems = [
        {
          scenario: 'Proje için malzemen eksik ve bütçen sınırlı. Ne yaparsın?',
          options: ['Yaratıcı alternatifler bul ve yeniden kullan', 'Vazgeç', 'Bekle'],
          correctOption: 'Yaratıcı alternatifler bul ve yeniden kullan',
          category: 'creative' as const,
        },
        {
          scenario: 'Hikaye yazıyorsun ama fikir bulamıyorsun. Ne yaparsın?',
          options: ['Araştır, gözlemle ve farklı bakış açıları dene', 'Bırak', 'Kopyala'],
          correctOption: 'Araştır, gözlemle ve farklı bakış açıları dene',
          category: 'creative' as const,
        },
        {
          scenario: 'Müzik aleti çalmayı öğrenmek istiyorsun ama zorlanıyorsun. Ne yaparsın?',
          options: ['Düzenli pratik yap, sabırlı ol ve mentor bul', 'Hemen vazgeç', 'Sadece dinle'],
          correctOption: 'Düzenli pratik yap, sabırlı ol ve mentor bul',
          category: 'creative' as const,
        },
      ];
      return problems[Math.floor(Math.random() * problems.length)];
    }
  };

  const generateTeamworkProblem = (): Problem => {
    if (ageGroup === '3-5') {
      const problems = [
        {
          scenario: 'Arkadaşınla birlikte oyuncak topluyorsunuz. Ne yapmalısın?',
          options: ['Birlikte çalış', 'Sadece izle'],
          correctOption: 'Birlikte çalış',
          category: 'teamwork' as const,
        },
      ];
      return problems[0];
    } else if (ageGroup === '6-8') {
      const problems = [
        {
          scenario: 'Grup oyununda herkes farklı bir şey istiyor. Ne yaparsın?',
          options: ['Hep birlikte karar verin', 'Sadece sen karar ver', 'Oyunu bırak'],
          correctOption: 'Hep birlikte karar verin',
          category: 'teamwork' as const,
        },
        {
          scenario: 'Arkadaşın yardıma ihtiyacı var ama sen de meşgulsün. Ne yaparsın?',
          options: ['Birlikte çözüm bulun', 'Görmezden gel', 'Başkasını çağır'],
          correctOption: 'Birlikte çözüm bulun',
          category: 'teamwork' as const,
        },
      ];
      return problems[Math.floor(Math.random() * problems.length)];
    } else if (ageGroup === '9-12') {
      const problems = [
        {
          scenario: 'Grup projesinde görev dağılımı yapılıyor. Ne yaparsın?',
          options: ['Herkesin güçlü yönlerini düşün ve adil dağıt', 'En kolay işi al', 'Hepsini kendin yap'],
          correctOption: 'Herkesin güçlü yönlerini düşün ve adil dağıt',
          category: 'teamwork' as const,
        },
        {
          scenario: 'Takım arkadaşın hata yaptı ve üzgün. Ne yaparsın?',
          options: ['Destekle ve birlikte düzeltin', 'Suçla', 'Görmezden gel'],
          correctOption: 'Destekle ve birlikte düzeltin',
          category: 'teamwork' as const,
        },
      ];
      return problems[Math.floor(Math.random() * problems.length)];
    } else {
      const problems = [
        {
          scenario: 'Grup projesinde fikir ayrılığı var ve zaman daralıyor. Ne yaparsın?',
          options: ['Demokratik oylama yap ve uzlaşma ara', 'Kendi fikrinde ısrar et', 'Vazgeç'],
          correctOption: 'Demokratik oylama yap ve uzlaşma ara',
          category: 'teamwork' as const,
        },
        {
          scenario: 'Takımda liderlik boşluğu var ve proje ilerlememiyor. Ne yaparsın?',
          options: ['İnisiyatif al, organize et ve herkesi dahil et', 'Bekle', 'Şikayet et'],
          correctOption: 'İnisiyatif al, organize et ve herkesi dahil et',
          category: 'teamwork' as const,
        },
      ];
      return problems[Math.floor(Math.random() * problems.length)];
    }
  };

  const generateTimeManagementProblem = (): Problem => {
    if (ageGroup === '3-5') {
      const problems = [
        {
          scenario: 'Oyun oynamak ve yemek yemek istiyorsun. Ne yapmalısın?',
          options: ['Önce ye, sonra oyna', 'Sadece oyna'],
          correctOption: 'Önce ye, sonra oyna',
          category: 'timeManagement' as const,
        },
      ];
      return problems[0];
    } else if (ageGroup === '6-8') {
      const problems = [
        {
          scenario: 'Ödevin var ama arkadaşların dışarıda oynuyor. Ne yaparsın?',
          options: ['Önce ödevi bitir, sonra oyna', 'Sadece oyna', 'Ödevi yapma'],
          correctOption: 'Önce ödevi bitir, sonra oyna',
          category: 'timeManagement' as const,
        },
        {
          scenario: 'Uyku saatin geldi ama oyun oynamak istiyorsun. Ne yaparsın?',
          options: ['Uyu, yarın oynarsın', 'Oyuna devam et', 'Biraz daha oyna'],
          correctOption: 'Uyu, yarın oynarsın',
          category: 'timeManagement' as const,
        },
      ];
      return problems[Math.floor(Math.random() * problems.length)];
    } else if (ageGroup === '9-12') {
      const problems = [
        {
          scenario: 'Yarın sınavın var ama arkadaşların sinemaya gidiyor. Ne yaparsın?',
          options: ['Çalış, sınavdan sonra git', 'Sinemaya git', 'Her ikisini de yap'],
          correctOption: 'Çalış, sınavdan sonra git',
          category: 'timeManagement' as const,
        },
        {
          scenario: 'Üç ödevin var ve hepsi yarın teslim. Ne yaparsın?',
          options: ['Öncelik sırasına koy ve planla', 'Panikle', 'Sadece birini yap'],
          correctOption: 'Öncelik sırasına koy ve planla',
          category: 'timeManagement' as const,
        },
      ];
      return problems[Math.floor(Math.random() * problems.length)];
    } else {
      const problems = [
        {
          scenario: 'Sınavın, projen ve sosyal etkinliğin aynı haftada. Ne yaparsın?',
          options: ['Detaylı zaman çizelgesi yap ve dengele', 'Birini feda et', 'Strese gir'],
          correctOption: 'Detaylı zaman çizelgesi yap ve dengele',
          category: 'timeManagement' as const,
        },
        {
          scenario: 'Uzun vadeli projen var ama son güne bıraktın. Ne yaparsın?',
          options: ['Gerçekçi plan yap, yardım iste ve öğren', 'Panikle', 'Bahane uydur'],
          correctOption: 'Gerçekçi plan yap, yardım iste ve öğren',
          category: 'timeManagement' as const,
        },
      ];
      return problems[Math.floor(Math.random() * problems.length)];
    }
  };

  const generateProblem = (): Problem => {
    switch (category) {
      case 'everyday':
        return generateEverydayProblem();
      case 'social':
        return generateSocialProblem();
      case 'creative':
        return generateCreativeProblem();
      case 'teamwork':
        return generateTeamworkProblem();
      case 'timeManagement':
        return generateTimeManagementProblem();
      default:
        return generateEverydayProblem();
    }
  };

  useEffect(() => {
    if (backendProblems && backendProblems.length > 0) {
      const problem = backendProblems[0];
      setCurrentProblem({
        scenario: getLocalizedText(problem.scenario),
        options: problem.options.map(opt => getLocalizedText(opt)),
        correctOption: getLocalizedText(problem.correctOption),
        category: 'everyday',
      });
    } else {
      setCurrentProblem(generateProblem());
    }
  }, [backendProblems, ageGroup, category]);

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

  const handleCategoryChange = (cat: typeof category) => {
    setCategory(cat);
    setCurrentProblem(null);
    setTimeout(() => {
      if (cat === 'everyday') setCurrentProblem(generateEverydayProblem());
      else if (cat === 'social') setCurrentProblem(generateSocialProblem());
      else if (cat === 'creative') setCurrentProblem(generateCreativeProblem());
      else if (cat === 'teamwork') setCurrentProblem(generateTeamworkProblem());
      else setCurrentProblem(generateTimeManagementProblem());
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
                alt="Problem Solving"
                className="w-64 h-48 object-contain"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
