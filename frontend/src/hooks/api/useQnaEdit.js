import instance from '../../utils/axios/instance';
import { API_URL } from '../../constants';

export function useQnaEdit() {
  const qnaEdit = (questionId, title, content, answer) => {
    const newQna = {
      title,
      content,
      answer,
    };
    return instance.put(`${API_URL}/qna/${questionId}`, newQna);
  };

  return { qnaEdit };
}
