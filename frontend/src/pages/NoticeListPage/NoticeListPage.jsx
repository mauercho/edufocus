import { ArticleLink } from '../../components/ArticleLink';
import ArticleBoard from '../../components/ArticleBoard/ArticleBoard';
import { useNotices } from '../../hooks/api/useNotices';
import { useParams } from 'react-router-dom';

export default function NoticeListPage() {
  const { lectureId } = useParams();
  const { data } = useNotices(lectureId);
  const notices = data?.data;

  return (
    <ArticleBoard
      title="공지사항"
      canCreate={false}
    >
      {notices?.map((notice) => (
        <ArticleLink
          key={`${notice.id}`}
          title={notice.title}
          sub={notice.date}
          to={`${notice.id}`}
        />
      ))}
    </ArticleBoard>
  );
}
