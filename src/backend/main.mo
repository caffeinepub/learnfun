import Text "mo:core/Text";
import Map "mo:core/Map";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import Iter "mo:core/Iter";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import Array "mo:core/Array";

actor {
  include MixinStorage();

  type AgeGroup = {
    #threeToFive;
    #sixToEight;
    #nineToTwelve;
    #thirteenToFifteen;
  };

  type ColoringCategory = {
    #animals;
    #objects;
    #characters;
  };

  type Language = {
    #turkish;
    #english;
    #spanish;
    #french;
    #german;
    #italian;
    #russian;
    #portuguese;
    #chinese;
    #japanese;
  };

  type LocalizedText = {
    turkish : Text;
    english : Text;
    spanish : Text;
    french : Text;
    german : Text;
    italian : Text;
    russian : Text;
    portuguese : Text;
    chinese : Text;
    japanese : Text;
  };

  type Question = {
    question : LocalizedText;
    options : [LocalizedText];
    correctAnswer : LocalizedText;
  };

  type Game = {
    name : LocalizedText;
    description : LocalizedText;
    ageGroup : AgeGroup;
  };

  type SimpleQuestion = {
    question : ?Text;
    options : [Text];
    correctAnswer : ?Text;
  };

  type SimpleGame = {
    name : ?Text;
    description : ?Text;
    ageGroup : AgeGroup;
  };

  type MemoryGame = {
    patterns : Text;
    difficulty : Nat;
    language : Language;
  };

  type LogicPuzzle = {
    question : LocalizedText;
    answer : LocalizedText;
    difficulty : Nat;
  };

  type VisualRecognition = {
    imageId : Text;
    differences : Nat;
    language : Language;
  };

  type ProblemSolving = {
    scenario : LocalizedText;
    options : [LocalizedText];
    correctOption : LocalizedText;
  };

  type SoundCategory = {
    #music;
    #environmental;
    #animal;
    #vehicle;
    #instrument;
  };

  type Sound = {
    name : Text;
    file : Storage.ExternalBlob;
    category : SoundCategory;
  };

  type ColoringTemplate = {
    id : Text;
    ageGroup : AgeGroup;
    category : ColoringCategory;
    template : Storage.ExternalBlob;
  };

  type ColoringTemplateWithData = {
    id : Text;
    ageGroup : AgeGroup;
    category : ColoringCategory;
    template : Storage.ExternalBlob;
  };

  let quizQuestions = Map.empty<Text, [Question]>();
  let games = Map.empty<Text, [Game]>();
  let memoryGames = Map.empty<Text, [MemoryGame]>();
  let logicPuzzles = Map.empty<Text, [LogicPuzzle]>();
  let visualRecognitionTasks = Map.empty<Text, [VisualRecognition]>();
  let problemSolvingTasks = Map.empty<Text, [ProblemSolving]>();
  let encouragementMessages = Map.empty<Language, [Text]>();
  let soundCategories = Map.empty<Text, SoundCategory>();
  let sounds = Map.empty<Text, Sound>();
  let coloringTemplates = Map.empty<Text, ColoringTemplate>();
  var nextSoundIndex = 0;

  func getLocalizedText(localized : LocalizedText, language : Language) : Text {
    switch (language) {
      case (#turkish) { localized.turkish };
      case (#english) { localized.english };
      case (#spanish) { localized.spanish };
      case (#french) { localized.french };
      case (#german) { localized.german };
      case (#italian) { localized.italian };
      case (#russian) { localized.russian };
      case (#portuguese) { localized.portuguese };
      case (#chinese) { localized.chinese };
      case (#japanese) { localized.japanese };
    };
  };

  func convertQuestion(question : Question, language : Language) : SimpleQuestion {
    let options = question.options.map(
      func(option) { getLocalizedText(option, language) }
    );

    let questionText = getLocalizedText(question.question, language);
    let correctAnswerText = getLocalizedText(question.correctAnswer, language);

    {
      question = ?questionText;
      options;
      correctAnswer = ?correctAnswerText;
    };
  };

  func convertGame(game : Game, language : Language) : SimpleGame {
    let nameText = getLocalizedText(game.name, language);
    let descriptionText = getLocalizedText(game.description, language);

    {
      name = ?nameText;
      description = ?descriptionText;
      ageGroup = game.ageGroup;
    };
  };

  func shuffleArray<T>(array : [T]) : [T] {
    let size = array.size();
    if (size <= 1) { return array };

    let seed = 1000;
    let randomIndex = func(i : Nat) : Nat {
      let randomInt = 100;
      let j = Int.abs(randomInt % (size.toInt())) % (i + 1);
      j;
    };

    let result = array.toVarArray();
    var i = (size - 1 : Nat).toInt();
    while (i > 0) {
      let j = randomIndex(Int.abs(i) % size);
      if (j.toInt() != i) {
        let temp = result[Int.abs(i)];
        result[Int.abs(i)] := result[j];
        result[j] := temp;
      };
      i -= 1;
    };
    result.toArray();
  };

  func take<T>(array : [T], count : Nat) : [T] {
    let size = array.size();
    if (count >= size) { return array };
    Array.tabulate<T>(count, func(i) { array[i] });
  };

  public query ({}) func getQuizQuestions(ageGroup : Text, language : Language) : async [SimpleQuestion] {
    let questions = switch (quizQuestions.get(ageGroup)) {
      case (null) { [] };
      case (?questions) { questions };
    };

    questions.map(func(q) { convertQuestion(q, language) });
  };

  public query ({}) func getGames(ageGroup : Text, language : Language) : async [SimpleGame] {
    let gamesList = switch (games.get(ageGroup)) {
      case (null) { [] };
      case (?gamesList) { gamesList };
    };

    gamesList.map(func(g) { convertGame(g, language) });
  };

  public query ({}) func getMemoryGames(ageGroup : Text) : async [MemoryGame] {
    switch (memoryGames.get(ageGroup)) {
      case (null) { [] };
      case (?games) { games };
    };
  };

  public query ({}) func getLogicPuzzles(ageGroup : Text) : async [LogicPuzzle] {
    switch (logicPuzzles.get(ageGroup)) {
      case (null) { [] };
      case (?puzzles) { puzzles };
    };
  };

  public query ({}) func getVisualRecognitionTasks(ageGroup : Text) : async [VisualRecognition] {
    switch (visualRecognitionTasks.get(ageGroup)) {
      case (null) { [] };
      case (?tasks) { tasks };
    };
  };

  public query ({}) func getProblemSolvingTasks(ageGroup : Text) : async [ProblemSolving] {
    switch (problemSolvingTasks.get(ageGroup)) {
      case (null) { [] };
      case (?tasks) { tasks };
    };
  };

  public query ({}) func getRandomizedQuizQuestions(ageGroup : Text, language : Language, count : Nat) : async [SimpleQuestion] {
    let questions = switch (quizQuestions.get(ageGroup)) {
      case (null) { return [] };
      case (?questions) { questions };
    };

    if (questions.size() == 0) { return [] };

    let converted = questions.map(func(q) { convertQuestion(q, language) });

    let shuffled = shuffleArray(converted);
    if (shuffled.size() <= count) {
      shuffled;
    } else {
      take(shuffled, count);
    };
  };

  public query ({}) func getEncouragementMessage(level : Nat, language : Language) : async Text {
    let turkishMessages = [
      "Harika! " # level.toText() # ". Seviyeyi tamamladın!",
      "Çok iyi gidiyorsun!",
      "Süper! Daha fazlasını başarabilirsin!",
      "Muazzam! Başarıların artıyor!",
      "Farklı şeyler deneyerek öğrenmek çok eğlenceli!",
      "Her seviyede daha da güçleniyorsun, böyle devam et!",
      "Bak, ne kadar ilerledin! Pes etmemeye devam et – bu harika!",
      "Şimdiye kadar çok yol kat ettin. Yeni şeyler denemekten korkma!",
      "Bazı seviyeler zor gelebilir ama denemeye devam et!",
      "Denemekten asla korkma – başarının sırrı çok çalışmakta!",
      "Herhangi bir şey ilk başta zor olabilir, ancak tekrar deneyince işlerin kolaylaştığını göreceksin. İlerde çok şey başarabilirsin.",
      "Yeni bir seviyeyi her tamamladığında harika deneyimler kazanıyorsun.",
      "Yanlış cevaplar ilerlemenin bir göstergesi – asıl önemli olan öğrenmek. Denemeye devam et!",
      "Bazen başarısız olmak sorun değildir – tekrar denediğinde başarı gelecektir.",
      "Zorluklar sayesinde gelişirsin, denemeye devam et!",
    ];

    let englishMessages = [
      "Great job! You completed level " # level.toText() # "!",
      "You're doing amazing!",
      "Fantastic! You can achieve more!",
      "Awesome! You're becoming a skill master!",
      "Keep experimenting to learn new things!",
      "You're getting stronger every level, keep going!",
      "Look how far you've come! Keep pushing forward - you're doing fantastic!",
      "You've come a long way already. Don't be afraid to try something new!",
      "Some levels may be tricky, but keep going and you'll get there!",
      "Don't be afraid to make mistakes - that's how you grow!",
      "Things may seem new and tricky at first, but keep trying and you'll get the hang of it!",
      "Every time you complete a level, you're building valuable skills.",
      "Mistakes are signs of progress - keep learning and improving!",
      "It's okay to not get it right the first time - keep practicing!",
      "Challenges help you grow, don't give up!",
    ];

    let frenchMessages = [
      "Bravo! Tu as terminé le niveau " # level.toText() # "!",
      "Continue comme ça, tu es sur la bonne voie!",
      "Super, tu progresses chaque jour!",
    ];

    let italianMessages = [
      "Bravo! Hai completato il livello " # level.toText() # "!",
      "Stai andando benissimo!",
      "Fantastico! Puoi ottenere ancora di più!",
      "Super! Stai diventando un vero esperto!",
      "Continua a sperimentare per imparare nuove cose.",
      "Diventi più bravo a ogni livello, continua così!",
      "Guarda quanto sei migliorato! Non mollare, stai facendo un ottimo lavoro.",
      "Hai già fatto molta strada. Prova anche qualcosa di nuovo!",
      "Alcuni livelli possono essere difficili, ma continua a provare!",
      "Non avere paura a sbagliare: così si impara.",
      "Le cose nuove possono sembrare difficili all'inizio, ma riprovando diventano più facili.",
      "Ogni livello che completi ti dà nuove abilità.",
      "Gli errori indicano che stai facendo progressi: continua a imparare!",
      "Non preoccuparti se non riesci subito: basta esercitarsi!",
      "Le difficoltà ti aiutano a crescere.",
    ];

    let portugueseMessages = [
      "Muito bem! Você completou o nível " # level.toText() # "!",
      "Você está indo muito bem!",
      "Fantástico! Você pode conquistar ainda mais.",
      "Incrível! Suas habilidades estão crescendo.",
      "Continue experimentando para aprender coisas novas.",
      "A cada nível, você fica mais forte, continue assim!",
      "Veja quanto já progrediu! Siga tentando - você está ótimo.",
      "Já veio de longe. Não tenha medo de experimentar coisas novas.",
      "Alguns níveis podem ser difíceis, mas continue tentando!",
      "Não tenha medo de cometer erros - é assim que se aprende.",
      "As coisas podem parecer difíceis no começo, mas continue tentando.",
      "Sempre que completa um nível, você conquista novas habilidades.",
      "Os erros mostram que está evoluindo - continue aprendendo.",
      "Não tem problema se não acertar na primeira vez - pratique!",
      "Desafios te ajudam a crescer.",
    ];

    let russianMessages = [
      "Молодец! Ты прошел уровень " # level.toText() # "!",
      "Ты отлично справляешься!",
      "Фантастика! Ты можешь добиться еще большего!",
      "Отлично! Ты совершенствуешь свои навыки!",
      "Продолжай экспериментировать, чтобы узнавать новое.",
      "С каждым уровнем ты становишься сильнее, продолжай!",
      "Посмотри, как далеко ты зашел! Не останавливайся - у тебя отлично получается!",
      "Ты уже много достиг. Не бойся пробовать что-то новое!",
      "Некоторые уровни бывают сложными, но продолжай стараться!",
      "Не бойся ошибаться - так ты учишься!",
      "Вначале все кажется трудным, но если снова пробовать, получится!",
      "С каждым новым уровнем ты становишься умнее.",
      "Ошибки показывают, что ты развиваешься - продолжай учиться.",
      "Не важно, если не получится с первого раза - тренируйся!",
      "Трудности делают тебя сильнее, не сдавайся!",
    ];

    let chineseMessages = [
      "太棒了！你完成了第" # level.toText() # "关！",
      "你做得非常棒！",
      "太好了，继续努力可以做到更多！",
      "厉害！你的能力正在飞速提升！",
      "多尝试新事物，学习变得更有趣！",
      "每通过一关你都变得更厉害，继续加油！",
      "看看你已经取得多远的进步了！要继续坚持-太棒了！",
      "你已经取得了很大进步，不要害怕尝试新事物！",
      "有些关卡可能会比较难，但坚持下去，你会做到的。",
      "不要害怕犯错-这是成长的必经之路！",
      "一开始可能会觉得陌生和有挑战性，坚持下去你也会适应！",
      "每通过一关都在积累宝贵的能力。",
      "犯错是进步的标志-继续学习和成长吧！",
      "第一次没做好也没关系-坚持练习就好！",
      "挑战会让你成长，不要轻易放弃！",
    ];

    let japaneseMessages = [
      "すごい！レベル" # level.toText() # "をクリアしたね！",
      "とてもよくできているよ！",
      "素晴らしいよ！もっとできるはず！",
      "やったね！レベルアップもどんどんしているよ！",
      "新しいことに挑戦して、もっと学んでいこうね！",
      "レベルごとに強くなっているね、このまま頑張って！",
      "ここまで成長できたね。あきらめずに頑張ろう！",
      "今までよくがんばったね。新しいことにチャレンジしよう！",
      "レベルによっては難しく感じるかもしれないけど、諦めずに続けよう！",
      "失敗を恐れないでね。失敗は成長のチャンス！",
      "最初は難しく感じるかもしれないけど、何度もチャレンジすれば必ず上達するよ！",
      "レベルをクリアするたびに新しい力が身につくよ！",
      "ミスは進歩している証拠！これからもっと学んでいこう！",
      "一度でできなくても大丈夫。何度も挑戦すれば良いよ！",
      "チャレンジは成長のための大切なステップだよ。諦めないで！",
    ];

    let languageMessages = switch (language) {
      case (#turkish) { turkishMessages };
      case (#english) { englishMessages };
      case (#french) { frenchMessages };
      case (#italian) { italianMessages };
      case (#portuguese) { portugueseMessages };
      case (#russian) { russianMessages };
      case (#chinese) { chineseMessages };
      case (#japanese) { japaneseMessages };
      case (_) { [] };
    };

    let messageCount = languageMessages.size();
    if (messageCount == 0) {
      return "Keep going!";
    };

    let index = if (level <= messageCount) { level } else {
      let adjusted = (level - 1 : Nat).toInt() % messageCount + 1;
      adjusted.toNat();
    };

    let adjustedIndex = if (index == 0) { 0 } else { index - 1 : Nat };

    languageMessages[adjustedIndex];
  };

  public query ({}) func getSoundCategories() : async [Text] {
    soundCategories.keys().toArray();
  };

  public query ({}) func getSoundsByCategory(categoryName : Text) : async [(Text, Storage.ExternalBlob)] {
    switch (soundCategories.get(categoryName)) {
      case (null) { [] };
      case (?_) {
        let filteredSounds = sounds.toArray().filter(
          func((_, sound)) {
            switch (sounds.get(sound.name)) {
              case (null) { false };
              case (?s) { s.category == sound.category };
            };
          }
        );

        filteredSounds.map(
          func((_, sound)) {
            (sound.name, sound.file);
          }
        );
      };
    };
  };

  public query ({}) func getSoundByName(soundName : Text) : async ?Storage.ExternalBlob {
    switch (sounds.get(soundName)) {
      case (null) { null };
      case (?sound) { ?sound.file };
    };
  };

  public query ({}) func getRandomSoundByCategory(categoryName : Text) : async ?Storage.ExternalBlob {
    switch (soundCategories.get(categoryName)) {
      case (null) { null };
      case (?category) {
        let filteredSounds = sounds.toArray().filter(
          func((_, sound)) { sound.category == category }
        );

        if (filteredSounds.size() == 0) { return null };

        let randomIndex = nextSoundIndex % filteredSounds.size();
        nextSoundIndex += 1;
        ?filteredSounds[randomIndex].1.file;
      };
    };
  };

  public query ({}) func getColoringTemplatesByAgeGroup(ageGroup : AgeGroup) : async [ColoringTemplateWithData] {
    let filteredTemplates = coloringTemplates.values().toArray().filter(
      func(template) { template.ageGroup == ageGroup }
    );

    filteredTemplates.map(
      func(template) {
        {
          id = template.id;
          ageGroup = template.ageGroup;
          category = template.category;
          template = template.template;
        };
      }
    );
  };

  public query ({}) func getColoringTemplateById(templateId : Text) : async ?ColoringTemplateWithData {
    switch (coloringTemplates.get(templateId)) {
      case (null) { null };
      case (?template) {
        ?{
          id = template.id;
          ageGroup = template.ageGroup;
          category = template.category;
          template = template.template;
        };
      };
    };
  };

  public query ({}) func getColoringTemplatesByCategory(category : ColoringCategory) : async [ColoringTemplateWithData] {
    let filteredTemplates = coloringTemplates.values().toArray().filter(
      func(template) { template.category == category }
    );

    filteredTemplates.map(
      func(template) {
        {
          id = template.id;
          ageGroup = template.ageGroup;
          category = template.category;
          template = template.template;
        };
      }
    );
  };

  public query ({}) func getAllColoringTemplates() : async [ColoringTemplateWithData] {
    coloringTemplates.values().toArray().map(
      func(template) {
        {
          id = template.id;
          ageGroup = template.ageGroup;
          category = template.category;
          template = template.template;
        };
      }
    );
  };
};
