import { ArticleDetail } from '../../components/Article';

export default function QuestionDetailPage() {
  const title = '헷갈리는게 있어요';
  const author = '이재용';
  const content = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis sed dolorem vitae?';
  const answer = { answerId: '144632619Ux15326', content: '우리 재용이는 참 예의가 없구나' };

  return (
    <ArticleDetail
      topic="Q&A"
      title={title}
      author={author}
      content={content}
      answer={answer.content}
    />
  );
}
