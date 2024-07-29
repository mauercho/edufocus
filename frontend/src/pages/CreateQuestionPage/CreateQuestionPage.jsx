import { CreateArticle } from '../../components/Article';
import { useQuestionWrite } from '../../hooks/api/useQuestionWrite';
import { useParams, useNavigate } from 'react-router-dom';

export default function CreateQuestionPage() {
  const navigate = useNavigate();
  const { lectureId } = useParams();
  const { questionWrite } = useQuestionWrite();

  const handleSubmit = async (e, title, content) => {
    e.preventDefault();

    const response = await questionWrite(lectureId, title, content);
    console.log('response : ', response);
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
