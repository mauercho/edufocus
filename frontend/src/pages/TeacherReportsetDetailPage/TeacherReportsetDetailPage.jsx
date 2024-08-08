import { ArticleLink } from '../../components/ArticleLink';
import ArticleBoard from '../../components/ArticleBoard/ArticleBoard';
import { useReportSetDetail } from '../../hooks/api/useReportSetDetail';
import { useParams } from 'react-router-dom';

export default function TeacherReportsetDetailPage() {
  const { reportsetId } = useParams();
  const { data } = useReportSetDetail(reportsetId);
  const reports = data?.data;

  console.log(reports);
  return (
    <ArticleBoard
      title="퀴즈 조회"
      canCreate={false}
    >
      {reports.length &&
        reports.map?.((report) => (
          <ArticleLink
            key={`${report.id}`}
            title={`${report.name} - ${report.title} 점수: ${report.correctCount}/${report.allCount}`}
            sub={`${report.date}`}
            to={`../../report/${report.id}`}
          />
        ))}
    </ArticleBoard>
  );
}
