import { useSuspenseQuery } from '@tanstack/react-query';
import instance from '../../utils/axios/instance';
import { API_URL } from '../../constants';

export function useLectureEnroll(lectureId) {
  return useSuspenseQuery({
    queryKey: ['enroll', lectureId],
    queryFn: () => instance.get(`${API_URL}/registration/${lectureId}`),
  });
}
