import { useSuspenseQuery } from '@tanstack/react-query';
import instance from '../../utils/axios/instance';
import { API_URL } from '../../constants';

export function useStudentReports(lectureId) {
  return useSuspenseQuery({
    queryKey: ['studentreports'],
    queryFn: () => instance.get(`${API_URL}/report/student/${lectureId}`),
  });
}
