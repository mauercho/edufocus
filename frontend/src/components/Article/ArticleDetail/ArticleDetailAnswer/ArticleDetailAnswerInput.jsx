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
    if (isEditing) {
      await answerEdit(questionId, answer);
    } else {
      await answerWrite(questionId, answer);
    }
    onSubmit(answer);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.answerWrapper}
    >
      <div className={styles.answer}>
        <textarea
          maxLength={1000}
          value={answer}
          onChange={handleInput}
          ref={textareaRef}
          placeholder="답변 작성하기"
          className={styles.input}
        />
        <button
          type="submit"
          className={styles.button}
        >
          <SendIcon />
        </button>
      </div>
      {answer && answer.length > 999 && <span>최대 1000글자까지 작성할 수 있습니다.</span>}
    </form>
  );
}
