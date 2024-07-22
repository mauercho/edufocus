import { useQuery } from '@tanstack/react-query';
import instance from '../../utils/axios/instance';
import { API_URL } from '../../constants';

export function useNotices(lectureId) {
  const response = useQuery({
    queryKey: ['noticelist', lectureId],
    queryFn: instance.get(`${API_URL}/notice/${lectureId}`),
  });

  return response;
}
