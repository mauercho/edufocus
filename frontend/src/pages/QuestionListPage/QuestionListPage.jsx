import { ArticleLink } from '../../components/ArticleLink';
import ArticleBoard from '../../components/ArticleBoard/ArticleBoard';
import { useParams } from 'react-router-dom';
import { useQnas } from '../../hooks/api/useQnas';
import useBoundStore from '../../store';

export default function QuestionListPage() {
  const { lectureId } = useParams();
  const { data } = useQnas(lectureId);
  const questions = data?.data;
  const userType = useBoundStore((state) => state.userType);
  return (
    <ArticleBoard
      title="Q&A"
      canCreate={userType === 'student'}
    >
      {questions.length &&
        questions.map?.((question) => (
          <ArticleLink
            key={`${question.title}${question.createtAt}`}
            title={question.title}
            sub={`${new Date(question.createtAt).toLocaleDateString()} ${new Date(question.createtAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
            to={`${question.id}`}
          />
        ))}
    </ArticleBoard>
  );
}
