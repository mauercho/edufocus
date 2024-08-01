import instance from '../../utils/axios/instance';
import { API_URL } from '../../constants';

export function usePasswordChange() {
  // TODO: API 수정 후 실제 기능하는지 확인
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
