import { useSuspenseQuery } from '@tanstack/react-query';
import instance from '../../utils/axios/instance';
import { API_URL } from '../../constants';

export function useQnas(id) {
  return useSuspenseQuery({
    queryKey: ['qnalist', id],
    queryFn: () => instance.get(`${API_URL}/qna/all/${id}`),
  });
}
