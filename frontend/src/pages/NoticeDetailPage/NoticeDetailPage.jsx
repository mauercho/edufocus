import { ArticleDetail } from '../../components/Article';
import { useParams } from 'react-router-dom';
import { useNoticeDetail } from '../../hooks/api/useNoticeDetail';

export default function NoticeDetailPage() {
  const params = useParams();
  const noticeId = params.noticeId;
  const { data } = useNoticeDetail(noticeId);
  const notice = data?.data;

  return (
    <ArticleDetail
      topic="공지사항"
      title={notice.title}
      content={notice.content}
    />
  );
}
