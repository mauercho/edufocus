import { ArticleDetail } from '../../components/Article';
import { useParams } from 'react-router-dom';
import { useQnaDetail } from '../../hooks/api/useQnaDetail';

export default function QuestionDetailPage() {
  const params = useParams();
  const qnaId = params.questionId;
  const { data } = useQnaDetail(qnaId);
  const qna = data?.data;
  const answer = qna?.answer;
  console.log(qna.author);

  return (
    <ArticleDetail
      topic="Q&A"
      title={qna.title}
      author={qna.username}
      content={qna.content}
      answer={answer}
    />
  );
}
