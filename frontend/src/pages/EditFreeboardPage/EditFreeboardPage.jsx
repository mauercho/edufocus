import { useFreeboardEdit } from '../../hooks/api/useFreeboardEdit';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { EditFreeboard } from '../../components/Article';

export default function EditQuestionPage() {
  const navigate = useNavigate();
  const { freeboardId } = useParams();
  const { freeboardEdit } = useFreeboardEdit();
  const location = useLocation();

  const handleSubmit = async (e, title, content) => {
    e.preventDefault();

    await freeboardEdit(freeboardId, title, content);
    navigate('..');
  };
  return (
    <EditFreeboard
      topic="글쓰기"
      title="자유게시판"
      prevTitle={location.state.title}
      prevContent={location.state.content}
      onSubmit={handleSubmit}
    />
  );
}
