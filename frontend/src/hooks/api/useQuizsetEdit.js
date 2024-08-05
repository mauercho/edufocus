import instance from '../../utils/axios/instance';
import { API_URL } from '../../constants';

export function useQuizsetEdit() {
  const quizsetEdit = (quizsetId, quizsetObject) => {
    return instance.put(`${API_URL}/lecture/${quizsetId}`, quizsetObject);
  };

  return { quizsetEdit };
}
