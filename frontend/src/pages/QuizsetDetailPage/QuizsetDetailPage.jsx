import { useQuizsetDetail } from '../../hooks/api/useQuizsetDetail';
import { useParams } from 'react-router-dom';
// import useBoundStore from '../../store';
import { QuizsetDetail } from '../../components/QuizsetDetail';

export default function QuizsetListPage() {
  const { lectureId } = useParams();
  const { data } = useQuizsetDetail(lectureId);
  const quizset = data?.data ?? [];
  console.log(quizset);
  return <QuizsetDetail title={quizset.title} />;
}
