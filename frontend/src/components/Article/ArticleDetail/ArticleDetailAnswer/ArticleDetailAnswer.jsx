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
    <>
      <section className={styles.answer}>
        <div className={styles.answerHeader}>
          <ReplyIcon />
          <div className={styles.author}>선생님의 답변</div>
        </div>
        <p className={styles.content}>{answer}</p>
        <button
          type="button"
          className={styles.deleteButton}
          onClick={handleDeleteSubmit}
        >
          <div>삭제</div>
        </button>
        <button
          type="button"
          className={styles.editButton}
          onClick={onEditClick}
        >
          수정
        </button>
      </section>
    </>
  );
}
