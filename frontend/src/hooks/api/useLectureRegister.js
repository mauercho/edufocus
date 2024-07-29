import instance from '../../utils/axios/instance';
import { API_URL } from '../../constants';

export function useLectureRegister() {
  const lectureRegister = (lectureId) => {
    const body = {
      lectureId: Number(lectureId),
    };
    return instance.post(`${API_URL}/registration`, body);
  };

  return { lectureRegister };
}
