import instance from '../../utils/axios/instance';
import { API_URL } from '../../constants';

export function useReportSetDelete() {
  const reportsetDelete = (reportsetId) => {
    return instance.delete(`${API_URL}/report/teacher/report/${reportsetId}`);
  };

  return { reportsetDelete };
}
