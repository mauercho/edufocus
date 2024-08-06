import BackIcon from '/src/assets/icons/back.svg?react';
import { Link } from 'react-router-dom';
import styles from './QuizsetDetail.module.css';

export default function QuizsetDetail({ topic, title, quizzes = [], onDelete, onEdit }) {
  return (
    <div className={styles.quizsetDetail}>
      <header className={styles.header}>
        <Link
          to={'..'}
          className={styles.goBack}
        >
          <BackIcon />
          <span>{topic}</span>
        </Link>
        <div>
          <h1 className={styles.title}>{title}</h1>
        </div>
      </header>
      <div>
        {quizzes.map((quiz, index) => (
          <div key={index}>
            <div>질문 : {quiz.question}</div>
            {quiz.image && (
              <img
                src={`${import.meta.env.VITE_STATIC_URL}${quiz.image}`}
                alt="강의 이미지"
                className={styles.image}
              />
            )}
            <div>정답 : {quiz.answer}</div>
            {quiz.choices != [] &&
              quiz.choices.map?.((choice, choiceIndex) => (
                <div key={choice.id}>
                  <div>
                    선택지 {choiceIndex + 1} : {choice.content}
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={onDelete}
      >
        퀴즈셋 삭제
      </button>
      <button
        type="button"
        onClick={onEdit}
      >
        퀴즈셋 수정
      </button>
    </div>
  );
}
