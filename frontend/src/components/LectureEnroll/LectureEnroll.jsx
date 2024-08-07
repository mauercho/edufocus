import styles from './LectureEnroll.module.css';
import { useLectureEnrollCancel } from '../../hooks/api/useLectureEnrollCancel';
import { useLectureEnrollAccept } from '../../hooks/api/useLectureEnrollAccept';

export default function LectureEnroll({ userName, enrollid, onDelete }) {
  const { lectureEnrollCancel } = useLectureEnrollCancel();
  const { lectureEnrollAccept } = useLectureEnrollAccept();

  const handleAccept = async (e) => {
    e.preventDefault();
    if (!confirm('수강신청을 승인하시겠습니까?')) {
      return;
    }
    await lectureEnrollAccept(enrollid);
    onDelete(enrollid);
  };

  const handleCancel = async (e) => {
    e.preventDefault();
    if (!confirm('수강신청을 거절하시겠습니까?')) {
      return;
    }
    await lectureEnrollCancel(enrollid);
    onDelete(enrollid);
  };

  return (
    <div className={styles.enrollLink}>
      <span>{userName}</span>
      <div className={styles.buttonWrapper}>
        <button
          onClick={handleAccept}
          className={styles.accept}
        >
          등록
        </button>
        <button
          onClick={handleCancel}
          className={styles.reject}
        >
          삭제
        </button>
      </div>
    </div>
  );
}
