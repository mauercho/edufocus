import { useSuspenseQuery } from '@tanstack/react-query';
import instance from '../../utils/axios/instance';
import { API_URL } from '../../constants';

export function useReportSetDetail(reportSetId) {
  return useSuspenseQuery({
    queryKey: ['reportsetDetail', reportSetId],
    queryFn: () => instance.get(`${API_URL}/report/teacher/report/${reportSetId}`),
  });
}
