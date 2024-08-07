import { useSuspenseQuery } from '@tanstack/react-query';
import instance from '../../utils/axios/instance';
import { API_URL } from '../../constants';

export function useTeacherQuizsetDetail(id) {
  return useSuspenseQuery({
    queryKey: ['quizset', id],
    queryFn: () => instance.get(`${API_URL}/quiz/teacher/${id}`),
  });
}
