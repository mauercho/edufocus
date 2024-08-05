import instance from '../../utils/axios/instance';
import { API_URL } from '../../constants';

export function useLectureEnrollAccept() {
  const lectureEnrollAccept = (enrollId) => {
    return instance.put(`${API_URL}/registration/${enrollId}`);
  };
  return { lectureEnrollAccept };
}
