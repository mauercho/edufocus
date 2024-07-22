import { ArticleLink } from '../../components/ArticleLink';
import ArticleBoard from '../../components/ArticleBoard/ArticleBoard';

export default function NoticeListPage() {
  const { data: notices } = {
    data: [
      { id: 1, title: '공지사항1', sub: '7-12 오전 11:40:57' },
      { id: 2, title: '공지사하앙2', sub: '7-12 오전 11:40:57' },
      { id: 3, title: '공지사하앙33', sub: '7-15 오전 11:40:57' },
      { id: 4, title: '제목만 있는 경우' },
    ],
  };

  // const { data: notices } = useNotices();

  return (
    <ArticleBoard
      title="공지사항"
      canCreate={true}
    >
      {notices.map((notice) => (
        <ArticleLink
          key={`${notice.title}${notice.sub}`}
          title={notice.title}
          sub={notice.sub}
          to={`${notice.id}`}
        />
      ))}
    </ArticleBoard>
  );
}
