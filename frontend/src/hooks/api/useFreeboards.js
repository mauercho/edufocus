import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import instance from '../../utils/axios/instance';
import { API_URL, PAGE_SIZE } from '../../constants';

export function useFreeboards(lectureId, page = 0) {
  return useSuspenseInfiniteQuery({
    queryKey: ['freeboardlist', lectureId, page],
    queryFn: ({ pageParam = 0 }) =>
      instance.get(`${API_URL}/board?lectureId=${lectureId}&category=freeboard&pageNo=${pageParam}`),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.data.length < PAGE_SIZE) {
        return undefined;
      }
      return allPages.length + 1;
    },
  });
}
