import instance from '../../utils/axios/instance';
import { API_URL } from '../../constants';

export function useLectureEnrollCancel() {
  const lectureEnrollCancel = (enrollId) => {
    return instance.delete(`${API_URL}/registration/${enrollId}`);
  };
  return { lectureEnrollCancel };
}
