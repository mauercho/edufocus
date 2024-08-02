import BackIcon from '/src/assets/icons/back.svg?react';
import { Link } from 'react-router-dom';
import styles from './ArticleDetail.module.css';
import ArticleDetailAnswer from './ArticleDetailAnswer/ArticleDetailAnswer';
import ArticleDetailAnswerInput from './ArticleDetailAnswer/ArticleDetailAnswerInput';
import EditIcon from '/src/assets/icons/edit.svg?react';
import { useState, useEffect } from 'react';

export default function ArticleDetail({ topic, title, author = null, content, answer = null, onDelete }) {
  const [submittedAnswer, setSubmittedAnswer] = useState(answer);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setSubmittedAnswer(answer);
  }, [answer]);

  const handleAnswerSubmit = (newAnswer) => {
    setSubmittedAnswer(newAnswer);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteSubmit = () => {
    setSubmittedAnswer(null);
    setIsEditing(false);
  };

  return (
    <div className={styles.articleDetail}>
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
        <Link
          type="button"
          className={styles.editButton}
          to={'edit'}
          state={{ title: title, content: content, answer: answer }}
        >
          <EditIcon className={styles.icon} />
          <span>수정하기</span>
        </Link>
        <button
          type="button"
          className={styles.deleteButton}
          onClick={onDelete}
        >
          삭제하기
        </button>
      </header>
      <div>
        <p className={styles.content}>{content}</p>
      </div>
      {/* TODO: 이 부분에서 answer 만든다음 뒤로가기로 나갔다가 돌아오면 0.1초 정도 input 칸이 보였다가 answer 로 바뀜. 수정필요 */}
      {submittedAnswer && !isEditing ? (
        <ArticleDetailAnswer
          answer={submittedAnswer}
          onEditClick={handleEditClick}
          onDeleteSubmit={handleDeleteSubmit}
        />
      ) : (
        <ArticleDetailAnswerInput
          onSubmit={handleAnswerSubmit}
          initialAnswer={submittedAnswer}
        />
      )}
    </div>
  );
}
