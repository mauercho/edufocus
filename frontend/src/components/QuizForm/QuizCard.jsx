import { useState } from 'react';
import styles from './QuizCard.module.css';

export default function QuizCard({ quiz, updateQuiz, deleteQuiz }) {
  // TODO: 카드 디자인 완성 및 이쁘게 바꾸기
  const [question, setQuestion] = useState(quiz.question || '');
  const [answer, setAnswer] = useState(quiz.answer || '');
  const [choices, setChoices] = useState(quiz.choices || []);
  const [image, setImage] = useState(quiz.image || null);
  const [imagePreview, setImagePreview] = useState(quiz.image || null);

  const handleChoiceChange = (num, content) => {
    const updatedChoices = choices.map((choice) => (choice.num === num ? { ...choice, content } : choice));
    setChoices(updatedChoices);
    updateQuiz(quiz.id, { ...quiz, question, answer, choices: updatedChoices, image });
  };

  const handleAddChoice = () => {
    if (choices.length < 4) {
      const newChoice = { num: choices.length + 1, content: '' };
      const updatedChoices = [...choices, newChoice];
      setChoices(updatedChoices);
      updateQuiz(quiz.id, { ...quiz, question, answer, choices: updatedChoices, image });
    }
  };

  const handlePopChoice = () => {
    if (choices.length > 0) {
      const updatedChoices = choices.slice(0, -1);
      setChoices(updatedChoices);
      updateQuiz(quiz.id, { ...quiz, question, answer, choices: updatedChoices, image });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0] ?? null;
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

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.heading}>퀴즈 생성 카드</span>
        <button
          className={`${styles.button} ${styles.remove}`}
          onClick={() => deleteQuiz(quiz.id)}
        >
          X
        </button>
      </div>
      <label
        htmlFor={`file-input-${quiz.id}`}
        className={styles.imageLabel}
      >
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Preview"
            className={styles.imagePreview}
          />
        ) : (
          <div className={styles.imagePreview}>
            {/* <CompassIcon /> */}
            <div>이미지 업로드</div>
          </div>
        )}
      </label>
      <input
        id={`file-input-${quiz.id}`}
        type="file"
        accept=".png, .jpg, .jpeg"
        onChange={handleFileChange}
        className={styles.hiddenInput}
      />
      <label className={styles.label}>질문</label>
      <input
        type="text"
        value={question}
        onChange={(e) => {
          setQuestion(e.target.value);
          updateQuiz(quiz.id, { ...quiz, question: e.target.value, answer, choices, image });
        }}
        className={styles.input}
        placeholder="질문 내용을 입력하세요"
      />
      <label className={styles.label}>정답</label>
      <input
        type="text"
        value={answer}
        onChange={(e) => {
          setAnswer(e.target.value);
          updateQuiz(quiz.id, { ...quiz, question, answer: e.target.value, choices, image });
        }}
        className={styles.input}
        placeholder="정답을 입력하세요"
      />
      <div>
        <span>Tip: 선택지를 넣지 않는다면 단답형 문제가 됩니다</span>
      </div>
      <div className={styles.buttonsWrapper}>
        <button
          type="button"
          onClick={handleAddChoice}
          className={`${styles.button} ${styles.add}`}
        >
          선택지 추가하기
        </button>
        <button
          type="button"
          onClick={handlePopChoice}
          className={`${styles.button} ${styles.remove}`}
        >
          선택지 줄이기
        </button>
      </div>
      {choices.map?.((choice, idx) => (
        <div
          className={styles.choiceDiv}
          key={idx}
        >
          <label>선택지 {choice.num} </label>
          <input
            className={`${styles.input} ${styles.choiceInput}`}
            type="text"
            value={choice.content}
            onChange={(e) => handleChoiceChange(choice.num, e.target.value)}
            placeholder={`Choice ${choice.num}`}
          />
        </div>
      ))}
    </div>
  );
}
