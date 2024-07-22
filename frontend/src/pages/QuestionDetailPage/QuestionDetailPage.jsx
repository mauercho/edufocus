import { ArticleDetail } from '../../components/Article';

export default function QuestionDetailPage() {
  const { data } = {
    data: {
      title: '헷갈리는게 있어요',
      author: '이재용',
      content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis sed dolorem vitae?',
      answer: { answerId: '144632619Ux15326', content: '우리 재용이는 참 예의가 없구나' },
    },
  };

  return (
    <ArticleDetail
      topic="Q&A"
      title={data.title}
      author={data.author}
      content={data.content}
      answer={data.answer.content}
    />
  );
}
