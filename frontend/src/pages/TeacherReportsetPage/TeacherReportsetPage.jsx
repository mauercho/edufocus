import { ArticleLink } from '../../components/ArticleLink';
import ArticleBoard from '../../components/ArticleBoard/ArticleBoard';
import { useReportSets } from '../../hooks/api/useReportSets';
import { useParams } from 'react-router-dom';

export default function TeacherReportsetPage() {
  const { lectureId } = useParams();
  const { data } = useReportSets(lectureId);
  const reports = data?.data;

  console.log(data);
  return (
    <ArticleBoard
      title="퀴즈 관리"
      canCreate={false}
    >
      {reports.length &&
        reports.map?.((report) => (
          <ArticleLink
            key={`${report.reportSetId}`}
            title={`${report.quizSetTitle}`}
            sub={`${report.testAt}`}
            to={`${report.reportSetId}`}
          />
        ))}
    </ArticleBoard>
  );
}
