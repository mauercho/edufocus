import instance from '../../utils/axios/instance';
import { API_URL } from '../../constants';

export function useFreeboardEdit() {
  const freeboardEdit = (boardId, title, content) => {
    const newFreeboard = {
      title,
      content,
    };
    return instance.put(`${API_URL}/board/${boardId}`, newFreeboard);
  };

  return { freeboardEdit };
}
