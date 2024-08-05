import BackIcon from '/src/assets/icons/back.svg?react';
import { Link } from 'react-router-dom';
import styles from './QuizsetDetail.module.css';

export default function QuizsetDetail({ topic, title, quizzes = [], onDelete }) {
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
            <img
              src={quiz.image}
              alt="강의 이미지"
            />
            <div>정답 : {quiz.answer}</div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={onDelete}
      >
        퀴즈셋 삭제
      </button>
    </div>
  );
}
