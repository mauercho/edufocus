import styles from './FreeboardCommentInput.module.css';
import { useState } from 'react';
import SendIcon from '/src/assets/icons/send.svg?react';

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
        maxLength={200}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="댓글 작성하기"
        className={styles.input}
        required
      />
      {newComment.length > 199 && <div className={styles.textLength}>최대 200글자까지 작성할 수 있습니다.</div>}
      <button
        type="submit"
        className={styles.button}
      >
        <SendIcon />
      </button>
    </form>
  );
}
