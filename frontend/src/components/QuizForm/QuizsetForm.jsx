import { useState } from 'react';
import QuizCard from './QuizCard';
import styles from './QuizsetForm.module.css';

export default function QuizsetForm({ onSubmit }) {
  // TODO: 디자인 만들기 및 스타일 적용
  const [title, setTitle] = useState('');
  const [quizzes, setQuizzes] = useState([]);

  const handleAddQuiz = () => {
    setQuizzes([...quizzes, { question: '', answer: '', choices: [] }]);
  };

  const updateQuiz = (index, updatedQuiz) => {
    const updatedQuizzes = quizzes.map((quiz, i) => (i === index ? updatedQuiz : quiz));
    setQuizzes(updatedQuizzes);
  };

  return (
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
      {quizzes.map((quiz, index) => (
        <QuizCard
          key={index}
          quiz={quiz}
          index={index}
          updateQuiz={updateQuiz}
        />
      ))}
      <button
        type="button"
        onClick={handleAddQuiz}
      >
        퀴즈 추가하기
      </button>
      <button
        type="button"
        onClick={(e) => onSubmit(e, title, quizzes)}
      >
        퀴즈셋 저장하기
      </button>
    </form>
  );
}
