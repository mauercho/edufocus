import instance from '../../utils/axios/instance';
import { API_URL } from '../../constants';

export function useCommentDelete() {
  const commentDelete = (commentId) => {
    return instance.delete(`${API_URL}/board/comment/${commentId}`);
  };

  return { commentDelete };
}
