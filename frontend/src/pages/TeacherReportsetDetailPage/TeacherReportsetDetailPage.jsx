import { ArticleLink } from '../../components/ArticleLink';
import ArticleBoard from '../../components/ArticleBoard/ArticleBoard';
import { useReportSetDetail } from '../../hooks/api/useReportSetDetail';
import { useParams } from 'react-router-dom';

export default function TeacherReportsetDetailPage() {
  const { reportsetId } = useParams();

  const { data } = useReportSetDetail(reportsetId);
  const reports = data?.data;

  return (
    <ArticleBoard
      title="퀴즈 조회"
      canCreate={false}
    >
      {reports.length > 0 &&
        reports.map?.((report) => {
          return (
            <ArticleLink
              key={`${report.reportId}`}
              title={
                report.correctCount == -1
                  ? `${report.name} - 미응시`
                  : `${report.name} - ${report.title} 점수: ${report.correctCount}/${report.allCount}`
              }
              sub={`${new Date(report.date).toLocaleDateString()} ${new Date(report.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
              to={`../report/${report.reportId}`}
            />
          );
        })}
    </ArticleBoard>
  );
}
