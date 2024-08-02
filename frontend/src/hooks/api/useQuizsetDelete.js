import instance from '../../utils/axios/instance';
import { API_URL } from '../../constants';

export function useQuizsetDelete() {
  const quizsetDelete = (quizsetId) => {
    return instance.delete(`${API_URL}/quiz/teacher/${quizsetId}`);
  };

  return { quizsetDelete };
}
