import instance from '../../utils/axios/instance';
import { API_URL } from '../../constants';

export function useQuizsetWrite() {
  const quizsetWrite = (formData) => {
    return instance.post(`${API_URL}/quiz`, formData, {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    });
  };

  return { quizsetWrite };
}
