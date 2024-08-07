import instance from '../../utils/axios/instance';
import { API_URL } from '../../constants';

export function usePasswordChange() {
  const passwordChange = (currentPw, newPw, newPwCheck) => {
    const newPasswordBody = {
      currentPassword: currentPw,
      newPassword: newPw,
      newPasswordCheck: newPwCheck,
    };
    return instance.put(`${API_URL}/user/updatepassword/`, newPasswordBody);
  };

  return { passwordChange };
}
