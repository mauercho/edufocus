import instance from '../../utils/axios/instance';
import { API_URL } from '../../constants';

export function usePasswordReset() {
  const sendEmail = (email) => {
    console.log(email);
    return instance.post(`${API_URL}/mail/sendcode?email=${email}`);
  };

  const verify = (authNum, email) => {
    const verifyBody = {
      code: authNum,
      email,
    };
    return instance.get(`${API_URL}/mail/verify`, verifyBody);
  };

  const updatePassword = (newPw, newPwCheck) => {
    const passwordBody = {
      newPassword: newPw,
      newPasswordCheck: newPwCheck,
    };
    return instance.put(`${API_URL}/user/updateforgottenpassword`, passwordBody);
  };

  return { sendEmail, verify, updatePassword };
}
