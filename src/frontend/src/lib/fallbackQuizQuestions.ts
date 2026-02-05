// Expanded fallback quiz questions for all age groups in Turkish and English

type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: string;
};

type QuizPool = {
  [key: string]: {
    [key: string]: QuizQuestion[];
  };
};

const fallbackQuizPool: QuizPool = {
  tr: {
    '3-5': [
      { question: 'Hangi hayvan miyavlar?', options: ['Kedi', 'Köpek', 'Kuş'], correctAnswer: 'Kedi' },
      { question: 'Kaç tane parmağın var?', options: ['5', '10', '20'], correctAnswer: '10' },
      { question: 'Güneş hangi renktir?', options: ['Sarı', 'Mavi', 'Yeşil'], correctAnswer: 'Sarı' },
      { question: 'Hangi şekil yuvarlaktır?', options: ['Daire', 'Kare', 'Üçgen'], correctAnswer: 'Daire' },
      { question: 'Hangi hayvan havlar?', options: ['Köpek', 'Kedi', 'Kuş'], correctAnswer: 'Köpek' },
      { question: 'Gökyüzü hangi renktir?', options: ['Mavi', 'Kırmızı', 'Sarı'], correctAnswer: 'Mavi' },
      { question: 'Hangi hayvan uçar?', options: ['Kuş', 'Kedi', 'Köpek'], correctAnswer: 'Kuş' },
      { question: 'Elma hangi renktir?', options: ['Kırmızı', 'Mavi', 'Mor'], correctAnswer: 'Kırmızı' },
      { question: 'Hangi şekil köşelidir?', options: ['Kare', 'Daire', 'Oval'], correctAnswer: 'Kare' },
      { question: 'Hangi hayvan yumurta yapar?', options: ['Tavuk', 'Köpek', 'Kedi'], correctAnswer: 'Tavuk' },
      { question: 'Gece gökyüzünde ne görürüz?', options: ['Ay', 'Güneş', 'Bulut'], correctAnswer: 'Ay' },
      { question: 'Hangi meyve sarıdır?', options: ['Muz', 'Elma', 'Üzüm'], correctAnswer: 'Muz' },
      { question: 'Hangi hayvan büyüktür?', options: ['Fil', 'Fare', 'Kedi'], correctAnswer: 'Fil' },
      { question: 'Kaç tane gözün var?', options: ['2', '1', '3'], correctAnswer: '2' },
      { question: 'Hangi renk ateş gibidir?', options: ['Kırmızı', 'Mavi', 'Yeşil'], correctAnswer: 'Kırmızı' },
    ],
    '6-8': [
      { question: '5 + 3 = ?', options: ['7', '8', '9'], correctAnswer: '8' },
      { question: 'Bir haftada kaç gün var?', options: ['5', '6', '7'], correctAnswer: '7' },
      { question: 'Hangi mevsim en sıcaktır?', options: ['Yaz', 'Kış', 'Sonbahar'], correctAnswer: 'Yaz' },
      { question: '10 - 4 = ?', options: ['5', '6', '7'], correctAnswer: '6' },
      { question: 'Hangi hayvan denizde yaşar?', options: ['Balık', 'Kedi', 'Köpek'], correctAnswer: 'Balık' },
      { question: 'Bir günde kaç saat var?', options: ['12', '24', '48'], correctAnswer: '24' },
      { question: '3 × 2 = ?', options: ['5', '6', '7'], correctAnswer: '6' },
      { question: 'Hangi gezegen üzerinde yaşıyoruz?', options: ['Dünya', 'Mars', 'Venüs'], correctAnswer: 'Dünya' },
      { question: '15 - 8 = ?', options: ['6', '7', '8'], correctAnswer: '7' },
      { question: 'Bir yılda kaç mevsim var?', options: ['2', '3', '4'], correctAnswer: '4' },
      { question: '4 + 9 = ?', options: ['12', '13', '14'], correctAnswer: '13' },
      { question: 'Hangi hayvan en hızlıdır?', options: ['Çita', 'Kaplumbağa', 'Fil'], correctAnswer: 'Çita' },
      { question: '20 ÷ 4 = ?', options: ['4', '5', '6'], correctAnswer: '5' },
      { question: 'Hangi organ kalp atışını sağlar?', options: ['Kalp', 'Beyin', 'Akciğer'], correctAnswer: 'Kalp' },
      { question: '7 × 3 = ?', options: ['20', '21', '22'], correctAnswer: '21' },
      { question: 'Hangi renk birincil renktir?', options: ['Kırmızı', 'Turuncu', 'Mor'], correctAnswer: 'Kırmızı' },
      { question: '18 - 9 = ?', options: ['8', '9', '10'], correctAnswer: '9' },
      { question: 'Hangi hayvan kutuplarda yaşar?', options: ['Penguen', 'Aslan', 'Maymun'], correctAnswer: 'Penguen' },
    ],
    '9-12': [
      { question: '12 × 3 = ?', options: ['34', '36', '38'], correctAnswer: '36' },
      { question: 'Türkiye\'nin başkenti neresidir?', options: ['İstanbul', 'Ankara', 'İzmir'], correctAnswer: 'Ankara' },
      { question: '50 ÷ 5 = ?', options: ['8', '10', '12'], correctAnswer: '10' },
      { question: 'Bir yılda kaç ay var?', options: ['10', '11', '12'], correctAnswer: '12' },
      { question: 'Hangi gezegen Güneş\'e en yakındır?', options: ['Merkür', 'Venüs', 'Dünya'], correctAnswer: 'Merkür' },
      { question: '15 + 27 = ?', options: ['40', '42', '44'], correctAnswer: '42' },
      { question: '8 × 7 = ?', options: ['54', '56', '58'], correctAnswer: '56' },
      { question: 'Hangi kıta en büyüktür?', options: ['Asya', 'Afrika', 'Avrupa'], correctAnswer: 'Asya' },
      { question: '100 - 37 = ?', options: ['61', '63', '65'], correctAnswer: '63' },
      { question: 'Hangi organ vücutta kan pompalar?', options: ['Kalp', 'Karaciğer', 'Böbrek'], correctAnswer: 'Kalp' },
      { question: '9 × 9 = ?', options: ['79', '81', '83'], correctAnswer: '81' },
      { question: 'Hangi okyanus en büyüktür?', options: ['Pasifik', 'Atlantik', 'Hint'], correctAnswer: 'Pasifik' },
      { question: '144 ÷ 12 = ?', options: ['10', '11', '12'], correctAnswer: '12' },
      { question: 'Hangi element suyun formülündedir?', options: ['Hidrojen', 'Karbon', 'Azot'], correctAnswer: 'Hidrojen' },
      { question: '25 × 4 = ?', options: ['98', '100', '102'], correctAnswer: '100' },
      { question: 'Hangi gezegen en büyüktür?', options: ['Jüpiter', 'Satürn', 'Neptün'], correctAnswer: 'Jüpiter' },
      { question: '75 + 48 = ?', options: ['121', '123', '125'], correctAnswer: '123' },
      { question: 'Hangi yıl İstanbul fethedildi?', options: ['1451', '1453', '1455'], correctAnswer: '1453' },
    ],
    '13-15': [
      { question: '144 ÷ 12 = ?', options: ['10', '11', '12'], correctAnswer: '12' },
      { question: 'Hangi element su molekülünde bulunur?', options: ['Hidrojen', 'Karbon', 'Azot'], correctAnswer: 'Hidrojen' },
      { question: '2³ = ?', options: ['6', '8', '9'], correctAnswer: '8' },
      { question: 'Fotosent hangi organelde gerçekleşir?', options: ['Kloroplast', 'Mitokondri', 'Ribozom'], correctAnswer: 'Kloroplast' },
      { question: '√64 = ?', options: ['6', '7', '8'], correctAnswer: '8' },
      { question: 'Hangi yıl Cumhuriyet ilan edildi?', options: ['1920', '1923', '1925'], correctAnswer: '1923' },
      { question: '15² = ?', options: ['215', '225', '235'], correctAnswer: '225' },
      { question: 'Hangi element periyodik tabloda Au sembolüyle gösterilir?', options: ['Altın', 'Gümüş', 'Bakır'], correctAnswer: 'Altın' },
      { question: '3⁴ = ?', options: ['79', '81', '83'], correctAnswer: '81' },
      { question: 'Hangi bilim insanı görelilik teorisini geliştirdi?', options: ['Einstein', 'Newton', 'Galileo'], correctAnswer: 'Einstein' },
      { question: '√144 = ?', options: ['10', '11', '12'], correctAnswer: '12' },
      { question: 'DNA\'nın açılımı nedir?', options: ['Deoksiribonükleik Asit', 'Ribonükleik Asit', 'Amino Asit'], correctAnswer: 'Deoksiribonükleik Asit' },
      { question: '7² + 3² = ?', options: ['56', '58', '60'], correctAnswer: '58' },
      { question: 'Hangi gezegen kırmızı gezegen olarak bilinir?', options: ['Mars', 'Venüs', 'Jüpiter'], correctAnswer: 'Mars' },
      { question: '256 ÷ 16 = ?', options: ['14', '15', '16'], correctAnswer: '16' },
      { question: 'Hangi element en hafif elementtir?', options: ['Hidrojen', 'Helyum', 'Lityum'], correctAnswer: 'Hidrojen' },
      { question: '12 × 12 = ?', options: ['142', '144', '146'], correctAnswer: '144' },
      { question: 'Hangi yıl I. Dünya Savaşı başladı?', options: ['1912', '1914', '1916'], correctAnswer: '1914' },
    ],
  },
  en: {
    '3-5': [
      { question: 'Which animal meows?', options: ['Cat', 'Dog', 'Bird'], correctAnswer: 'Cat' },
      { question: 'How many fingers do you have?', options: ['5', '10', '20'], correctAnswer: '10' },
      { question: 'What color is the sun?', options: ['Yellow', 'Blue', 'Green'], correctAnswer: 'Yellow' },
      { question: 'Which shape is round?', options: ['Circle', 'Square', 'Triangle'], correctAnswer: 'Circle' },
      { question: 'Which animal barks?', options: ['Dog', 'Cat', 'Bird'], correctAnswer: 'Dog' },
      { question: 'What color is the sky?', options: ['Blue', 'Red', 'Yellow'], correctAnswer: 'Blue' },
      { question: 'Which animal can fly?', options: ['Bird', 'Cat', 'Dog'], correctAnswer: 'Bird' },
      { question: 'What color is an apple?', options: ['Red', 'Blue', 'Purple'], correctAnswer: 'Red' },
      { question: 'Which shape has corners?', options: ['Square', 'Circle', 'Oval'], correctAnswer: 'Square' },
      { question: 'Which animal lays eggs?', options: ['Chicken', 'Dog', 'Cat'], correctAnswer: 'Chicken' },
      { question: 'What do we see in the night sky?', options: ['Moon', 'Sun', 'Cloud'], correctAnswer: 'Moon' },
      { question: 'Which fruit is yellow?', options: ['Banana', 'Apple', 'Grape'], correctAnswer: 'Banana' },
      { question: 'Which animal is big?', options: ['Elephant', 'Mouse', 'Cat'], correctAnswer: 'Elephant' },
      { question: 'How many eyes do you have?', options: ['2', '1', '3'], correctAnswer: '2' },
      { question: 'Which color is like fire?', options: ['Red', 'Blue', 'Green'], correctAnswer: 'Red' },
    ],
    '6-8': [
      { question: '5 + 3 = ?', options: ['7', '8', '9'], correctAnswer: '8' },
      { question: 'How many days in a week?', options: ['5', '6', '7'], correctAnswer: '7' },
      { question: 'Which season is hottest?', options: ['Summer', 'Winter', 'Fall'], correctAnswer: 'Summer' },
      { question: '10 - 4 = ?', options: ['5', '6', '7'], correctAnswer: '6' },
      { question: 'Which animal lives in the sea?', options: ['Fish', 'Cat', 'Dog'], correctAnswer: 'Fish' },
      { question: 'How many hours in a day?', options: ['12', '24', '48'], correctAnswer: '24' },
      { question: '3 × 2 = ?', options: ['5', '6', '7'], correctAnswer: '6' },
      { question: 'Which planet do we live on?', options: ['Earth', 'Mars', 'Venus'], correctAnswer: 'Earth' },
      { question: '15 - 8 = ?', options: ['6', '7', '8'], correctAnswer: '7' },
      { question: 'How many seasons in a year?', options: ['2', '3', '4'], correctAnswer: '4' },
      { question: '4 + 9 = ?', options: ['12', '13', '14'], correctAnswer: '13' },
      { question: 'Which animal is fastest?', options: ['Cheetah', 'Turtle', 'Elephant'], correctAnswer: 'Cheetah' },
      { question: '20 ÷ 4 = ?', options: ['4', '5', '6'], correctAnswer: '5' },
      { question: 'Which organ pumps blood?', options: ['Heart', 'Brain', 'Lung'], correctAnswer: 'Heart' },
      { question: '7 × 3 = ?', options: ['20', '21', '22'], correctAnswer: '21' },
      { question: 'Which is a primary color?', options: ['Red', 'Orange', 'Purple'], correctAnswer: 'Red' },
      { question: '18 - 9 = ?', options: ['8', '9', '10'], correctAnswer: '9' },
      { question: 'Which animal lives at the poles?', options: ['Penguin', 'Lion', 'Monkey'], correctAnswer: 'Penguin' },
    ],
    '9-12': [
      { question: '12 × 3 = ?', options: ['34', '36', '38'], correctAnswer: '36' },
      { question: 'What is the capital of France?', options: ['London', 'Paris', 'Berlin'], correctAnswer: 'Paris' },
      { question: '50 ÷ 5 = ?', options: ['8', '10', '12'], correctAnswer: '10' },
      { question: 'How many months in a year?', options: ['10', '11', '12'], correctAnswer: '12' },
      { question: 'Which planet is closest to the Sun?', options: ['Mercury', 'Venus', 'Earth'], correctAnswer: 'Mercury' },
      { question: '15 + 27 = ?', options: ['40', '42', '44'], correctAnswer: '42' },
      { question: '8 × 7 = ?', options: ['54', '56', '58'], correctAnswer: '56' },
      { question: 'Which continent is largest?', options: ['Asia', 'Africa', 'Europe'], correctAnswer: 'Asia' },
      { question: '100 - 37 = ?', options: ['61', '63', '65'], correctAnswer: '63' },
      { question: 'Which organ pumps blood in the body?', options: ['Heart', 'Liver', 'Kidney'], correctAnswer: 'Heart' },
      { question: '9 × 9 = ?', options: ['79', '81', '83'], correctAnswer: '81' },
      { question: 'Which ocean is largest?', options: ['Pacific', 'Atlantic', 'Indian'], correctAnswer: 'Pacific' },
      { question: '144 ÷ 12 = ?', options: ['10', '11', '12'], correctAnswer: '12' },
      { question: 'Which element is in water?', options: ['Hydrogen', 'Carbon', 'Nitrogen'], correctAnswer: 'Hydrogen' },
      { question: '25 × 4 = ?', options: ['98', '100', '102'], correctAnswer: '100' },
      { question: 'Which planet is largest?', options: ['Jupiter', 'Saturn', 'Neptune'], correctAnswer: 'Jupiter' },
      { question: '75 + 48 = ?', options: ['121', '123', '125'], correctAnswer: '123' },
      { question: 'What year did Columbus reach America?', options: ['1490', '1492', '1494'], correctAnswer: '1492' },
    ],
    '13-15': [
      { question: '144 ÷ 12 = ?', options: ['10', '11', '12'], correctAnswer: '12' },
      { question: 'Which element is in water?', options: ['Hydrogen', 'Carbon', 'Nitrogen'], correctAnswer: 'Hydrogen' },
      { question: '2³ = ?', options: ['6', '8', '9'], correctAnswer: '8' },
      { question: 'Where does photosynthesis occur?', options: ['Chloroplast', 'Mitochondria', 'Ribosome'], correctAnswer: 'Chloroplast' },
      { question: '√64 = ?', options: ['6', '7', '8'], correctAnswer: '8' },
      { question: 'What year was the UN founded?', options: ['1943', '1945', '1947'], correctAnswer: '1945' },
      { question: '15² = ?', options: ['215', '225', '235'], correctAnswer: '225' },
      { question: 'Which element has symbol Au?', options: ['Gold', 'Silver', 'Copper'], correctAnswer: 'Gold' },
      { question: '3⁴ = ?', options: ['79', '81', '83'], correctAnswer: '81' },
      { question: 'Who developed relativity theory?', options: ['Einstein', 'Newton', 'Galileo'], correctAnswer: 'Einstein' },
      { question: '√144 = ?', options: ['10', '11', '12'], correctAnswer: '12' },
      { question: 'What does DNA stand for?', options: ['Deoxyribonucleic Acid', 'Ribonucleic Acid', 'Amino Acid'], correctAnswer: 'Deoxyribonucleic Acid' },
      { question: '7² + 3² = ?', options: ['56', '58', '60'], correctAnswer: '58' },
      { question: 'Which planet is the red planet?', options: ['Mars', 'Venus', 'Jupiter'], correctAnswer: 'Mars' },
      { question: '256 ÷ 16 = ?', options: ['14', '15', '16'], correctAnswer: '16' },
      { question: 'Which is the lightest element?', options: ['Hydrogen', 'Helium', 'Lithium'], correctAnswer: 'Hydrogen' },
      { question: '12 × 12 = ?', options: ['142', '144', '146'], correctAnswer: '144' },
      { question: 'What year did WWI start?', options: ['1912', '1914', '1916'], correctAnswer: '1914' },
    ],
  },
};

export function getFallbackQuizQuestions(
  ageGroup: string,
  language: string
): QuizQuestion[] {
  const lang = language === 'tr' ? 'tr' : 'en';
  const pool = fallbackQuizPool[lang];
  
  if (!pool || !pool[ageGroup]) {
    // Return default pool if age group not found
    return pool?.['6-8'] || fallbackQuizPool.en['6-8'];
  }
  
  return pool[ageGroup];
}
