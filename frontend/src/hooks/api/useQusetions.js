import { useQuery } from '@tanstack/react-query';
import instance from '../../utils/axios/instance';
import { API_URL } from '../../constants';

export function useQuestions(lectureId) {
  const response = useQuery({
    queryKey: ['questionlist', lectureId],
    queryFn: instance.get(`${API_URL}/qna/${lectureId}`),
  });

  return response;
}
