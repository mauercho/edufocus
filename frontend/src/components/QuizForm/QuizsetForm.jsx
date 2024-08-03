import { useState } from 'react';
import QuizCard from './QuizCard';
import styles from './QuizsetForm.module.css';
import EditIcon from '/src/assets/icons/edit.svg?react';
import BackIcon from '/src/assets/icons/back.svg?react';
import { Link } from 'react-router-dom';

export default function QuizsetForm({ headerTitle, topic, to, onSubmit }) {
  const [title, setTitle] = useState('');
  const [quizzes, setQuizzes] = useState([]);
  const [quizId, setQuizId] = useState(0); 

  const handleAddQuiz = () => {
    setQuizzes([
      ...quizzes,
      { id: quizId, question: '', answer: '', choices: [], imageFile: null },
    ]);
    setQuizId(quizId + 1);
  };

  const updateQuiz = (id, updatedQuiz) => {
    const updatedQuizzes = quizzes.map((quiz) =>
      quiz.id === id ? updatedQuiz : quiz
    );
    setQuizzes(updatedQuizzes);
  };

  const deleteQuiz = (id) => {
    setQuizzes(quizzes.filter((quiz) => quiz.id !== id));
  };

  return (
    <div className={styles.quizsetForm}>
      <header className={styles.header}>
        <Link to={to} className={styles.goBack}>
          <BackIcon />
          <span>{headerTitle}</span>
        </Link>
        <div className={styles.title}>{topic}</div>
      </header>
      <form
        className={styles.form}
        onSubmit={(e) => onSubmit(e, title, quizzes)}
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="퀴즈셋 제목을 입력해주세요"
        />
        {quizzes.map((quiz) => (
          <QuizCard
            key={quiz.id}
            quiz={quiz}
            updateQuiz={updateQuiz}
            deleteQuiz={deleteQuiz}
          />
        ))}
        <button
          type="button"
          onClick={handleAddQuiz}
          className={styles.button}
        >
          퀴즈 추가하기
        </button>
        <button type="submit" className={styles.button}>
          <EditIcon />
          <div>제출</div>
        </button>
      </form>
    </div>
  );
}