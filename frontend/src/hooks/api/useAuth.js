import { API_URL } from '../../constants';
import useBoundStore from '../../store';
import instance from '../../utils/axios/instance';

export function useAuth() {
  const setToken = useBoundStore((state) => state.setToken);
  const setUserType = useBoundStore((state) => state.setUserType);

  const login = (userId, password, onError = () => {}) => {
    const formData = {
      userId,
      password,
    };
    return instance
      .post(`${API_URL}/user/login`, formData)
      .then(({ data }) => data['access-token'])
      .then((accessToken) => {
        setToken(accessToken);
        // TODO: userType 구분 추가
        setUserType('student');
      })
      .catch((e) => {
        alert('아이디 또는 비밀번호를 다시 확인해주세요.');
        onError(e);
      });
  };

  return { login };
}
