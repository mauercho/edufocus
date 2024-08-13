import { Link, useParams } from 'react-router-dom';
import styles from './LectureHeader.module.css';
import PlayIcon from '/src/assets/icons/play.svg?react';
import CompassIcon from '/src/assets/icons/compass.svg?react';
import UserIcon from '/src/assets/icons/user.svg?react';
import useBoundStore from '../../store';

export default function LectureHeader({ img, title, tutorImg, tutor, isLive = false }) {
  const { lectureId } = useParams();
  const userType = useBoundStore((state) => state.userType);
  const isTeacher = userType === 'teacher';

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        {img ? (
          <img
            src={`${import.meta.env.VITE_STATIC_URL}${img}`}
            alt="강의 이미지"
            className={styles.thumbnail}
          />
        ) : (
          <div className={styles.thumbnail}>
            <CompassIcon />
          </div>
        )}
        <div className={styles.info}>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.desc}>
            <div className={styles.tutor}>
              <div>{tutor}</div>
            </div>
            <div>
              {isLive || isTeacher ? (
                <Link
                  to={`/live/${lectureId}`}
                  target="_blank"
                  type="button"
                  className={styles.liveButton}
                >
                  <PlayIcon />
                  <span>실시간 강의 입장하기</span>
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
