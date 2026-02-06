import type { LanguageCode } from './translations';

export type ProblemCategory = 'everyday' | 'social' | 'creative' | 'teamwork' | 'timeManagement';
export type AgeGroupKey = '3-5' | '6-8' | '9-12' | '13-15';

export interface FallbackProblem {
  scenario: string;
  options: string[];
  correctOption: string;
  category: ProblemCategory;
}

type ProblemPool = Record<AgeGroupKey, Record<ProblemCategory, FallbackProblem[]>>;

const turkishProblems: ProblemPool = {
  '3-5': {
    everyday: [
      {
        scenario: 'Oyuncaklarını toplamayı unutmuşsun. Ne yapmalısın?',
        options: ['Hemen topla', 'Bırak öyle kalsın'],
        correctOption: 'Hemen topla',
        category: 'everyday',
      },
      {
        scenario: 'Ellerini ne zaman yıkamalısın?',
        options: ['Yemekten önce', 'Hiç'],
        correctOption: 'Yemekten önce',
        category: 'everyday',
      },
    ],
    social: [
      {
        scenario: 'Arkadaşın üzgün görünüyor. Ne yapmalısın?',
        options: ['Onu teselli et', 'Görmezden gel'],
        correctOption: 'Onu teselli et',
        category: 'social',
      },
      {
        scenario: 'Oyun oynarken sıra sende değil. Ne yapmalısın?',
        options: ['Sabırla bekle', 'Hemen oyna'],
        correctOption: 'Sabırla bekle',
        category: 'social',
      },
    ],
    creative: [
      {
        scenario: 'Resim yapmak istiyorsun ama kağıdın yok. Ne yapabilirsin?',
        options: ['Başka bir şey kullan', 'Vazgeç'],
        correctOption: 'Başka bir şey kullan',
        category: 'creative',
      },
      {
        scenario: 'Oyuncağın bozuldu. Ne yapabilirsin?',
        options: ['Tamir etmeyi dene', 'At çöpe'],
        correctOption: 'Tamir etmeyi dene',
        category: 'creative',
      },
    ],
    teamwork: [
      {
        scenario: 'Arkadaşınla birlikte oyuncak topluyorsunuz. Ne yapmalısın?',
        options: ['Birlikte çalış', 'Sadece izle'],
        correctOption: 'Birlikte çalış',
        category: 'teamwork',
      },
    ],
    timeManagement: [
      {
        scenario: 'Oyun oynamak ve yemek yemek istiyorsun. Ne yapmalısın?',
        options: ['Önce ye, sonra oyna', 'Sadece oyna'],
        correctOption: 'Önce ye, sonra oyna',
        category: 'timeManagement',
      },
    ],
  },
  '6-8': {
    everyday: [
      {
        scenario: 'Sabah okula gitmeden önce ne yapmalısın?',
        options: ['Kahvaltı yap ve hazırlan', 'Sadece uyu', 'Oyun oyna'],
        correctOption: 'Kahvaltı yap ve hazırlan',
        category: 'everyday',
      },
      {
        scenario: 'Dişlerini ne zaman fırçalamalısın?',
        options: ['Sabah ve akşam', 'Sadece sabah', 'Hiç'],
        correctOption: 'Sabah ve akşam',
        category: 'everyday',
      },
    ],
    social: [
      {
        scenario: 'Arkadaşın üzgün görünüyor. Ne yapmalısın?',
        options: ['Onu teselli et ve sor', 'Görmezden gel', 'Gül'],
        correctOption: 'Onu teselli et ve sor',
        category: 'social',
      },
      {
        scenario: 'Arkadaşın seninle paylaşmıyor. Ne yaparsın?',
        options: ['Nazikçe iste', 'Al', 'Ağla'],
        correctOption: 'Nazikçe iste',
        category: 'social',
      },
    ],
    creative: [
      {
        scenario: 'Resim yapmak istiyorsun ama kağıdın yok. Ne yapabilirsin?',
        options: ['Başka bir şey kullan (karton, taş)', 'Vazgeç', 'Ağla'],
        correctOption: 'Başka bir şey kullan (karton, taş)',
        category: 'creative',
      },
      {
        scenario: 'Yeni bir oyun icat etmek istiyorsun. Ne yaparsın?',
        options: ['Hayal et ve dene', 'Vazgeç', 'Başkasını kopyala'],
        correctOption: 'Hayal et ve dene',
        category: 'creative',
      },
    ],
    teamwork: [
      {
        scenario: 'Grup oyununda herkes farklı bir şey istiyor. Ne yaparsın?',
        options: ['Hep birlikte karar verin', 'Sadece sen karar ver', 'Oyunu bırak'],
        correctOption: 'Hep birlikte karar verin',
        category: 'teamwork',
      },
    ],
    timeManagement: [
      {
        scenario: 'Ödevin var ama arkadaşların dışarıda oynuyor. Ne yaparsın?',
        options: ['Önce ödevi bitir, sonra oyna', 'Sadece oyna', 'Ödevi yapma'],
        correctOption: 'Önce ödevi bitir, sonra oyna',
        category: 'timeManagement',
      },
    ],
  },
  '9-12': {
    everyday: [
      {
        scenario: 'Ödevini yapmayı unutmuşsun ve yarın teslim günü. Ne yaparsın?',
        options: ['Hemen başla ve bitir', 'Bahane uydur', 'Hiçbir şey yapma'],
        correctOption: 'Hemen başla ve bitir',
        category: 'everyday',
      },
      {
        scenario: 'Harçlığını nasıl kullanmalısın?',
        options: ['Biraz biriktir, biraz harca', 'Hepsini hemen harca', 'Hiç harcama'],
        correctOption: 'Biraz biriktir, biraz harca',
        category: 'everyday',
      },
    ],
    social: [
      {
        scenario: 'Grup projesinde bir arkadaşın çalışmıyor. Ne yaparsın?',
        options: ['Nazikçe konuş ve yardım öner', 'Şikayet et', 'Görmezden gel'],
        correctOption: 'Nazikçe konuş ve yardım öner',
        category: 'social',
      },
      {
        scenario: 'Yeni bir öğrenci sınıfa geldi ve yalnız. Ne yaparsın?',
        options: ['Yanına git ve tanış', 'Bekle', 'Hiçbir şey yapma'],
        correctOption: 'Yanına git ve tanış',
        category: 'social',
      },
    ],
    creative: [
      {
        scenario: 'Proje için malzemen eksik. Ne yaparsın?',
        options: ['Alternatif malzeme bul', 'Vazgeç', 'Bekle'],
        correctOption: 'Alternatif malzeme bul',
        category: 'creative',
      },
      {
        scenario: 'Hikaye yazıyorsun ama fikir bulamıyorsun. Ne yaparsın?',
        options: ['Çevrene bak, ilham al', 'Bırak', 'Kopyala'],
        correctOption: 'Çevrene bak, ilham al',
        category: 'creative',
      },
    ],
    teamwork: [
      {
        scenario: 'Grup projesinde görev dağılımı yapılıyor. Ne yaparsın?',
        options: ['Herkesin güçlü yönlerini düşün ve adil dağıt', 'En kolay işi al', 'Hepsini kendin yap'],
        correctOption: 'Herkesin güçlü yönlerini düşün ve adil dağıt',
        category: 'teamwork',
      },
    ],
    timeManagement: [
      {
        scenario: 'Yarın sınavın var ama arkadaşların sinemaya gidiyor. Ne yaparsın?',
        options: ['Çalış, sınavdan sonra git', 'Sinemaya git', 'Her ikisini de yap'],
        correctOption: 'Çalış, sınavdan sonra git',
        category: 'timeManagement',
      },
    ],
  },
  '13-15': {
    everyday: [
      {
        scenario: 'Ödevini yapmayı unutmuşsun ve yarın teslim günü. Ayrıca sınav da var. Ne yaparsın?',
        options: ['Öncelik belirle ve planla', 'Bahane uydur', 'Panikle'],
        correctOption: 'Öncelik belirle ve planla',
        category: 'everyday',
      },
      {
        scenario: 'Harçlığını nasıl yönetmelisin?',
        options: ['Bütçe yap, biriktir ve akıllıca harca', 'Hepsini hemen harca', 'Hiç harcama'],
        correctOption: 'Bütçe yap, biriktir ve akıllıca harca',
        category: 'everyday',
      },
    ],
    social: [
      {
        scenario: 'Grup projesinde bir arkadaşın çalışmıyor ve bu projeyi etkiliyor. Ne yaparsın?',
        options: ['Empatiyle yaklaş, konuş ve çözüm ara', 'Şikayet et', 'Görmezden gel'],
        correctOption: 'Empatiyle yaklaş, konuş ve çözüm ara',
        category: 'social',
      },
      {
        scenario: 'Yeni bir öğrenci sınıfa geldi ve farklı bir kültürden. Ne yaparsın?',
        options: ['Yanına git, tanış ve kültürünü öğren', 'Bekle', 'Uzak dur'],
        correctOption: 'Yanına git, tanış ve kültürünü öğren',
        category: 'social',
      },
    ],
    creative: [
      {
        scenario: 'Proje için malzemen eksik ve bütçen sınırlı. Ne yaparsın?',
        options: ['Yaratıcı alternatifler bul ve yeniden kullan', 'Vazgeç', 'Bekle'],
        correctOption: 'Yaratıcı alternatifler bul ve yeniden kullan',
        category: 'creative',
      },
      {
        scenario: 'Hikaye yazıyorsun ama fikir bulamıyorsun. Ne yaparsın?',
        options: ['Araştır, gözlemle ve farklı bakış açıları dene', 'Bırak', 'Kopyala'],
        correctOption: 'Araştır, gözlemle ve farklı bakış açıları dene',
        category: 'creative',
      },
    ],
    teamwork: [
      {
        scenario: 'Grup projesinde fikir ayrılığı var ve zaman daralıyor. Ne yaparsın?',
        options: ['Demokratik oylama yap ve uzlaşma ara', 'Kendi fikrinde ısrar et', 'Vazgeç'],
        correctOption: 'Demokratik oylama yap ve uzlaşma ara',
        category: 'teamwork',
      },
    ],
    timeManagement: [
      {
        scenario: 'Sınavın, projen ve sosyal etkinliğin aynı haftada. Ne yaparsın?',
        options: ['Detaylı zaman çizelgesi yap ve dengele', 'Birini feda et', 'Strese gir'],
        correctOption: 'Detaylı zaman çizelgesi yap ve dengele',
        category: 'timeManagement',
      },
    ],
  },
};

const englishProblems: ProblemPool = {
  '3-5': {
    everyday: [
      {
        scenario: 'You forgot to clean up your toys. What should you do?',
        options: ['Clean them up right away', 'Leave them there'],
        correctOption: 'Clean them up right away',
        category: 'everyday',
      },
      {
        scenario: 'When should you wash your hands?',
        options: ['Before eating', 'Never'],
        correctOption: 'Before eating',
        category: 'everyday',
      },
    ],
    social: [
      {
        scenario: 'Your friend looks sad. What should you do?',
        options: ['Comfort them', 'Ignore them'],
        correctOption: 'Comfort them',
        category: 'social',
      },
      {
        scenario: 'It\'s not your turn in the game. What should you do?',
        options: ['Wait patiently', 'Play right away'],
        correctOption: 'Wait patiently',
        category: 'social',
      },
    ],
    creative: [
      {
        scenario: 'You want to draw but have no paper. What can you do?',
        options: ['Use something else', 'Give up'],
        correctOption: 'Use something else',
        category: 'creative',
      },
      {
        scenario: 'Your toy is broken. What can you do?',
        options: ['Try to fix it', 'Throw it away'],
        correctOption: 'Try to fix it',
        category: 'creative',
      },
    ],
    teamwork: [
      {
        scenario: 'You and your friend are cleaning up toys together. What should you do?',
        options: ['Work together', 'Just watch'],
        correctOption: 'Work together',
        category: 'teamwork',
      },
    ],
    timeManagement: [
      {
        scenario: 'You want to play and eat. What should you do?',
        options: ['Eat first, then play', 'Just play'],
        correctOption: 'Eat first, then play',
        category: 'timeManagement',
      },
    ],
  },
  '6-8': {
    everyday: [
      {
        scenario: 'What should you do before going to school in the morning?',
        options: ['Have breakfast and get ready', 'Just sleep', 'Play games'],
        correctOption: 'Have breakfast and get ready',
        category: 'everyday',
      },
      {
        scenario: 'When should you brush your teeth?',
        options: ['Morning and evening', 'Only morning', 'Never'],
        correctOption: 'Morning and evening',
        category: 'everyday',
      },
    ],
    social: [
      {
        scenario: 'Your friend looks sad. What should you do?',
        options: ['Comfort them and ask', 'Ignore them', 'Laugh'],
        correctOption: 'Comfort them and ask',
        category: 'social',
      },
      {
        scenario: 'Your friend won\'t share with you. What do you do?',
        options: ['Ask nicely', 'Take it', 'Cry'],
        correctOption: 'Ask nicely',
        category: 'social',
      },
    ],
    creative: [
      {
        scenario: 'You want to draw but have no paper. What can you do?',
        options: ['Use something else (cardboard, stone)', 'Give up', 'Cry'],
        correctOption: 'Use something else (cardboard, stone)',
        category: 'creative',
      },
      {
        scenario: 'You want to invent a new game. What do you do?',
        options: ['Imagine and try', 'Give up', 'Copy someone else'],
        correctOption: 'Imagine and try',
        category: 'creative',
      },
    ],
    teamwork: [
      {
        scenario: 'Everyone wants something different in the group game. What do you do?',
        options: ['Decide together', 'You decide alone', 'Quit the game'],
        correctOption: 'Decide together',
        category: 'teamwork',
      },
    ],
    timeManagement: [
      {
        scenario: 'You have homework but your friends are playing outside. What do you do?',
        options: ['Finish homework first, then play', 'Just play', 'Don\'t do homework'],
        correctOption: 'Finish homework first, then play',
        category: 'timeManagement',
      },
    ],
  },
  '9-12': {
    everyday: [
      {
        scenario: 'You forgot your homework and it\'s due tomorrow. What do you do?',
        options: ['Start and finish it now', 'Make an excuse', 'Do nothing'],
        correctOption: 'Start and finish it now',
        category: 'everyday',
      },
      {
        scenario: 'How should you use your allowance?',
        options: ['Save some, spend some', 'Spend it all right away', 'Never spend it'],
        correctOption: 'Save some, spend some',
        category: 'everyday',
      },
    ],
    social: [
      {
        scenario: 'A teammate isn\'t working on the group project. What do you do?',
        options: ['Talk kindly and offer help', 'Complain', 'Ignore it'],
        correctOption: 'Talk kindly and offer help',
        category: 'social',
      },
      {
        scenario: 'A new student joined the class and is alone. What do you do?',
        options: ['Go and introduce yourself', 'Wait', 'Do nothing'],
        correctOption: 'Go and introduce yourself',
        category: 'social',
      },
    ],
    creative: [
      {
        scenario: 'You\'re missing materials for your project. What do you do?',
        options: ['Find alternative materials', 'Give up', 'Wait'],
        correctOption: 'Find alternative materials',
        category: 'creative',
      },
      {
        scenario: 'You\'re writing a story but can\'t find ideas. What do you do?',
        options: ['Look around, get inspired', 'Quit', 'Copy'],
        correctOption: 'Look around, get inspired',
        category: 'creative',
      },
    ],
    teamwork: [
      {
        scenario: 'Tasks are being assigned in the group project. What do you do?',
        options: ['Consider everyone\'s strengths and distribute fairly', 'Take the easiest task', 'Do everything yourself'],
        correctOption: 'Consider everyone\'s strengths and distribute fairly',
        category: 'teamwork',
      },
    ],
    timeManagement: [
      {
        scenario: 'You have an exam tomorrow but your friends are going to the movies. What do you do?',
        options: ['Study, go after the exam', 'Go to the movies', 'Do both'],
        correctOption: 'Study, go after the exam',
        category: 'timeManagement',
      },
    ],
  },
  '13-15': {
    everyday: [
      {
        scenario: 'You forgot your homework and it\'s due tomorrow. You also have an exam. What do you do?',
        options: ['Prioritize and plan', 'Make an excuse', 'Panic'],
        correctOption: 'Prioritize and plan',
        category: 'everyday',
      },
      {
        scenario: 'How should you manage your allowance?',
        options: ['Budget, save, and spend wisely', 'Spend it all right away', 'Never spend it'],
        correctOption: 'Budget, save, and spend wisely',
        category: 'everyday',
      },
    ],
    social: [
      {
        scenario: 'A teammate isn\'t working and it\'s affecting the project. What do you do?',
        options: ['Approach with empathy, talk, and find a solution', 'Complain', 'Ignore it'],
        correctOption: 'Approach with empathy, talk, and find a solution',
        category: 'social',
      },
      {
        scenario: 'A new student from a different culture joined the class. What do you do?',
        options: ['Go, introduce yourself, and learn about their culture', 'Wait', 'Stay away'],
        correctOption: 'Go, introduce yourself, and learn about their culture',
        category: 'social',
      },
    ],
    creative: [
      {
        scenario: 'You\'re missing materials for your project and have a limited budget. What do you do?',
        options: ['Find creative alternatives and reuse', 'Give up', 'Wait'],
        correctOption: 'Find creative alternatives and reuse',
        category: 'creative',
      },
      {
        scenario: 'You\'re writing a story but can\'t find ideas. What do you do?',
        options: ['Research, observe, and try different perspectives', 'Quit', 'Copy'],
        correctOption: 'Research, observe, and try different perspectives',
        category: 'creative',
      },
    ],
    teamwork: [
      {
        scenario: 'There\'s a disagreement in the group project and time is running out. What do you do?',
        options: ['Hold a democratic vote and seek compromise', 'Insist on your idea', 'Give up'],
        correctOption: 'Hold a democratic vote and seek compromise',
        category: 'teamwork',
      },
    ],
    timeManagement: [
      {
        scenario: 'You have an exam, a project, and a social event in the same week. What do you do?',
        options: ['Make a detailed schedule and balance', 'Sacrifice one', 'Get stressed'],
        correctOption: 'Make a detailed schedule and balance',
        category: 'timeManagement',
      },
    ],
  },
};

export function getFallbackProblem(
  ageGroup: AgeGroupKey,
  category: ProblemCategory,
  language: LanguageCode
): FallbackProblem {
  const pool = language === 'tr' ? turkishProblems : englishProblems;
  const problems = pool[ageGroup][category];
  return problems[Math.floor(Math.random() * problems.length)];
}
