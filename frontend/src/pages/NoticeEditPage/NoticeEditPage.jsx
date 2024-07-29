import { EditArticle } from '../../components/Article';
import { useNavigate } from 'react-router-dom';
import { useNoticeEdit } from '../../hooks/api/useNoticeEdit';
import { useParams } from 'react-router-dom';
import { useNoticeDetail } from '../../hooks/api/useNoticeDetail';

export default function NoticeEditPage() {
  const navigate = useNavigate();
  const { noticeId } = useParams();
  const { noticeEdit } = useNoticeEdit();

  const { data } = useNoticeDetail(noticeId);
  const notice = data?.data;

  const handleSubmit = async (e, title, content) => {
    e.preventDefault();

    await noticeEdit(noticeId, title, content);

    navigate('..');
  };
  return (
    <EditArticle
      topic="글 쓰기"
      title="공지사항"
      prevTitle={notice.title}
      prevContent={notice.content}
      onSubmit={handleSubmit}
      isPut={true}
    />
  );
}
