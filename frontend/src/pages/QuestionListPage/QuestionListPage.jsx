import { ArticleLink } from '../../components/ArticleLink';
import ArticleBoard from '../../components/ArticleBoard/ArticleBoard';

export default function QuestionListPage() {
  const questions = [
    { id: 2, title: 'Question1', sub: '7-12 오전 11:40:57' },
    { id: 3, title: 'Question2', sub: '7-12 오전 11:40:57' },
    { id: 4, title: '헷갈리는게 있어요', sub: '7-15 오전 11:40:57' },
    { id: 5, title: '궁금궁금', sub: '7-15 오전 11:40:57' },
  ];

  return (
    <ArticleBoard
      title="Q&A"
      canCreate={true}
    >
      {questions.map((question) => (
        <ArticleLink
          key={`${question.title}${question.sub}`}
          title={question.title}
          sub={question.sub}
          to={`${question.id}`}
        />
      ))}
    </ArticleBoard>
  );
}
