import styles from './LearningLecturesPage.module.css';
import { Link } from 'react-router-dom';
import { useMyLectures } from '../../hooks/api/useMyLectures';

export default function LearningLecturesPage() {
  const { data } = useMyLectures();
  const onGoingClasses = data?.data ?? [];

  return (
    <section>
      <h2 className={styles.title}>수강중인 강의</h2>
      <div className={styles.grid}>
        {onGoingClasses.map?.((lecture) => (
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
