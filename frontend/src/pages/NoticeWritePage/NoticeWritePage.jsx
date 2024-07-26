import { CreateArticle } from '../../components/Article';
import { useNavigate } from 'react-router-dom';
import { useNoticeWrite } from '../../hooks/api/useNoticeWrite';
import { useParams } from 'react-router-dom';

export default function NoticeWritePage() {
  const navigate = useNavigate();
  const { lectureId } = useParams();
  const { noticeWrite } = useNoticeWrite();

  const handleSubmit = async (e, title, content) => {
    e.preventDefault();
    console.log('handleSubmit');
    console.log(title, content);

    const response = await noticeWrite({
      lectureId: Number(lectureId),
      title,
      category: 'announcement',
      content,
    });
    console.log('response : ', response);
    navigate('..');
  };
  return (
    <CreateArticle
      topic="글 쓰기"
      title="공지사항"
      onSubmit={handleSubmit}
    />
  );
}
