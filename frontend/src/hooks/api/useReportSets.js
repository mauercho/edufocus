import { useSuspenseQuery } from '@tanstack/react-query';
import instance from '../../utils/axios/instance';
import { API_URL } from '../../constants';

export function useReportSets(lectureId) {
  return useSuspenseQuery({
    queryKey: ['reportsetlists', lectureId],
    queryFn: () => instance.get(`${API_URL}/report/teacher/reportSet/${lectureId}`),
  });
}
