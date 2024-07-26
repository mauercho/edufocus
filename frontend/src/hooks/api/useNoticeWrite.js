import instance from '../../utils/axios/instance';
import { API_URL } from '../../constants';

export function useNoticeWrite() {
  const noticeWrite = (newNotice) => {
    return instance.post(`${API_URL}/board`, newNotice);
  };

  return { noticeWrite };
}
