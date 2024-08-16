import { useSuspenseQuery } from '@tanstack/react-query';
import instance from '../../utils/axios/instance';
import { API_URL } from '../../constants';

export function useLectures() {
  return useSuspenseQuery({
    queryKey: ['lecturelist'],
    queryFn: () => instance.get(`${API_URL}/lecture`),
  });
}
