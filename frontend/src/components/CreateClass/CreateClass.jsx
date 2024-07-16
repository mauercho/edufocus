import styles from './CreateClass.module.css';
import { useRef } from 'react';

export default function CreateClass() {
  // TODO: ㅁ 아이콘으로 변경
  const classTime = useRef('');
  const numOfLecture = useRef('');
  const significant = useRef('');

  const handleSubmit = () => {
    // TODO : 강의 생성 기능 작성
    const payload = {
      classTime: classTime.current.value,
      numOfLecture: numOfLecture.current.value,
      significant: significant.current.value,
    };
    alert(`특이사항 : ${payload.significant}`);
  };

  return (
    <form
      className={styles.createClass}
      onSubmit={handleSubmit}
    >
      <div className={styles.inputField}>
        <label className={styles.label}>수업 시간</label>
        <input
          className={styles.input}
          ref={classTime}
          type="text"
          placeholder="수업 시간을 입력하세요"
        />
      </div>
      <div className={styles.inputField}>
        <label className={styles.label}>강의 수</label>
        <input
          className={styles.input}
          ref={numOfLecture}
          type="text"
          placeholder="총 강의 수를 입력하세요"
        />
      </div>
      <div className={styles.inputField}>
        <label className={styles.label}>특이사항</label>
        <textarea
          ref={significant}
          className={styles.textarea}
          placeholder="이 수업만의 특이사항이 있다면 입력하세요"
        ></textarea>
      </div>
      <button
        type="submit"
        className={styles.button}
      >
        <div>ㅁ</div>
        <div className={styles.buttonText}>글 쓰기</div>
      </button>
    </form>
  );
}
