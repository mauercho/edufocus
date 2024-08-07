import instance from '../../utils/axios/instance';
import { API_URL } from '../../constants';

export function useCommentEdit() {
  const commentEdit = (commentId, content) => {
    const newComment = {
      content: content,
    };
    return instance.put(`${API_URL}/board/comment/${commentId}`, newComment);
  };

  return { commentEdit };
}
