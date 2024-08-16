import { ArticleLink } from '../../components/ArticleLink';
import ArticleBoard from '../../components/ArticleBoard/ArticleBoard';
import { useParams } from 'react-router-dom';
import { useQnas } from '../../hooks/api/useQnas';
import useBoundStore from '../../store';
import IntersectionArea from '../../components/IntersectionArea/IntersectionObserver';

export default function QuestionListPage() {
  const { lectureId } = useParams();
  const { data, fetchNextPage, hasNextPage } = useQnas(lectureId);
  const questions = data.pages.flatMap((page) => page.data);
  const userType = useBoundStore((state) => state.userType);

  return (
    <ArticleBoard
      title="Q&A"
      canCreate={userType === 'student'}
    >
      {questions.length > 0 &&
        questions.map?.((question) => (
          <ArticleLink
            key={`${question.title}${question.createtAt}`}
            title={question.title}
            sub={`${new Date(question.createtAt).toLocaleDateString()} ${new Date(question.createtAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
            to={`${question.id}`}
          />
        ))}
      {hasNextPage && <IntersectionArea onObserve={() => fetchNextPage()} />}
    </ArticleBoard>
  );
}
