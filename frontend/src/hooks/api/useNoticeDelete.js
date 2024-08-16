import instance from '../../utils/axios/instance';
import { API_URL } from '../../constants';

export function useNoticeDelete() {
  const noticeDelete = (boardId) => {
    return instance.delete(`${API_URL}/board/${boardId}`);
  };

  return { noticeDelete };
}
