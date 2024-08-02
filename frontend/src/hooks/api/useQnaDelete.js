import instance from '../../utils/axios/instance';
import { API_URL } from '../../constants';

export function useQnaDelete() {
  const qnaDelete = (questionId) => {
    return instance.delete(`${API_URL}/qna/${questionId}`);
  };

  return { qnaDelete };
}
