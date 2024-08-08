import instance from '../../utils/axios/instance';
import { API_URL } from '../../constants';

export function useAnswerDelete() {
  const answerDelete = (questionId) => {
    const newAnswer = {
      answer: null,
    };
    return instance.post(`${API_URL}/qna/answer/delete/${questionId}`, newAnswer);
  };

  return { answerDelete };
}
