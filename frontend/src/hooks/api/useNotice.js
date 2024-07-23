import { useQuery } from '@tanstack/react-query';
import instance from '../../utils/axios/instance';
import { API_URL } from '../../constants';

export function useNotice({ lectureId, noticeId }) {
  const response = useQuery({
    queryKey: ['notice', lectureId, noticeId],
    queryFn: instance.get(`${API_URL}/notice/${lectureId}/${noticeId}`),
  });

  return response;
}
