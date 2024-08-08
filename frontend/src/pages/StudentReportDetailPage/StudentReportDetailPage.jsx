import { Link, useParams } from 'react-router-dom';
import styles from './StudentReportDetailPage.module.css';
import BackIcon from '/src/assets/icons/back.svg?react';
// import { useStudentReportDetail } from '../../hooks/api/useStudentReportDetail';
import { QuizDetailCard } from '../../components/QuizForm';

export default function StudentReportDetailPage() {
  const { reportId } = useParams();
  console.log(reportId);
  // const report = useStudentReportDetail(reportId);
  // console.log(report);
  // TODO: API 연결 후 실제 동작 확인 및 QuizDetailCard에 Map 적용

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <Link
          to={'..'}
          className={styles.goBack}
        >
          <BackIcon />
          <span>퀴즈 목록</span>
        </Link>
        <div className={styles.title}>퀴즈명</div>
      </header>
      <p>점수 : 70점 ( 7 / 10 )</p>
      <div className={styles.grid}>
        <QuizDetailCard
          index={1}
          question={'??'}
          answer={'!!'}
          choices={[]}
        />
      </div>
    </div>
  );
}
