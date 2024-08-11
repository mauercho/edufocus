import { useTeacherQuizsetDetail } from '../../hooks/api/useTeacherQuizsetDetail';
import { useParams, useNavigate } from 'react-router-dom';
import { QuizsetDetail } from '../../components/QuizsetDetail';
import { useQuizsetDelete } from '../../hooks/api/useQuizsetDelete';

export default function QuizsetDetailPage() {
  const navigate = useNavigate();
  const { quizsetId } = useParams();
  const { quizsetDelete } = useQuizsetDelete();
  const { data } = useTeacherQuizsetDetail(quizsetId);
  const quizset = data.data;
  const tested = quizset.tested;
  const handleEdit = () => {
    navigate('edit', { state: { initialValue: quizset } });
  };
  const handleDelete = async () => {
    await quizsetDelete(quizsetId);
    navigate('..');
  };

  return (
    <QuizsetDetail
      topic={'퀴즈 목록'}
      title={quizset.title}
      quizzes={quizset.quizzes}
      onDelete={handleDelete}
      onEdit={handleEdit}
      tested={tested}
    />
  );
}
