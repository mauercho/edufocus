import { ArticleLink } from '../../components/ArticleLink';
import ArticleBoard from '../../components/ArticleBoard/ArticleBoard';
import { ReportCard } from '../../components/ReportCard';
import styles from './StudentReportPage.module.css';
import { useStudentReports } from '../../hooks/api/useStudentReports';
import { useParams } from 'react-router-dom';

export default function StudentReportPage() {
  const { lectureId } = useParams();
  const { data } = useStudentReports(lectureId);
  console.log(data);
  const reportss = data?.data;
  console.log(reportss);
  const reports = [
    {
      reportId: 1,
      title: '퀴즈 1',
      correctCount: 8,
      allCount: 10,
    },
    {
      reportId: 2,
      title: '퀴즈 2',
      correctCount: 7,
      allCount: 10,
    },
    {
      reportId: 3,
      title: '퀴즈 3',
      correctCount: 9,
      allCount: 10,
    },
    {
      reportId: 4,
      title: '퀴즈 4',
      correctCount: 6,
      allCount: 10,
    },
  ];

  const totalCounts = reports.reduce(
    (acc, report) => {
      acc.correctCount += report.correctCount;
      acc.allCount += report.allCount;
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
              sub={`${Math.round((report.correctCount / report.allCount) * 100)}%`}
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
