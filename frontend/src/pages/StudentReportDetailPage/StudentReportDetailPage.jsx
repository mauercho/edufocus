import { Link, useParams } from 'react-router-dom';
import styles from './StudentReportDetailPage.module.css';
import BackIcon from '/src/assets/icons/back.svg?react';
import { useStudentReportDetail } from '../../hooks/api/useStudentReportDetail';
import { QuizDetailCard } from '../../components/QuizForm';

export default function StudentReportDetailPage() {
  const { reportId } = useParams();
  const { data } = useStudentReportDetail(reportId);
  const report = data.data;
  console.log(report);
  const { allCount, correctCount, quizzes, title } = report;
  const score = Math.round((100 * correctCount) / allCount);
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <Link
          to={'..'}
          className={styles.goBack}
        >
          <BackIcon />
          <span>퀴즈 성적</span>
        </Link>
        <div className={styles.title}>{title}</div>
      </header>
      <p>{allCount === 0 ? '미응시' : `점수 : ${score}점 ( ${correctCount} / ${allCount} )`}</p>
      <div className={styles.grid}>
        {quizzes.map((quiz, index) => (
          <QuizDetailCard
            key={index + 1}
            index={index + 1}
            question={quiz.question}
            image={quiz.image}
            answer={quiz.answer}
            choices={quiz.choices}
            userAnswer={quiz.userAnswer}
          />
        ))}
      </div>
    </div>
  );
}
