import styles from './ArticleDetailAnswer.module.css';
import ReplyIcon from '/src/assets/icons/reply.svg?react';
import { useParams } from 'react-router-dom';
import { useAnswerDelete } from '../../../../hooks/api/useAnswerDelete';

export default function ArticleDetailAnswer({ answer, onEditClick, onDeleteSubmit }) {
  const { questionId } = useParams();
  const { answerDelete } = useAnswerDelete();

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();

    await answerDelete(questionId);
    onDeleteSubmit();
  };

  return (
    <section className={styles.answer}>
      <div className={styles.answerHeader}>
        <div className={styles.author}>
          <ReplyIcon /> <span>선생님의 답변</span>
        </div>
        <div className={styles.actionGroup}>
          <button
            type="button"
            className={styles.edit}
            onClick={onEditClick}
          >
            수정
          </button>
          <button
            type="button"
            className={styles.delete}
            onClick={handleDeleteSubmit}
          >
            <div>삭제</div>
          </button>
        </div>
      </div>
      <p className={styles.content}>{answer}</p>
    </section>
  );
}
