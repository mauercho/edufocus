import { useSuspenseQuery } from '@tanstack/react-query';
import instance from '../../utils/axios/instance';
import { API_URL } from '../../constants';

export function useQnaDetail(id) {
  return useSuspenseQuery({
    queryKey: ['qnaDetail', id],
    queryFn: () => instance.get(`${API_URL}/qna/${id}`),
  });
}
