import instance from '../../utils/axios/instance';
import { API_URL } from '../../constants';

export function useQnaWrite() {
  const qnaWrite = (lectureId, title, content) => {
    const newQna = {
      title,
      content,
      answer: null,
    };
    console.log(newQna);
    return instance.post(`${API_URL}/qna/${lectureId}`, newQna);
  };

  return { qnaWrite };
}
