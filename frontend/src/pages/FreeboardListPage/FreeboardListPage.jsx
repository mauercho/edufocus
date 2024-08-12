import { ArticleLink } from '../../components/ArticleLink';
import ArticleBoard from '../../components/ArticleBoard/ArticleBoard';
import { useFreeboards } from '../../hooks/api/useFreeboards';
import { useParams } from 'react-router-dom';
import IntersectionArea from '../../components/IntersectionArea/IntersectionObserver';

export default function NoticeListPage() {
  const { lectureId } = useParams();
  const { data, fetchNextPage, hasNextPage } = useFreeboards(lectureId);
  const articles = data.pages.flatMap((page) => page.data);

  return (
    <ArticleBoard
      title="자유게시판"
      canCreate={true}
    >
      {articles.length > 0 &&
        articles.map?.((notice) => (
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
