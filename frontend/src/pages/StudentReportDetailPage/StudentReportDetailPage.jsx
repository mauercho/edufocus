import { Link, useParams } from 'react-router-dom';
import styles from './StudentReportDetailPage';
import BackIcon from '/src/assets/icons/back.svg?react';
import { useStudentReportDetail } from '../../hooks/api/useStudentReportDetail';

export default function StudentReportDetailPage() {
  const { reportId } = useParams();
  console.log(reportId);
  const { data } = useStudentReportDetail(reportId);
  console.log(data);

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.headerInside}>
          <Link
            to={'..'}
            className={styles.goBack}
          >
            <BackIcon />
            <span>퀴즈 성적</span>
          </Link>
          <div>
            <h1 className={styles.title}>퀴즈명</h1>
          </div>
        </div>
      </header>
      <div>
        <h3>맞은 퀴즈</h3>
        <div></div>
      </div>
      <div>
        <h3>틀린 퀴즈</h3>
        <div></div>
      </div>
    </div>
  );
}
