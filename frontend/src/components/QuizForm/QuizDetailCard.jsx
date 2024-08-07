import styles from './QuizCard.module.css';
import { STATIC_URL } from '../../constants';

export default function QuizCard({ index, question, answer, image, choices }) {
  console.log(question, answer, image, choices);
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
      <input
        type="text"
        value={question}
        className={styles.input}
      />
      <label className={styles.label}>정답</label>
      <input
        type="text"
        value={answer}
        className={styles.input}
      />
      {choices.map?.((choice, idx) => (
        <div
          className={styles.choiceDiv}
          key={idx}
        >
          <label>선택지 {choice.num} </label>
          <input
            className={`${styles.input} ${styles.choiceInput}`}
            type="text"
            value={choice.content}
          />
        </div>
      ))}
    </div>
  );
}
