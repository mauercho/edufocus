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
      .then(({ data, config }) => {
        const { role: role, 'access-token': accessToken } = data;
        config.headers.Authorization = `${accessToken}`;
        setToken(accessToken);

        if (role === 'ADMIN') {
          setUserType('teacher');
        } else if (role === 'STUDENT') {
          setUserType('student');
        }
      })
      .catch((e) => {
        alert('아이디 또는 비밀번호를 다시 확인해주세요.');
        onError(e);
      });
  };

  const userRegister = (role, userId, name, email, password, onError = () => {}) => {
    const userData = {
      role,
      userId,
      name,
      email,
      password,
    };
    return instance.post(`${API_URL}/user/join`, userData).catch((e) => {
      onError(e);
    });
  };

  const logout = () => {
    return instance
      .post(`${API_URL}/user/logout`)
      .then((response) => {
        console.log(response);
        setUserType(null);
        setToken(null);
      })
      .catch((e) => console.log(e));
  };

  return { login, logout, userRegister };
}
