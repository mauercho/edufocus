import { API_URL } from '../../constants';
import useBoundStore from '../../store';
import instance from '../../utils/axios/instance';

export function useAuth() {
  const setToken = useBoundStore((state) => state.setToken);
  const setUserType = useBoundStore((state) => state.setUserType);

  const login = (userId, password) => {
    const formData = {
      userId,
      password,
    };

    return instance.post(`${API_URL}/user/login`, formData).then(({ data, config }) => {
      const { role: role, 'access-token': accessToken } = data;
      config.headers.Authorization = `${accessToken}`;
      setToken(accessToken);

      if (role === 'ADMIN') {
        setUserType('teacher');
      } else if (role === 'STUDENT') {
        setUserType('student');
      }
      return accessToken;
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
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setUserType(null);
        setToken(null);
      });
  };

  const updateInfo = (name, email) => {
    const infoBody = {
      name,
      email,
    };
    return instance.put(`${API_URL}/user/updateinfo`, infoBody);
  };

  const updatePassword = (currentPw, newPw, newPwCheck) => {
    const passwordBody = {
      currentPassword: currentPw,
      newPassword: newPw,
      newPasswordCheck: newPwCheck,
    };
    console.log(passwordBody);
    return instance.put(`${API_URL}/user/updatepassword`, passwordBody);
  };

  return { login, logout, userRegister, updateInfo, updatePassword };
}
