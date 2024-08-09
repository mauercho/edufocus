import { ArticleLink } from '../../components/ArticleLink';
import ArticleBoard from '../../components/ArticleBoard/ArticleBoard';
import { ReportCard } from '../../components/ReportCard';
import styles from './StudentReportPage.module.css';
import { useStudentReports } from '../../hooks/api/useStudentReports';
import { useParams } from 'react-router-dom';

export default function StudentReportPage() {
  const { lectureId } = useParams();
  const { data } = useStudentReports(lectureId);
  const reports = data?.data;

  const totalCounts = reports.reduce(
    (acc, report) => {
      if (acc.allCount > 0) {
        acc.correctCount += report.correctCount;
        acc.allCount += report.allCount;
      }
      return acc;
    },
    { correctCount: 0, allCount: 0 }
  );

  return (
    <ArticleBoard
      title="퀴즈 성적"
      canCreate={false}
    >
      <div className={styles.wrapper}>
        <div className={styles.LinksContainer}>
          {reports.map?.((report) => (
            <ArticleLink
              key={`${report.reportId}`}
              title={report.title}
              sub={report.allCount === 0 ? '미응시' : `${Math.round((report.correctCount / report.allCount) * 100)}%`}
              to={`${report.reportId}`}
            />
          ))}
        </div>
        <div className={styles.reportCardContainer}>
          <ReportCard
            correctCount={totalCounts.correctCount}
            allCount={totalCounts.allCount}
          />
        </div>
      </div>
    </ArticleBoard>
  );
}
