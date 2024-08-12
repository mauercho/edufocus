import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import instance from '../../utils/axios/instance';
import { API_URL, PAGE_SIZE } from '../../constants';

export function useQnas(id) {
  return useSuspenseInfiniteQuery({
    queryKey: ['qnalist', id],
    queryFn: ({ pageParam = 0 }) => instance.get(`${API_URL}/qna/all/${id}?pageNo=${pageParam}`),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.data.length < PAGE_SIZE) {
        return undefined;
      }
      return allPages.length;
    },
  });
}
