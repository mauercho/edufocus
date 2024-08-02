import styles from './ArticleDetailAnswerInput.module.css';
import { useAnswerWrite } from '../../../../hooks/api/useAnswerWrite';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

export default function ArticleDetailAnswerInput({ onSubmit, initialAnswer }) {
  const { answerWrite } = useAnswerWrite();
  const { questionId } = useParams();
  const [newAnswer, setNewAnswer] = useState(initialAnswer);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await answerWrite(questionId, newAnswer);
    onSubmit(newAnswer);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.answer}
    >
      {/* TODO: 여기 css 부분은 내가 임의로 넣었음 */}
      <input
        type="text"
        value={newAnswer}
        onChange={(e) => setNewAnswer(e.target.value)}
        placeholder="답변 작성"
        className={styles.input}
      />
      <button
        type="submit"
        className={styles.button}
      >
        작성
      </button>
    </form>
  );
}
