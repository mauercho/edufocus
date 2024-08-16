import { useSuspenseQuery } from '@tanstack/react-query';
import instance from '../../utils/axios/instance';
import { API_URL } from '../../constants';

export function useMyLectures() {
  return useSuspenseQuery({
    queryKey: ['mylecturelist'],
    queryFn: () => instance.get(`${API_URL}/lecture/mylecture`),
  });
}
