import { useSuspenseQuery } from '@tanstack/react-query';
import instance from '../../utils/axios/instance';
import { API_URL } from '../../constants';

export function useComments(freeboardId) {
  return useSuspenseQuery({
    queryKey: ['commentlist', freeboardId],
    queryFn: () => instance.get(`${API_URL}/board/comment/${freeboardId}`),
  });
}
