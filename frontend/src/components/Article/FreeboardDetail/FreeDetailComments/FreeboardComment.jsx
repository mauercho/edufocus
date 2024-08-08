import styles from './FreeboardComment.module.css';
import ReplyIcon from '/src/assets/icons/reply.svg?react';
import { useCommentDelete } from '../../../../hooks/api/useCommentDelete';
import { useState } from 'react';
import { useCommentEdit } from '../../../../hooks/api/useCommentEdit';

import SendIcon from '/src/assets/icons/send.svg?react';

export default function FreeboardComment({ content, author, onDeleteSubmit, onEditSubmit, commentId, isMine }) {
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
            placeholder="댓글 수정하기"
            className={styles.input}
            required
          />
          <button
            type="submit"
            className={styles.button}
          >
            <SendIcon />
          </button>
        </form>
      ) : (
        <section className={styles.comment}>
          <div className={styles.commentHeader}>
            <div className={styles.title}>
              <ReplyIcon />
              <div className={styles.author}>{author}</div>
            </div>

            {isMine && (
              <div className={styles.actionGroup}>
                <button
                  type="button"
                  className={styles.edit}
                  to={'edit'}
                  onClick={onEditClick}
                >
                  수정
                </button>
                <button
                  type="button"
                  className={styles.delete}
                  onClick={handleDeleteSubmit}
                >
                  삭제
                </button>
              </div>
            )}
          </div>
          <p className={styles.content}>{content}</p>
        </section>
      )}
    </>
  );
}
