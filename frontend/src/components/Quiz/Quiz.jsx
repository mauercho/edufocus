import { useState } from 'react';
import { STATIC_URL } from '../../constants';
import styles from './Quiz.module.css';

export default function Quiz({ question, image, choices = [], setAnswers }) {
  const [answer, setAnswer] = useState(null);
  const isChoice = choices.length > 0;

  return (
    <div className={styles.quiz}>
      <header className={styles.header}>
        <h1>{question}</h1>
        {image && (
          <img
            src={`${STATIC_URL}${image}`}
            alt="문제 이미지"
          />
        )}
      </header>
      <div className={styles.choiceWrapper}>
        {isChoice ? (
          choices.map(({ id, num, content }) => (
            <div
              key={id}
              onClick={() => {
                setAnswer(num);
                setAnswers(num);
              }}
              className={`${styles.choice} ${answer === num ? styles.active : ''}`}
            >
              <span className={styles.number}>{num}</span>
              <span>{content}</span>
            </div>
          ))
        ) : (
          <input
            type="text"
            autoFocus
            placeholder="답 입력"
            onChange={(e) => {
              setAnswers(e.target.value);
            }}
            className={styles.input}
          />
        )}
      </div>
    </div>
  );
}
