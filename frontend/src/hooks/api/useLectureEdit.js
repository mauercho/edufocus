import instance from '../../utils/axios/instance';
import { API_URL } from '../../constants';

export function useLectureEdit() {
  const lectureEdit = (lectureId, lectureObject) => {
    return instance.put(`${API_URL}/lecture/${lectureId}`, lectureObject);
  };

  return { lectureEdit };
}
