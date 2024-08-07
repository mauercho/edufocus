import { useSuspenseQuery } from '@tanstack/react-query';
import instance from '../../utils/axios/instance';
import { API_URL } from '../../constants';

export function useStudentReportDetail(reportId) {
  return useSuspenseQuery({
    queryKey: ['studentreportdetail', reportId],
    queryFn: () => instance.get(`${API_URL}/report/myreportdetail/${reportId}`),
  });
}
