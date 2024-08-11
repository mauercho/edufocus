import BackIcon from '/src/assets/icons/back.svg?react';
import { Link } from 'react-router-dom';
import styles from './QuizsetDetail.module.css';
import { QuizDetailCard } from '../QuizForm';

export default function QuizsetDetail({ topic, title, quizzes = [], onDelete, onEdit, tested = false }) {
  return (
    <div className={styles.quizsetDetail}>
      <header className={styles.header}>
        <div className={styles.headerInside}>
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
        </div>
        <div className={styles.actionGroup}>
          {!tested && (
            <button
              className={styles.edit}
              onClick={onEdit}
            >
              수정
            </button>
          )}
          <button
            type="button"
            className={styles.delete}
            onClick={onDelete}
          >
            삭제
          </button>
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
      {tested && <div className={styles.tested}>이미 진행된 퀴즈는 수정이 불가능합니다.</div>}
    </div>
  );
}
