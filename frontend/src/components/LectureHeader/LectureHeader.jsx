import { Link, useParams } from 'react-router-dom';
import styles from './LectureHeader.module.css';
import PlayIcon from '/src/assets/icons/play.svg?react';
import CompassIcon from '/src/assets/icons/compass.svg?react';
import useBoundStore from '../../store';
import instance from '../../utils/axios/instance';
import { API_URL } from '../../constants';

export default function LectureHeader({ img, title, tutor, isLive = false, refetch }) {
  const { lectureId } = useParams();
  const userType = useBoundStore((state) => state.userType);
  const isTeacher = userType === 'teacher';
  const closeLiveRoom = () => {
    instance
      .post(`${API_URL}/video/deleteroom/${lectureId}`)
      .catch(() => {})
      .finally(() => {
        refetch();
      });
  };

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
            <div className={styles.buttonGroup}>
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
              {isTeacher && isLive && (
                <button
                  className={styles.closeButton}
                  onClick={closeLiveRoom}
                >
                  강의실 닫기
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
