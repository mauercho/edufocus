import { useState } from 'react';
import QuizCard from './QuizCard';
import styles from './QuizsetForm.module.css';
import EditIcon from '/src/assets/icons/edit.svg?react';
import BackIcon from '/src/assets/icons/back.svg?react';
import { Link } from 'react-router-dom';

export default function QuizsetForm({ headerTitle, topic, to, onSubmit }) {
  const [title, setTitle] = useState('');
  const [quizzes, setQuizzes] = useState([]);
  const [images, setImages] = useState([]);

  const handleAddQuiz = () => {
    setQuizzes([...quizzes, { question: '', answer: '', choices: [] }]);
    setImages([...images, null]);
  };

  const updateQuiz = (index, updatedQuiz) => {
    const updatedQuizzes = quizzes.map((quiz, idx) => (idx === index ? updatedQuiz : quiz));
    setQuizzes(updatedQuizzes);
  };

  const updateImage = (index, imageFile) => {
    const updatedImages = images.map((img, idx) => (idx === index ? imageFile : img));
    setImages(updatedImages);
  };

  const deleteQuiz = (index) => {
    console.log(index);
    setQuizzes(quizzes.filter((_, idx) => idx !== index));
    setImages(images.filter((_, idx) => idx !== index));
    console.log(quizzes);
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
        onSubmit={(e) => onSubmit(e, title, quizzes, images)}
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
            updateImage={updateImage}
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
