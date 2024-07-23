import styles from './LearningLecturesPage.module.css';
import { Link } from 'react-router-dom';

export default function LearningLecturesPage() {
  const { data: onGoingClasses } = {
    data: [
      { lecture_id: 1, title: '한국어' },
      { lecture_id: 2, title: '영어' },
      { lecture_id: 3, title: '일본어' },
    ],
  };

  return (
    <section>
      <h2 className={styles.title}>수강중인 강의</h2>
      <div className={styles.grid}>
        {onGoingClasses.map((lecture) => (
          <Link
            key={lecture.lecture_id}
            to={`/lecture/${lecture.lecture_id}`}
            className={styles.card}
          >
            <div className={styles.thumbnail} />
            <div>{lecture.title}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
