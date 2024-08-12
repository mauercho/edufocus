import styles from './QuizDetailCard.module.css';
import { STATIC_URL } from '../../constants';

export default function QuizDetailCard({ index, question, answer, image, choices, userAnswer = null, correct = true }) {
  return (
    <div className={`${styles.card} ${!correct && styles.incorrect}`}>
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
      {!correct && (
        <>
          <label className={styles.label}>나의 오답</label>
          <div className={styles.input}>{userAnswer}</div>
        </>
      )}
      {choices.length > 0 && <label className={styles.label}>선택지</label>}
      {choices.map?.((choice, idx) => (
        <div
          className={styles.choiceDiv}
          key={idx}
        >
          <label className={styles.numLabel}>{choice.num} </label>
          <div className={`${styles.input} ${styles.choiceInput}`}>{choice.content}</div>
        </div>
      ))}
    </div>
  );
}
