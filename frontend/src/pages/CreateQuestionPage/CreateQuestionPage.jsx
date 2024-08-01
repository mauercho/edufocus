import { CreateArticle } from '../../components/Article';
import { useQnaWrite } from '../../hooks/api/useQnAWrite';
import { useParams, useNavigate } from 'react-router-dom';

export default function CreateQuestionPage() {
  const navigate = useNavigate();
  const { lectureId } = useParams();
  const { qnaWrite } = useQnaWrite();

  const handleSubmit = async (e, title, content) => {
    e.preventDefault();

    await qnaWrite(lectureId, title, content);
    navigate('..');
  };
  return (
    <CreateArticle
      topic="질문하기"
      title="Q&A"
      onSubmit={handleSubmit}
    />
  );
}
