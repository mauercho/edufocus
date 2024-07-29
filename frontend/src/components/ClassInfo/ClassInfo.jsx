import styles from './ClassInfo.module.css';

export default function ClassInfo({ classTerm, classTime, onSubmit }) {
  return (
    <div className={styles.classInfo}>
      <div className={styles.title}>수업정보</div>
      <div className={styles.info}>
        <div className={styles.textGroup}>
          <div className={styles.subtitle}>수업 기간</div>
          <div className={styles.content}>{classTerm}</div>
        </div>
        <div className={styles.textGroup}>
          <div className={styles.subtitle}>수업시간</div>
          <div className={styles.content}>{classTime}</div>
        </div>
      </div>
      <button
        onClick={onSubmit}
        className={styles.button}
      >
        수강신청
      </button>
    </div>
  );
}
