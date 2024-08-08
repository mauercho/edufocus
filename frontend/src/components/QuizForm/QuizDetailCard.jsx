import styles from './QuizCard.module.css';
import { STATIC_URL } from '../../constants';

export default function QuizCard({ index, question, answer, image, choices }) {
  // TODO: 정답 / 오답 관련 표현 필요 시 추가
  console.log(choices);
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.heading}>{index}번 퀴즈</span>
      </div>
      {image ? (
        <img
          src={`${STATIC_URL}${image}`}
          alt="이미지 없음"
          className={styles.imagePreview}
        />
      ) : (
        <div className={styles.imagePreview}>
          <div>이미지 없음</div>
        </div>
      )}
      <label className={styles.label}>질문</label>
      <div className={styles.input}>{question}</div>
      <label className={styles.label}>정답</label>
      <div className={styles.input}>{answer}</div>
      {choices.length > 0 && <label className={styles.label}>선택지</label>}
      {choices.map?.((choice, idx) => (
        <div
          className={styles.choiceDiv}
          key={idx}
        >
          <label>{choice.num} </label>
          <div className={`${styles.input} ${styles.choiceInput}`}>{choice.content}</div>
        </div>
      ))}
    </div>
  );
}
