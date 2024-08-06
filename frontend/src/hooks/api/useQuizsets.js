import { useSuspenseQuery } from '@tanstack/react-query';
import instance from '../../utils/axios/instance';
import { API_URL } from '../../constants';

export function useQuizsets() {
  return useSuspenseQuery({
    queryKey: ['quizsetList'],
    queryFn: () => instance.get(`${API_URL}/quiz`),
  });
}
