import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './CreateArticle.module.css';

export default function CreateArticle({ topic, title, backPath = '/' }) {
  const navigate = useNavigate();

  const [articleTitle, setArticleTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: 글 작성 기능 연결
    if (articleTitle && content) {
      navigate(backPath);
    }
  };
  // TODO: 입력 크기에 따라 반응형으로 textarea 크기 변경

  return (
    <div className={styles.createArticle}>
      <header>
        <div>
          <Link
            to={backPath}
            className={styles.backButton}
          >
            <div>-</div>
            <div className={styles.backText}>{title}</div>
          </Link>
        </div>
        <div className={styles.title}>{topic}</div>
      </header>
      <form
        className={styles.formWrapper}
        onSubmit={handleSubmit}
      >
        <div className={styles.fieldWrapper}>
          <label className={styles.label}>제목</label>
          <input
            type="text"
            className={styles.titleInput}
            placeholder="제목을 입력하세요"
            value={articleTitle}
            onChange={(e) => setArticleTitle(e.target.value)}
          />
        </div>
        <div className={styles.fieldWrapper}>
          <label className={styles.label}>내용</label>
          <textarea
            className={styles.contentInput}
            placeholder="내용을 입력하세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <button
          type="button"
          className={styles.button}
          onClick={handleSubmit}
          disabled={!articleTitle || !content}
        >
          <div>| i |</div>
          <div>글 쓰기</div>
        </button>
      </form>
    </div>
  );
}
