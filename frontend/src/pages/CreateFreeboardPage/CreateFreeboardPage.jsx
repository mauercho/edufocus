import { CreateArticle } from '../../components/Article';
import { useFreeboardWrite } from '../../hooks/api/useFreeboardWrite';
import { useParams, useNavigate } from 'react-router-dom';

export default function CreateFreeboardPage() {
  const navigate = useNavigate();
  const { lectureId } = useParams();
  const { freeboardWrite } = useFreeboardWrite();

  const handleSubmit = async (e, title, content) => {
    e.preventDefault();

    await freeboardWrite(lectureId, title, content);
    navigate('..');
  };
  return (
    <CreateArticle
      topic="질문하기"
      title="자유게시판"
      onSubmit={handleSubmit}
    />
  );
}
