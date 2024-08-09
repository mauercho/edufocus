import { ArticleLink } from '../../components/ArticleLink';
import ArticleBoard from '../../components/ArticleBoard/ArticleBoard';
import { useFreeboards } from '../../hooks/api/useFreeboards';
import { useParams } from 'react-router-dom';

export default function NoticeListPage() {
  const { lectureId } = useParams();
  const { data } = useFreeboards(lectureId);
  const notices = data?.data;

  return (
    <ArticleBoard
      title="자유게시판"
      canCreate={true}
    >
      {notices.map?.((notice) => (
        <ArticleLink
          key={`${notice.id}`}
          title={notice.title}
          sub={`${new Date(notice.createdAt).toLocaleDateString()} ${new Date(notice.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
          to={`${notice.id}`}
        />
      ))}
    </ArticleBoard>
  );
}
