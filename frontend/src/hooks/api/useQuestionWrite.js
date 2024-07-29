import instance from '../../utils/axios/instance';
import { API_URL } from '../../constants';

export function useQuestionWrite() {
  const questionWrite = (lectureId, title, content) => {
    const newNotice = {
      title,
      content,
      answer: '',
    };
    console.log(newNotice);
    return instance.post(`${API_URL}/qna/${lectureId}`, newNotice);
  };

  return { questionWrite };
}
