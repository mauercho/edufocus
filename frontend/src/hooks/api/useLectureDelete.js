import instance from '../../utils/axios/instance';
import { API_URL } from '../../constants';

export function useLectureDelete() {
  const lectureDelete = (lectureId) => {
    return instance.delete(`${API_URL}/lecture/${lectureId}`);
  };

  return { lectureDelete };
}
