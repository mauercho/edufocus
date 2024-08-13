import { useEffect, useState } from 'react';
import styles from './QuizCard.module.css';
import CloseIcon from '/src/assets/icons/close.svg?react';
import PlusIcon from '/src/assets/icons/plus.svg?react';
import { Toggle } from '../Toggle';
import { STATIC_URL } from '../../constants';

export default function QuizCard({ quiz, updateQuiz, deleteQuiz }) {
  const [question, setQuestion] = useState(quiz.question || '');
  const [answer, setAnswer] = useState(Number(quiz.answer) || '');
  const [choices, setChoices] = useState(quiz.choices || [{ num: 1, content: '' }]);
  const [image, setImage] = useState(quiz.image || null);
  const [imagePreview, setImagePreview] = useState(quiz.image ? `${STATIC_URL}${quiz.image}` : null);
  const [quizType, setQuizType] = useState('단답식');

  const clearImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleChoiceChange = (num, content) => {
    const updatedChoices = choices.map((choice) => (choice.num === num ? { ...choice, content } : choice));
    setChoices(updatedChoices);
    updateQuiz(quiz.id, { ...quiz, question, answer, choices: updatedChoices, image });
  };

  const handleAddChoice = () => {
    if (choices.length >= 4) {
      return;
    }
    const newChoice = { num: choices.length + 1, content: '' };
    const updatedChoices = [...choices, newChoice];
    setChoices(updatedChoices);
    updateQuiz(quiz.id, { ...quiz, question, answer, choices: updatedChoices, image });
  };

  const handlePopChoice = () => {
    if (choices.length <= 1) {
      return;
    }
    const updatedChoices = choices.slice(0, -1);
    setChoices(updatedChoices);
    if (updatedChoices.length < answer) {
      setAnswer(1);
    }
    updateQuiz(quiz.id, { ...quiz, question, answer, choices: updatedChoices, image });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 해주세요');
      e.target.value = null;
      clearImage();
      return;
    }
    setImage(file);
    updateQuiz(quiz.id, { ...quiz, question, answer, choices, image: file });
    if (file) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setImagePreview(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleChoiceSelect = (choiceContent) => {
    setAnswer(choiceContent);
    updateQuiz(quiz.id, { ...quiz, question, answer: choiceContent, choices, image });
  };

  useEffect(() => {
    quizType === '단답식' ? setAnswer('') : setAnswer(1);
  }, [quizType]);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <span>Q.</span>
          <input
            type="text"
            value={question}
            maxLength={200}
            autoFocus
            onChange={(e) => {
              setQuestion(e.target.value);
              updateQuiz(quiz.id, { ...quiz, question: e.target.value, answer, choices, image });
            }}
            placeholder="질문 내용을 입력하세요"
          />
        </div>
        <button
          className={`${styles.cardRemove}`}
          onClick={() => deleteQuiz(quiz.id)}
        >
          <CloseIcon />
        </button>
      </div>
      <div className={styles.content}>
        {imagePreview ? (
          <div className={styles.imageArea}>
            <label htmlFor={`file-input-${quiz.id}`}>
              <img
                src={imagePreview}
                alt="Preview"
                className={styles.imagePreview}
              />
            </label>
            <button
              type="button"
              onClick={clearImage}
            >
              <CloseIcon />
            </button>
          </div>
        ) : (
          <label htmlFor={`file-input-${quiz.id}`}>
            <div className={styles.imagePreview}>
              <PlusIcon />
              <span>퀴즈 이미지 추가</span>
            </div>
          </label>
        )}
        <div className={styles.answerArea}>
          <Toggle
            active={quizType}
            setActive={setQuizType}
            choices={['단답식', '객관식']}
          />
          <input
            id={`file-input-${quiz.id}`}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={styles.hiddenInput}
          />
          <div className={styles.choicesWrapper}>
            <div className={styles.label}>정답</div>
            {quizType === '객관식' ? (
              <>
                {choices.map((choice, index) => (
                  <div
                    key={index}
                    className={styles.choice}
                  >
                    <button
                      type="button"
                      onClick={() => handleChoiceSelect(index + 1)}
                      className={`${styles.choiceButton} ${answer === index + 1 ? styles.selected : ''}`}
                    >
                      {index + 1}
                    </button>
                    <input
                      className={`${styles.input} ${styles.choiceInput}`}
                      type="text"
                      maxLength={200}
                      value={choice.content}
                      onChange={(e) => handleChoiceChange(choice.num, e.target.value)}
                      placeholder={`보기 ${choice.num}`}
                    />
                  </div>
                ))}
                <div className={styles.buttonsWrapper}>
                  <button
                    type="button"
                    onClick={handlePopChoice}
                    className={`${styles.button} ${styles.remove} ${choices.length <= 1 ? styles.hidden : ''}`}
                  >
                    보기 줄이기
                  </button>
                  <button
                    type="button"
                    onClick={handleAddChoice}
                    className={`${styles.button} ${styles.add} ${choices.length >= 4 ? styles.hidden : ''}`}
                  >
                    보기 추가
                  </button>
                </div>
              </>
            ) : (
              <input
                type="text"
                value={answer}
                maxLength={200}
                onChange={(e) => {
                  setAnswer(e.target.value);
                  updateQuiz(quiz.id, { ...quiz, question, answer: e.target.value, choices, image });
                }}
                className={styles.input}
                placeholder="정답을 입력하세요"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
