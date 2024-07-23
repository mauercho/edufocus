import styles from './LectureHeader.module.css';
import PlayIcon from '/src/assets/icons/play.svg?react';

export default function LectureHeader({ img, title, tutorImg, tutor, isLive = false }) {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <img
          src={img}
          alt="강의 이미지"
          className={styles.thumbnail}
        />
        <div className={styles.info}>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.desc}>
            <div className={styles.tutor}>
              <img
                src={tutorImg}
                alt="강사 사진"
                className={styles.tutorImg}
              />
              <div>{tutor}</div>
            </div>
            <div>
              {isLive ? (
                <button
                  type="button"
                  className={styles.liveButton}
                >
                  <PlayIcon />
                  <span>실시간 강의 입장하기</span>
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
