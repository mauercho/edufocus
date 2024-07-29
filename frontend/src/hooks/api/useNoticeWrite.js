import instance from '../../utils/axios/instance';
import { API_URL } from '../../constants';

export function useNoticeWrite() {
  const noticeWrite = (lectureId, title, content) => {
    const newNotice = {
      lectureId: Number(lectureId),
      title,
      category: 'announcement',
      content,
    };
    console.log(newNotice);
    return instance.post(`${API_URL}/board`, newNotice);
  };

  return { noticeWrite };
}
