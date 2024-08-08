import styles from './LearningLecturesPage.module.css';
import { Link } from 'react-router-dom';
import { useMyLectures } from '../../hooks/api/useMyLectures';
import CompassIcon from '/src/assets/icons/compass.svg?react';
import { STATIC_URL } from '../../constants';

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
              {lecture.image ? (
                <img
                  src={`${STATIC_URL}${lecture.image}`}
                  alt={lecture.title}
                  className={styles.thumbnail}
                />
              ) : (
                <div className={styles.thumbnail}>
                  <CompassIcon />
                </div>
              )}
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
