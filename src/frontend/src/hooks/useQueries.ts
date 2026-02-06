import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useLanguage } from '../contexts/LanguageContext';
import { AgeGroup as BackendAgeGroup } from '../backend';
import type { SimpleGame, SimpleQuestion, MemoryGame, LogicPuzzle, VisualRecognition, ProblemSolving, ColoringTemplateWithData } from '../backend';
import type { AgeGroup } from '../App';

// Map frontend age group strings to backend age group strings
function mapAgeGroupToBackend(ageGroup: AgeGroup): string {
  if (!ageGroup) return '';
  
  const mapping: Record<string, string> = {
    '3-5': 'threeToFive',
    '6-8': 'sixToEight',
    '9-12': 'nineToTwelve',
    '13-15': 'thirteenToFifteen',
  };
  
  return mapping[ageGroup] || '';
}

// Map frontend age group to backend enum
function mapAgeGroupToBackendEnum(ageGroup: AgeGroup): BackendAgeGroup | null {
  if (!ageGroup) return null;
  
  const mapping: Record<string, BackendAgeGroup> = {
    '3-5': BackendAgeGroup.threeToFive,
    '6-8': BackendAgeGroup.sixToEight,
    '9-12': BackendAgeGroup.nineToTwelve,
    '13-15': BackendAgeGroup.thirteenToFifteen,
  };
  
  return mapping[ageGroup] || null;
}

export function useGames(ageGroup: AgeGroup) {
  const { actor, isFetching } = useActor();
  const { backendLanguage } = useLanguage();
  const backendAgeGroup = mapAgeGroupToBackend(ageGroup);

  return useQuery<SimpleGame[]>({
    queryKey: ['games', backendAgeGroup, backendLanguage],
    queryFn: async () => {
      if (!actor || !backendAgeGroup) return [];
      try {
        const games = await actor.getGames(backendAgeGroup, backendLanguage);
        return games || [];
      } catch (error) {
        console.error('Error fetching games:', error);
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!backendAgeGroup,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}

export function useQuizQuestions(ageGroup: AgeGroup) {
  const { actor, isFetching } = useActor();
  const { backendLanguage } = useLanguage();
  const backendAgeGroup = mapAgeGroupToBackend(ageGroup);

  return useQuery<SimpleQuestion[]>({
    queryKey: ['quiz-questions', backendAgeGroup, backendLanguage],
    queryFn: async () => {
      if (!actor || !backendAgeGroup) return [];
      try {
        const questions = await actor.getQuizQuestions(backendAgeGroup, backendLanguage);
        return questions || [];
      } catch (error) {
        console.error('Error fetching quiz questions:', error);
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!backendAgeGroup,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}

export function useEncouragementMessage(level: number) {
  const { actor, isFetching } = useActor();
  const { backendLanguage } = useLanguage();

  return useQuery<string>({
    queryKey: ['encouragement', level, backendLanguage],
    queryFn: async () => {
      if (!actor) return '';
      try {
        return await actor.getEncouragementMessage(BigInt(level), backendLanguage);
      } catch (error) {
        console.error('Error fetching encouragement message:', error);
        return '';
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 10 * 60 * 1000,
    retry: 1,
  });
}

export function useMemoryGames(ageGroup: AgeGroup) {
  const { actor, isFetching } = useActor();
  const backendAgeGroup = mapAgeGroupToBackend(ageGroup);

  return useQuery<MemoryGame[]>({
    queryKey: ['memory-games', backendAgeGroup],
    queryFn: async () => {
      if (!actor || !backendAgeGroup) return [];
      try {
        const games = await actor.getMemoryGames(backendAgeGroup);
        return games || [];
      } catch (error) {
        console.error('Error fetching memory games:', error);
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!backendAgeGroup,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}

export function useLogicPuzzles(ageGroup: AgeGroup) {
  const { actor, isFetching } = useActor();
  const { backendLanguage } = useLanguage();
  const backendAgeGroup = mapAgeGroupToBackend(ageGroup);

  return useQuery<LogicPuzzle[]>({
    queryKey: ['logic-puzzles', backendAgeGroup, backendLanguage],
    queryFn: async () => {
      if (!actor || !backendAgeGroup) return [];
      try {
        const puzzles = await actor.getLogicPuzzles(backendAgeGroup);
        return puzzles || [];
      } catch (error) {
        console.error('Error fetching logic puzzles:', error);
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!backendAgeGroup,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}

export function useVisualRecognitionTasks(ageGroup: AgeGroup) {
  const { actor, isFetching } = useActor();
  const backendAgeGroup = mapAgeGroupToBackend(ageGroup);

  return useQuery<VisualRecognition[]>({
    queryKey: ['visual-recognition', backendAgeGroup],
    queryFn: async () => {
      if (!actor || !backendAgeGroup) return [];
      try {
        const tasks = await actor.getVisualRecognitionTasks(backendAgeGroup);
        return tasks || [];
      } catch (error) {
        console.error('Error fetching visual recognition tasks:', error);
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!backendAgeGroup,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}

export function useProblemSolvingTasks(ageGroup: AgeGroup) {
  const { actor, isFetching } = useActor();
  const { backendLanguage } = useLanguage();
  const backendAgeGroup = mapAgeGroupToBackend(ageGroup);

  return useQuery<ProblemSolving[]>({
    queryKey: ['problem-solving', backendAgeGroup, backendLanguage],
    queryFn: async () => {
      if (!actor || !backendAgeGroup) return [];
      try {
        const tasks = await actor.getProblemSolvingTasks(backendAgeGroup);
        return tasks || [];
      } catch (error) {
        console.error('Error fetching problem solving tasks:', error);
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!backendAgeGroup,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}

export function useColoringTemplates(ageGroup: AgeGroup) {
  const { actor, isFetching } = useActor();
  const backendAgeGroupEnum = mapAgeGroupToBackendEnum(ageGroup);

  return useQuery<ColoringTemplateWithData[]>({
    queryKey: ['coloring-templates', ageGroup],
    queryFn: async () => {
      if (!actor || !backendAgeGroupEnum) return [];
      try {
        const templates = await actor.getColoringTemplatesByAgeGroup(backendAgeGroupEnum);
        return templates || [];
      } catch (error) {
        console.error('Error fetching coloring templates:', error);
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!backendAgeGroupEnum,
    staleTime: 10 * 60 * 1000,
    retry: 1,
  });
}
