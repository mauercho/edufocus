import { useSuspenseQuery } from '@tanstack/react-query';
import instance from '../../utils/axios/instance';
import { API_URL } from '../../constants';

export function useLectureInfo(lectureId) {
  return useSuspenseQuery({
    queryKey: ['lectureInfo', lectureId],
    queryFn: () => instance.get(`${API_URL}/lecture/${lectureId}`),
  });
}
