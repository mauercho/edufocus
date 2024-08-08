import { useSuspenseQuery } from '@tanstack/react-query';
import instance from '../../utils/axios/instance';
import { API_URL } from '../../constants';

export function useStudentQuizsetDetail(id) {
  return useSuspenseQuery({
    queryKey: ['studentQuizsetDetail', id],
    queryFn: () => instance.get(`${API_URL}/quiz/student/${id}`),
  });
}
