import styles from './ArticleDetailAnswerInput.module.css';
import { useAnswerWrite } from '../../../../hooks/api/useAnswerWrite';
import { useAnswerEdit } from '../../../../hooks/api/useAnswerEdit';
import { useParams } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import SendIcon from '/src/assets/icons/send.svg?react';
export default function ArticleDetailAnswerInput({ onSubmit, initialAnswer = '', isEditing = false }) {
  // TODO: 우선 Textarea로 댓글 수정. 필요시 Input으로 다시 변경
  const { answerWrite } = useAnswerWrite();
  const { answerEdit } = useAnswerEdit();
  const { questionId } = useParams();
  const [answer, setAnswer] = useState(initialAnswer);

  const textareaRef = useRef(null);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [answer]);

  const handleInput = (e) => {
    const { value } = e.target;
    setAnswer(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(isEditing);
    if (isEditing) {
      await answerEdit(questionId, answer);
    } else {
      await answerWrite(questionId, answer);
    }
    onSubmit(answer);
  };

  console.log(answer);

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.answer}
    >
      <textarea
        maxLength={1000}
        value={answer}
        onChange={handleInput}
        ref={textareaRef}
        placeholder="답변 작성하기"
        className={styles.input}
      />
      {answer && answer.length > 950 && <div className={styles.textLength}>{answer.length} / 1000</div>}

      <button
        type="submit"
        className={styles.button}
      >
        <SendIcon />
      </button>
    </form>
  );
}
