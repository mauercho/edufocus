import styles from './FreeboardCommentInput.module.css';
import { useState } from 'react';

export default function FreeboardCommentInput({ onCommentSubmit }) {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onCommentSubmit(newComment);
    setNewComment('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.comment}
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
  );
}
