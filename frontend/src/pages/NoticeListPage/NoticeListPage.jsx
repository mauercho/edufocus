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
          //Todo: createdAt을 이용하여 날짜 표시했는데 Q&A에서 나오는 날짜 형식이랑 공지사항에서 나오는 날짜 형식이랑 달라서 수정해야함.
          // + Q&A 글쓰기 버튼이 너무 커서 글 밀어내는 느낌 있음.
          sub={`${notice.createdAt[0]}. ${notice.createdAt[1]}. ${notice.createdAt[2]}. ${notice.createdAt[3]}:${notice.createdAt[4]}`}
          to={`${notice.id}`}
        />
      ))}
    </ArticleBoard>
  );
}
