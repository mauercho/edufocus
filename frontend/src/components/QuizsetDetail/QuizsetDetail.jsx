import BackIcon from '/src/assets/icons/back.svg?react';
import { Link } from 'react-router-dom';
import styles from './QuizsetDetail.module.css';

export default function QuizsetDetail({ topic, title }) {
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
    </div>
  );
}
