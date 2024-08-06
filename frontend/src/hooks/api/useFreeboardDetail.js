import { useSuspenseQuery } from '@tanstack/react-query';
import instance from '../../utils/axios/instance';
import { API_URL } from '../../constants';

export function useFreeboardDetail(boardId) {
  return useSuspenseQuery({
    queryKey: ['freeboarddetail', boardId],
    queryFn: () => instance.get(`${API_URL}/board/${boardId}`),
  });
}
