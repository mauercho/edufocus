import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './CreateArticle.module.css';

export default function CreateArticle({ topic, title, backPath = '/' }) {
  const navigate = useNavigate();

  const [articleTitle, setArticleTitle] = useState('');
  const [articleContent, setArticleContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: 글 작성 기능 연결
    if (articleTitle && articleContent) {
      navigate(backPath);
    }
  };
  // TODO: 입력 크기에 따라 반응형으로 textarea 크기 변경
  const handleInput = (e) => {
    setArticleContent(e.target.value);
    // 높이를 자동으로 조정
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

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
            value={articleContent}
            onChange={handleInput}
          ></textarea>
        </div>
        <button
          type="button"
          className={styles.button}
          onClick={handleSubmit}
          disabled={!articleTitle || !articleContent}
        >
          <div>i</div>
          <div>글 쓰기</div>
        </button>
      </form>
    </div>
  );
}
