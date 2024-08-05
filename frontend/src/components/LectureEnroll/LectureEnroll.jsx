import styles from './LectureEnroll.module.css';
import { useLectureEnrollCancel } from '../../hooks/api/useLectureEnrollCancel';
import { useLectureEnrollAccept } from '../../hooks/api/useLectureEnrollAccept';

export default function LectureEnroll({ userName, enrollid, onDelete }) {
  const { lectureEnrollCancel } = useLectureEnrollCancel();
  const { lectureEnrollAccept } = useLectureEnrollAccept();

  const handleAccept = async (e) => {
    e.preventDefault();
    await lectureEnrollAccept(enrollid);
    onDelete(enrollid);
  };

  const handleCancel = async (e) => {
    e.preventDefault();
    await lectureEnrollCancel(enrollid);
    onDelete(enrollid);
  };

  return (
    <div className={styles.enrollLink}>
      <p>{userName}</p>
      <button onClick={handleAccept}>등록</button>
      <button onClick={handleCancel}>삭제</button>
    </div>
  );
}
