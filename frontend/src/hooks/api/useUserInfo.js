import { useSuspenseQuery } from '@tanstack/react-query';
import instance from '../../utils/axios/instance';
import { API_URL } from '../../constants';

export function useUserInfo() {
  return useSuspenseQuery({
    queryKey: ['myInfo'],
    queryFn: () => instance.get(`${API_URL}/user/userinfo`),
  });
}
