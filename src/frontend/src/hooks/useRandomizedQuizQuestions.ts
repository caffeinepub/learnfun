import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useLanguage } from '../contexts/LanguageContext';
import type { SimpleQuestion } from '../backend';
import type { AgeGroup } from '../App';

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

export function useRandomizedQuizQuestions(ageGroup: AgeGroup, count: number = 10) {
  const { actor, isFetching } = useActor();
  const { backendLanguage } = useLanguage();
  const backendAgeGroup = mapAgeGroupToBackend(ageGroup);

  return useQuery<SimpleQuestion[]>({
    queryKey: ['randomized-quiz-questions', backendAgeGroup, backendLanguage, count],
    queryFn: async () => {
      if (!actor || !backendAgeGroup) return [];
      try {
        const questions = await actor.getRandomizedQuizQuestions(
          backendAgeGroup,
          backendLanguage,
          BigInt(count)
        );
        return questions || [];
      } catch (error) {
        console.error('Error fetching randomized quiz questions:', error);
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!backendAgeGroup,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}
