import { ArticleDetail } from '../../components/Article';
import { useParams, useNavigate } from 'react-router-dom';
import { useQnaDetail } from '../../hooks/api/useQnaDetail';
import { useQnaDelete } from '../../hooks/api/useQnaDelete';

export default function QuestionDetailPage() {
  const params = useParams();
  const qnaId = params.questionId;
  const { data } = useQnaDetail(qnaId);
  const qna = data?.data;
  const { qnaDelete } = useQnaDelete();
  const navigate = useNavigate();

  const handleDelete = async () => {
    await qnaDelete(qnaId);
    navigate('..');
  };

  return (
    <ArticleDetail
      topic="Q&A"
      title={qna.title}
      author={qna.username}
      content={qna.content}
      answer={qna?.answer}
      onDelete={handleDelete}
      isMine={qna.mine}
    />
  );
}
