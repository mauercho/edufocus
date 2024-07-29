import { CreateArticle } from '../../components/Article';
import { useQnaWrite } from '../../hooks/api/useQuestionWrite';
import { useParams, useNavigate } from 'react-router-dom';

export default function CreateQuestionPage() {
  const navigate = useNavigate();
  const { lectureId } = useParams();
  const { questionWrite } = useQnaWrite();

  const handleSubmit = async (e, title, content) => {
    e.preventDefault();

    await questionWrite(lectureId, title, content);
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
