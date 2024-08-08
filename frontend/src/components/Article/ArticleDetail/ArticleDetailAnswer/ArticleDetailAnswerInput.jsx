import styles from './ArticleDetailAnswerInput.module.css';
import { useAnswerWrite } from '../../../../hooks/api/useAnswerWrite';
import { useAnswerEdit } from '../../../../hooks/api/useAnswerEdit';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

export default function ArticleDetailAnswerInput({ onSubmit, initialAnswer, isEditing = false }) {
import SendIcon from '/src/assets/icons/send.svg?react';
  const { answerWrite } = useAnswerWrite();
  const { answerEdit } = useAnswerEdit();
  const { questionId } = useParams();
  const [newAnswer, setNewAnswer] = useState(initialAnswer);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(isEditing);
    if (isEditing) {
      await answerEdit(questionId, newAnswer);
    } else {
      await answerWrite(questionId, newAnswer);
    }
    onSubmit(newAnswer);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.answer}
    >
      <input
        type="text"
        maxLength={255}
        value={newAnswer}
        onChange={(e) => setNewAnswer(e.target.value)}
        placeholder="답변 작성하기"
        className={styles.input}
      />
      <button
        type="submit"
        className={styles.button}
      >
        <SendIcon />
      </button>
    </form>
  );
}
