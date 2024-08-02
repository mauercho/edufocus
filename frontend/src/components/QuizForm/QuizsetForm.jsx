import { useState } from 'react';
import QuizCard from './QuizCard';
import styles from './QuizsetForm.module.css';
import EditIcon from '/src/assets/icons/edit.svg?react';
import BackIcon from '/src/assets/icons/back.svg?react';
import { Link } from 'react-router-dom';

export default function QuizsetForm({ headerTitle, topic, to, onSubmit }) {
  // TODO: 디자인 만들기 및 스타일 적용
  const [title, setTitle] = useState('');
  const [quizzes, setQuizzes] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  const handleAddQuiz = () => {
    setQuizzes([...quizzes, { question: '', answer: '', choices: [] }]);
  };

  const updateQuiz = (index, updatedQuiz) => {
    const updatedQuizzes = quizzes.map((quiz, i) => (i === index ? updatedQuiz : quiz));
    setQuizzes(updatedQuizzes);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setImageFile(file);
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
        onSubmit={(e) => onSubmit(e, title, quizzes, imageFile)}
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
          className={styles.button}
        >
          퀴즈 추가하기
        </button>
        <label>퀴즈 이미지</label>
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          onChange={handleFileChange}
        />
        <button
          type="submit"
          className={styles.button}
        >
          <EditIcon />
          <div>제출</div>
        </button>
      </form>
    </div>
  );
}
