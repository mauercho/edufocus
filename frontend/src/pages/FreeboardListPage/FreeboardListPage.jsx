import { ArticleLink } from '../../components/ArticleLink';
import ArticleBoard from '../../components/ArticleBoard/ArticleBoard';
import { useFreeboards } from '../../hooks/api/useFreeboards';
import { useParams } from 'react-router-dom';

export default function NoticeListPage() {
  const { lectureId } = useParams();
  const { data } = useFreeboards(lectureId);
  const notices = data?.data;
  console.log(notices);
  return (
    <ArticleBoard
      title="자유게시판"
      canCreate={true}
    >
      {notices.map?.((notice) => (
        <ArticleLink
          key={`${notice.id}`}
          title={notice.title}
          sub={`${notice.createdAt[0]}. ${notice.createdAt[1]}. ${notice.createdAt[2]}. ${notice.createdAt[3]}:${notice.createdAt[4]}`}
          to={`${notice.id}`}
        />
      ))}
    </ArticleBoard>
  );
}
