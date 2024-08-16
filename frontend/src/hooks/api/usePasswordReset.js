import instance from '../../utils/axios/instance';
import { API_URL } from '../../constants';

export function usePasswordReset() {
  const sendEmail = (email) => {
    return instance.post(`${API_URL}/mail/sendcode?email=${email}`);
  };

  const verify = (authNum, email) => {
    return instance.get(`${API_URL}/mail/verify?code=${authNum}&email=${email}`);
  };

  const updatePassword = (newPassword, email) => {
    return instance.put(`${API_URL}/user/updateforgottenpassword?email=${email}&newPassword=${newPassword}`);
  };

  return { sendEmail, verify, updatePassword };
}
