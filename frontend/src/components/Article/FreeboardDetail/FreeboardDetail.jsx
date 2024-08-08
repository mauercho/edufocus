import BackIcon from '/src/assets/icons/back.svg?react';
import { Link } from 'react-router-dom';
import styles from './FreeboardDetail.module.css';
import FreeboardCommentInput from './FreeDetailComments/FreeboardCommentInput';
import FreeboardComment from './FreeDetailComments/FreeboardComment';
import { useComments } from '../../../hooks/api/useComments';
import { useCommentWrite } from '../../../hooks/api/useCommentWrite';
import { useParams } from 'react-router-dom';

export default function FreeboardDetail({ topic, title, author, content, onDelete, isMine }) {
  const { freeboardId } = useParams();
  const { data, refetch } = useComments(freeboardId);
  const { commentWrite } = useCommentWrite();
  const comments = data?.data;

  const handleCommentSubmit = async (newComment) => {
    await commentWrite(freeboardId, newComment);
    refetch();
  };

  return (
    <div className={styles.freeboardDetail}>
      <header className={styles.header}>
        <div className={styles.headerInside}>
          <Link
            to={'..'}
            className={styles.goBack}
          >
            <BackIcon />
            <span>{topic}</span>
          </Link>
          <div>
            <h1 className={styles.title}>{title}</h1>
            {author && <span className={styles.author}>{author}</span>}
          </div>
        </div>
        {isMine && (
          <div className={styles.actionGroup}>
            <Link
              to="edit"
              className={styles.edit}
              state={{ title: title, content: content }}
            >
              수정
            </Link>
            <button
              type="button"
              className={styles.delete}
              onClick={onDelete}
            >
              <div>삭제</div>
            </button>
          </div>
        )}
      </header>
      <div>
        <p className={styles.content}>{content}</p>
      </div>
      {comments &&
        comments.map((comment) => (
          <FreeboardComment
            key={comment.id}
            content={comment.content}
            author={comment.name}
            commentId={comment.id}
            isMine={comment.mine}
            onDeleteSubmit={refetch}
            onEditSubmit={refetch}
          />
        ))}
      <FreeboardCommentInput onCommentSubmit={handleCommentSubmit} />
    </div>
  );
}
