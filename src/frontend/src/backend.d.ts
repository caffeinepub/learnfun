import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface LocalizedText {
    portuguese: string;
    japanese: string;
    chinese: string;
    turkish: string;
    italian: string;
    spanish: string;
    german: string;
    french: string;
    russian: string;
    english: string;
}
export interface SimpleQuestion {
    question?: string;
    correctAnswer?: string;
    options: Array<string>;
}
export interface LogicPuzzle {
    question: LocalizedText;
    difficulty: bigint;
    answer: LocalizedText;
}
export interface ProblemSolving {
    correctOption: LocalizedText;
    scenario: LocalizedText;
    options: Array<LocalizedText>;
}
export interface SimpleGame {
    name?: string;
    description?: string;
    ageGroup: AgeGroup;
}
export interface MemoryGame {
    patterns: string;
    difficulty: bigint;
    language: Language;
}
export interface ColoringTemplateWithData {
    id: string;
    template: ExternalBlob;
    category: ColoringCategory;
    ageGroup: AgeGroup;
}
export interface VisualRecognition {
    differences: bigint;
    language: Language;
    imageId: string;
}
export enum AgeGroup {
    threeToFive = "threeToFive",
    nineToTwelve = "nineToTwelve",
    thirteenToFifteen = "thirteenToFifteen",
    sixToEight = "sixToEight"
}
export enum ColoringCategory {
    characters = "characters",
    animals = "animals",
    objects = "objects"
}
export enum Language {
    portuguese = "portuguese",
    japanese = "japanese",
    chinese = "chinese",
    turkish = "turkish",
    italian = "italian",
    spanish = "spanish",
    german = "german",
    french = "french",
    russian = "russian",
    english = "english"
}
export interface backendInterface {
    getAllColoringTemplates(): Promise<Array<ColoringTemplateWithData>>;
    getColoringTemplateById(templateId: string): Promise<ColoringTemplateWithData | null>;
    getColoringTemplatesByAgeGroup(ageGroup: AgeGroup): Promise<Array<ColoringTemplateWithData>>;
    getColoringTemplatesByCategory(category: ColoringCategory): Promise<Array<ColoringTemplateWithData>>;
    getEncouragementMessage(level: bigint, language: Language): Promise<string>;
    getGames(ageGroup: string, language: Language): Promise<Array<SimpleGame>>;
    getLogicPuzzles(ageGroup: string): Promise<Array<LogicPuzzle>>;
    getMemoryGames(ageGroup: string): Promise<Array<MemoryGame>>;
    getProblemSolvingTasks(ageGroup: string): Promise<Array<ProblemSolving>>;
    getQuizQuestions(ageGroup: string, language: Language): Promise<Array<SimpleQuestion>>;
    getRandomSoundByCategory(categoryName: string): Promise<ExternalBlob | null>;
    getRandomizedQuizQuestions(ageGroup: string, language: Language, count: bigint): Promise<Array<SimpleQuestion>>;
    getSoundByName(soundName: string): Promise<ExternalBlob | null>;
    getSoundCategories(): Promise<Array<string>>;
    getSoundsByCategory(categoryName: string): Promise<Array<[string, ExternalBlob]>>;
    getVisualRecognitionTasks(ageGroup: string): Promise<Array<VisualRecognition>>;
}
