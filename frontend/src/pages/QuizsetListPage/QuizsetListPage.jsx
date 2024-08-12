import { ArticleLink } from '../../components/ArticleLink';
import ArticleBoard from '../../components/ArticleBoard/ArticleBoard';
import { useQuizsets } from '../../hooks/api/useQuizsets';
import { useParams } from 'react-router-dom';

export default function QuizsetListPage() {
  const { lectureId } = useParams();
  const { data } = useQuizsets(lectureId);
  const quizsets = data?.data ?? [];

  return (
    <ArticleBoard
      title="퀴즈 목록"
      canCreate={true}
    >
      {quizsets.length > 0 &&
        quizsets.map?.((quizset) => (
          <ArticleLink
            key={`${quizset.quizSetId}`}
            title={quizset.title}
            to={`${quizset.quizSetId}`}
          />
        ))}
    </ArticleBoard>
  );
}
