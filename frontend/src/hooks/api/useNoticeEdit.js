import instance from '../../utils/axios/instance';
import { API_URL } from '../../constants';

export function useNoticeEdit() {
  const noticeEdit = (boardId, title, content) => {
    const newNotice = {
      title,
      content,
    };
    console.log(newNotice);
    return instance.put(`${API_URL}/board/${boardId}`, newNotice);
  };

  return { noticeEdit };
}
