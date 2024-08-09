import { ArticleLink } from '../../components/ArticleLink';
import ArticleBoard from '../../components/ArticleBoard/ArticleBoard';
import { useReportSets } from '../../hooks/api/useReportSets';
import { useParams } from 'react-router-dom';

export default function TeacherReportsetPage() {
  const { lectureId } = useParams();
  const { data } = useReportSets(lectureId);
  const reports = data?.data;

  return (
    <ArticleBoard
      title="퀴즈 성적 목록"
      canCreate={false}
    >
      {reports.map?.((report) => {
        return (
          <ArticleLink
            key={`${report.reportSetId}`}
            title={`${report.quizSetTitle}`}
            sub={`${new Date(report.testAt).toLocaleDateString()} ${new Date(report.testAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
            to={`${report.reportSetId}`}
          />
        );
      })}
    </ArticleBoard>
  );
}
