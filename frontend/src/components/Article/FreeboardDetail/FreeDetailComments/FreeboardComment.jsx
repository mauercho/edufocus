import styles from './FreeboardComment.module.css';
import ReplyIcon from '/src/assets/icons/reply.svg?react';
import { useCommentDelete } from '../../../../hooks/api/useCommentDelete';
import { useState } from 'react';
import { useCommentEdit } from '../../../../hooks/api/useCommentEdit';

export default function FreeboardComment({ content, author, onDeleteSubmit, onEditSubmit, commentId }) {
  const [isEditing, setIsEditing] = useState(false);
  const { commentDelete } = useCommentDelete();
  const { commentEdit } = useCommentEdit();
  const handleDeleteSubmit = async (e) => {
    e.preventDefault();

    await commentDelete(commentId);
    onDeleteSubmit();
  };

  const [newComment, setNewComment] = useState(content);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await commentEdit(commentId, newComment);
    setIsEditing(false);
    onEditSubmit();
  };

  const onEditClick = async (e) => {
    e.preventDefault();
    setIsEditing(true);
  };

  return (
    <>
      {isEditing ? (
        <form
          onSubmit={handleSubmit}
          className={styles.commentEdit}
        >
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="답변 작성"
            className={styles.input}
            required
          />
          <button
            type="submit"
            className={styles.button}
          >
            작성
          </button>
        </form>
      ) : (
        <section className={styles.comment}>
          <div className={styles.commentHeader}>
            <ReplyIcon />
            <div className={styles.author}>{author}의 답변</div>
          </div>
          <p className={styles.content}>{content}</p>
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
      )}
    </>
  );
}
