import instance from '../../utils/axios/instance';
import { API_URL } from '../../constants';

export function useQuizsetEdit() {
  const quizsetEdit = (formData) => {
    return instance.put(`${API_URL}/quiz`, formData, {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    });
  };

  return { quizsetEdit };
}
