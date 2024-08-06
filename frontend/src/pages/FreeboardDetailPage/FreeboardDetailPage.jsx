import { ArticleDetail } from '../../components/Article';
import { useParams, useNavigate } from 'react-router-dom';
import { useFreeboardDetail } from '../../hooks/api/useFreeboardDetail';
import { useFreeboardDelete } from '../../hooks/api/useFreeboardDelete';

export default function FreeboardDetailPage() {
  const params = useParams();
  const freeboardId = params.freeboardId;
  const { data } = useFreeboardDetail(freeboardId);
  const freeboard = data?.data;
  const navigate = useNavigate();
  const { freeboardDelete } = useFreeboardDelete();

  const handleDelete = async () => {
    await freeboardDelete(freeboardId);
    navigate('..');
  };

  return (
    <ArticleDetail
      topic="자유게시판"
      title={freeboard.title}
      content={freeboard.content}
      onDelete={handleDelete}
    />
  );
}
