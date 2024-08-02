import { useQuery } from '@tanstack/react-query';
import instance from '../../utils/axios/instance';
import { API_URL } from '../../constants';

export function useQuizsets() {
  return useQuery({
    queryKey: ['quizsetList'],
    queryFn: () => instance.get(`${API_URL}/quiz`),
  });
}
