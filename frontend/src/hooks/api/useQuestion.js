import { useQuery } from '@tanstack/react-query';
import instance from '../../utils/axios/instance';
import { API_URL } from '../../constants';

export function useQuestion({ lectureId, qusetionId }) {
  const response = useQuery({
    queryKey: ['question', lectureId, qusetionId],
    queryFn: instance.get(`${API_URL}/qna/${lectureId}/${qusetionId}`),
  });

  return response;
}
