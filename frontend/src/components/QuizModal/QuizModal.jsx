import styles from './QuizModal.module.css';
import { useRef } from 'react';
import CloseIcon from '/src/assets/icons/close.svg?react';

export default function QuizModal({ startQuiz, quizSets, closeModal }) {
  const wrapperRef = useRef(null);

  const handleClick = (e) => {
    if (e.target === wrapperRef.current) {
      closeModal();
    }
  };

  return (
    <div
      className={styles.wrapper}
      onClick={handleClick}
      ref={wrapperRef}
    >
      <div className={styles.modal}>
        <header className={styles.title}>
          <div>퀴즈 선택</div>
          <button onClick={closeModal}>
            <CloseIcon />
          </button>
        </header>
        <ul className={styles.list}>
          {quizSets.map((quizSet) => (
            <li
              key={quizSet.quizSetId}
              onClick={() => {
                startQuiz(quizSet.quizSetId);
                closeModal();
              }}
              className={styles.quiz}
            >
              {quizSet.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
