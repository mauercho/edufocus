import styles from './LectureCreatePage.module.css';
import { useRef } from 'react';

export default function LectureCreatePage() {
  // TODO: 디자인 후 적용
  const title = useRef('');
  const description = useRef('');
  const plan = useRef('');
  const startDate = useRef('');
  const endDate = useRef('');
  const time = useRef('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title: title.current.value,
      description: description.current.value,
      plan: plan.current.value,
      startDate: startDate.current.value,
      endDate: endDate.current.value,
      time: time.current.value,
    };
    console.log(payload);
  };

  return (
    <form
      className={styles.createClass}
      onSubmit={handleSubmit}
    >
      <div className={styles.inputField}>
        <label className={styles.label}>강의명</label>
        <input
          className={styles.input}
          ref={title}
          type="text"
          placeholder="강의명을 입력하세요"
        />
      </div>
      <div className={styles.inputField}>
        <label className={styles.label}>설명</label>
        <input
          className={styles.input}
          ref={description}
          type="text"
          placeholder="강의에 대한 설명을 입력하세요"
        />
      </div>
      <div className={styles.inputField}>
        <label className={styles.label}>강의 계획</label>
        <textarea
          ref={plan}
          className={styles.textarea}
          placeholder="강의 계획을 입력하세요"
        ></textarea>
      </div>
      <div className={styles.inputField}>
        <label className={styles.label}>강의 기간</label>
        <input
          className={styles.input}
          ref={startDate}
          type="date"
        />
        <input
          className={styles.input}
          ref={endDate}
          type="date"
        />
      </div>
      <div className={styles.inputField}>
        <label className={styles.label}>수업 시간</label>
        <input
          type="text"
          ref={time}
          className={styles.textarea}
          placeholder="계획된 수업시간을 입력하세요"
        ></input>
      </div>
      <button
        type="submit"
        className={styles.button}
      >
        <div>ㅁ</div>
        <div className={styles.buttonText}>강의 생성</div>
      </button>
    </form>
  );
}
