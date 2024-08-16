import styles from './ClassInfo.module.css';

export default function ClassInfo({ classTerm, classTime, status = 'NOT_ENROLLED', onSubmit }) {
  // TODO: 수강신청 취소(필요시) 기능구현
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
      {status !== 'MANAGED_BY_OTHERS' && (
        <button
          onClick={onSubmit}
          className={styles.button}
          disabled={status === 'PENDING'}
        >
          {status === 'PENDING' && '수강신청 중'}
          {status === 'ENROLLED' && '강의 상세페이지로 이동'}
          {status === 'NOT_ENROLLED' && '수강신청'}
        </button>
      )}
    </div>
  );
}
