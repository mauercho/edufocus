import { useQuizsetDetail } from '../../hooks/api/useQuizsetDetail';
import { useParams } from 'react-router-dom';
// import useBoundStore from '../../store';

export default function QuizsetListPage() {
  const { lectureId } = useParams();
  const { data } = useQuizsetDetail(lectureId);
  const quizset = data?.data ?? [];
  console.log(quizset);
  return (
    <div>
      <div>디테일일{lectureId}</div>
    </div>
  );
}
