import { useState, useEffect } from 'react';
import QuizCard from './QuizCard';
import styles from './QuizsetForm.module.css';
import EditIcon from '/src/assets/icons/edit.svg?react';
import BackIcon from '/src/assets/icons/back.svg?react';
import { Link } from 'react-router-dom';
import PlusIcon from '/src/assets/icons/plus.svg?react';

export default function QuizsetForm({ headerTitle, topic, to, onSubmit, initialValue = null }) {
  const [title, setTitle] = useState('');
  const [quizzes, setQuizzes] = useState([]);
  const [quizId, setQuizId] = useState(0);

  useEffect(() => {
    if (initialValue) {
      setTitle(initialValue.title || '');
      setQuizzes(initialValue.quizzes || []);
      setQuizId(initialValue.quizzes ? initialValue.quizzes[initialValue.quizzes.length - 1].id + 1 : 0);
      console.log(initialValue.quizzes.length);
    }
  }, [initialValue]);

  const handleAddQuiz = () => {
    console.log(quizzes);
    setQuizzes([...quizzes, { id: quizId, question: '', answer: '', choices: [], image: null }]);
    setQuizId(quizId + 1);
  };

  const updateQuiz = (id, updatedQuiz) => {
    console.log(quizzes);
    const updatedQuizzes = quizzes.map((quiz) => (quiz.id === id ? updatedQuiz : quiz));
    setQuizzes(updatedQuizzes);
  };

  const deleteQuiz = (id) => {
    console.log(quizzes);
    setQuizzes(quizzes.filter((quiz) => quiz.id !== id));
  };

  return (
    <div className={styles.quizsetForm}>
      <header className={styles.header}>
        <Link
          to={to}
          className={styles.goBack}
        >
          <BackIcon />
          <span>{headerTitle}</span>
        </Link>
        <div className={styles.title}>{topic}</div>
      </header>
      <form
        className={styles.form}
        onSubmit={(e) => onSubmit(e, title, quizzes)}
      >
        <label className={styles.label}>퀴즈셋 제목</label>
        <input
          className={styles.input}
          type="text"
          maxLength={255}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="퀴즈셋 제목을 입력해주세요"
        />
        <div className={styles.grid}>
          {quizzes.map((quiz) => (
            <QuizCard
              key={quiz.id}
              quiz={quiz}
              updateQuiz={updateQuiz}
              deleteQuiz={deleteQuiz}
            />
          ))}
          <div
            type="button"
            onClick={handleAddQuiz}
            className={styles.addCard}
          >
            <PlusIcon />
            <span>새 퀴즈 추가</span>
          </div>
        </div>
        <button
          type="submit"
          className={`${styles.button} ${styles.add} ${styles.create}`}
        >
          <EditIcon />
          <div>퀴즈 생성하기</div>
        </button>
      </form>
    </div>
  );
}
