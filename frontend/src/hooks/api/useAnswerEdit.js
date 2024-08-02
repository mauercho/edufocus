import instance from '../../utils/axios/instance';
import { API_URL } from '../../constants';

export function useAnswerEdit() {
  const answerEdit = (questionId, title, content, answer) => {
    const newAnswer = {
      title,
      content,
      answer,
    };
    return instance.put(`${API_URL}/qna/answer/update/${questionId}`, newAnswer);
  };

  return { answerEdit };
}
