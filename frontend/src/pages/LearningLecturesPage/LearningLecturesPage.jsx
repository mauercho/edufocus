import styles from './LearningLecturesPage.module.css';
import { Link } from 'react-router-dom';
import { useMyLectures } from '../../hooks/api/useMyLectures';

export default function LearningLecturesPage() {
  const { data } = useMyLectures();
  const onGoingClasses = data?.data ?? [];
  const hasOnGoingClasses = onGoingClasses.length > 0;

  return (
    <section>
      <h2 className={styles.title}>수강중인 강의</h2>
      <div className={styles.grid}>
        {hasOnGoingClasses ? (
          onGoingClasses.map?.((lecture) => (
            <Link
              key={lecture.id}
              to={`/lecture/${lecture.id}`}
              className={styles.card}
            >
              <div className={styles.thumbnail} />
              <div>{lecture.title}</div>
            </Link>
          ))
        ) : (
          <div className={styles.empty}>수강중인 강의가 없습니다.</div>
        )}
      </div>
    </section>
  );
}
