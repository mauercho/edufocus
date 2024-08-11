import { ArticleLink } from '../../components/ArticleLink';
import ArticleBoard from '../../components/ArticleBoard/ArticleBoard';
import { useNotices } from '../../hooks/api/useNotices';
import { useParams } from 'react-router-dom';
import useBoundStore from '../../store';
import IntersectionArea from '../../components/IntersectionArea/IntersectionObserver';

export default function NoticeListPage() {
  const { lectureId } = useParams();
  const { data, fetchNextPage, hasNextPage } = useNotices(lectureId);
  const notices = data?.pages.flatMap((page) => page.data);
  const userType = useBoundStore((state) => state.userType);

  return (
    <ArticleBoard
      title="공지사항"
      canCreate={userType === 'teacher'}
    >
      {notices.length &&
        notices.map?.((notice) => (
          <ArticleLink
            key={`${notice.id}`}
            title={notice.title}
            sub={`${new Date(notice.createdAt).toLocaleDateString()} ${new Date(notice.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
            to={`${notice.id}`}
          />
        ))}
      {hasNextPage && <IntersectionArea onObserve={() => fetchNextPage()} />}
    </ArticleBoard>
  );
}
