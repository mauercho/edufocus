import styles from './FreeboardDetail.module.css';
import FreeboardCommentInput from './FreeDetailComments/FreeboardCommentInput';
import FreeboardComment from './FreeDetailComments/FreeboardComment';
import { useComments } from '../../../hooks/api/useComments';
import { useCommentWrite } from '../../../hooks/api/useCommentWrite';
import { useParams } from 'react-router-dom';
import ArticleDetail from '../ArticleDetail/ArticleDetail';

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
      <ArticleDetail
        topic={topic}
        title={title}
        author={author}
        content={content}
        onDelete={onDelete}
        isQna={false}
        isMine={isMine}
      />
      {comments && (
        <div className={styles.commentWrapper}>
          {comments.map((comment) => (
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
        </div>
      )}
      <FreeboardCommentInput onCommentSubmit={handleCommentSubmit} />
    </div>
  );
}
