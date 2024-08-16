import instance from '../../utils/axios/instance';
import { API_URL } from '../../constants';

export function useAnswerWrite() {
  const answerWrite = (questionId, answer) => {
    const newAnswer = {
      answer: answer,
    };
    return instance.post(`${API_URL}/qna/answer/create/${questionId}`, newAnswer);
  };

  return { answerWrite };
}
