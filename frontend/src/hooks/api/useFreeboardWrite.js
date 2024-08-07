import instance from '../../utils/axios/instance';
import { API_URL } from '../../constants';

export function useFreeboardWrite() {
  const freeboardWrite = (lectureId, title, content) => {
    const newFreeboard = {
      lectureId: Number(lectureId),
      title,
      category: 'freeboard',
      content,
    };
    return instance.post(`${API_URL}/board`, newFreeboard);
  };

  return { freeboardWrite };
}
