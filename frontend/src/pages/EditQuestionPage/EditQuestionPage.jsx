import { useQnaEdit } from '../../hooks/api/useQnaEdit';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { EditQna } from '../../components/Article';

export default function EditQuestionPage() {
  const navigate = useNavigate();
  const { questionId } = useParams();
  const { qnaEdit } = useQnaEdit();
  const location = useLocation();

  const handleSubmit = async (e, title, content, answer) => {
    e.preventDefault();

    await qnaEdit(questionId, title, content, answer);
    navigate('..');
  };
  return (
    <EditQna
      topic="질문하기"
      title="Q&A"
      prevTitle={location.state.title}
      prevContent={location.state.content}
      prevAnswer={location.state.answer}
      onSubmit={handleSubmit}
    />
  );
}
