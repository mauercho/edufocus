import instance from '../../utils/axios/instance';
import { API_URL } from '../../constants';

export function useLectureCreate() {
  const lectureCreate = (formData) => {
    // return instance.post(`${API_URL}/lecture`, lectureObject, image);
    return instance.post(`${API_URL}/lecture`, formData, {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    });
  };

  return { lectureCreate };
}
