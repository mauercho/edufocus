import { useQuery } from '@tanstack/react-query';
import instance from '../../utils/axios/instance';
import { API_URL } from '../../constants';

export function useNotices(lectureId) {
  // TODO: API url 업데이트
  const response = useQuery({
    queryKey: ['noticelist', lectureId],
    queryFn: instance.get(`${API_URL}/notice/${lectureId}`),
  });

  return response;
}
