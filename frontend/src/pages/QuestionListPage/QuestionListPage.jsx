import { ArticleLink } from '../../components/ArticleLink';
import ArticleBoard from '../../components/ArticleBoard/ArticleBoard';

export default function QuestionListPage() {
  const notices = [
    {},
    { title: 'Question1', sub: '7-12 오전 11:40:57' },
    { title: 'Question2', sub: '7-12 오전 11:40:57' },
    { title: '헷갈리는게 있어요', sub: '7-15 오전 11:40:57' },
    { title: '궁금궁금', sub: '7-15 오전 11:40:57' },
    { sub: '날짜만 있는 경우' },
  ];

  return (
    <ArticleBoard
      title="Q&A"
      canCreate={true}
      createPath="/"
    >
      {notices.map((notice) => {
        if (notice.sub && notice.title) {
          return (
            <ArticleLink
              key={`${notice.title}${notice.sub}`}
              title={notice.title}
              sub={notice.sub}
            />
          );
        }
      })}
    </ArticleBoard>
  );
}
