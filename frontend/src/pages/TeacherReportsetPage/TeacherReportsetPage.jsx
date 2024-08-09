import { ArticleLink } from '../../components/ArticleLink';
import ArticleBoard from '../../components/ArticleBoard/ArticleBoard';
import { useReportSets } from '../../hooks/api/useReportSets';
import { useParams } from 'react-router-dom';

export default function TeacherReportsetPage() {
  const { lectureId } = useParams();
  const { data } = useReportSets(lectureId);
  const reports = data?.data;

  const formatDate = (dateArray) => {
    const date = new Date(...dateArray.slice(0, 6));
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <ArticleBoard
      title="퀴즈 성적 목록"
      canCreate={false}
    >
      {reports.map?.((report) => {
        const formattedDate = formatDate(report.testAt);
        return (
          <ArticleLink
            key={`${report.reportSetId}`}
            title={`${report.quizSetTitle}`}
            sub={formattedDate}
            to={`${report.reportSetId}`}
          />
        );
      })}
    </ArticleBoard>
  );
}
