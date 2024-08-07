import BackIcon from '/src/assets/icons/back.svg?react';
import { Link } from 'react-router-dom';
import styles from './QuizsetDetail.module.css';
import { QuizDetailCard } from '../QuizForm';

export default function QuizsetDetail({ topic, title, quizzes = [], onDelete, onEdit }) {
  console.log('topic', topic, 'title', title, 'quizzes', quizzes);
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
      <div className={styles.grid}>
        {quizzes.map?.((quiz, index) => (
          <QuizDetailCard
            key={index}
            index={index + 1}
            question={quiz.question}
            answer={quiz.answer}
            choices={quiz.choices}
            image={quiz.image}
          />
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
