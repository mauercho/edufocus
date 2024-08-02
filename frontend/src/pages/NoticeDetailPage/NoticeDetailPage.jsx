import { ArticleDetail } from '../../components/Article';
import { useParams, useNavigate } from 'react-router-dom';
import { useNoticeDetail } from '../../hooks/api/useNoticeDetail';
import { useNoticeDelete } from '../../hooks/api/useNoticeDelete';

export default function NoticeDetailPage() {
  const params = useParams();
  const noticeId = params.noticeId;
  const { data } = useNoticeDetail(noticeId);
  const notice = data?.data;
  const navigate = useNavigate();
  const { noticeDelete } = useNoticeDelete();
  // TODO: 수정 버튼 추가(여기에 또는 ArticleDetail에)

  const handleDelete = async () => {
    await noticeDelete(noticeId);
    navigate('..');
  };

  return (
    <ArticleDetail
      topic="공지사항"
      title={notice.title}
      content={notice.content}
      onDelete={handleDelete}
    />
  );
}
