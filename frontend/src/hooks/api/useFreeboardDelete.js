import instance from '../../utils/axios/instance';
import { API_URL } from '../../constants';

export function useFreeboardDelete() {
  const freeboardDelete = (boardId) => {
    return instance.delete(`${API_URL}/board/${boardId}`);
  };

  return { freeboardDelete };
}
