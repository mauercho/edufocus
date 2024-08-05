import { useSuspenseQuery } from '@tanstack/react-query';
import instance from '../../utils/axios/instance';
import { API_URL } from '../../constants';

export function useNotices(lectureId, page = 0) {
  return useSuspenseQuery({
    queryKey: ['noticelist', lectureId, page],
    queryFn: () => instance.get(`${API_URL}/board?lectureId=${lectureId}&category=announcement&pageNo=${page}`),
  });
}
