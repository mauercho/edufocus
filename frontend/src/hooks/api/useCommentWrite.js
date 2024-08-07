import instance from '../../utils/axios/instance';
import { API_URL } from '../../constants';

export function useCommentWrite() {
  const commentWrite = (freeboardId, content) => {
    const newComment = {
      content: content,
    };
    return instance.post(`${API_URL}/board/comment/${freeboardId}`, newComment);
  };

  return { commentWrite };
}
