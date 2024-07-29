import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './EditArticle.module.css';
import EditIcon from '/src/assets/icons/edit.svg?react';
import BackIcon from '/src/assets/icons/back.svg?react';

export default function EditArticle({ topic, title, prevTitle, prevContent, onSubmit }) {
  const [articleTitle, setArticleTitle] = useState(prevTitle);
  const [articleContent, setArticleContent] = useState(prevContent);
  const textAreaRef = useRef(null);

  //   useEffect(() => {
  //     adjustTextAreaHeight();
  //   }, []);

  useEffect(() => {
    adjustTextAreaHeight();
  }, [articleContent]);

  const adjustTextAreaHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  const handleInput = (e) => {
    setArticleContent(e.target.value);
  };

  return (
    <div className={styles.createArticle}>
      <header className={styles.header}>
        <Link
          to={'..'}
          className={styles.goBack}
        >
          <BackIcon />
          <span>{title}</span>
        </Link>
        <div className={styles.title}>{topic}</div>
      </header>
      <form
        className={styles.formWrapper}
        onSubmit={(e) => onSubmit(e, articleTitle, articleContent)}
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
            ref={textAreaRef}
            className={styles.contentInput}
            placeholder="내용을 입력하세요"
            value={articleContent}
            onChange={handleInput}
          ></textarea>
        </div>
        <button
          type="button"
          className={styles.button}
          onClick={(e) => onSubmit(e, articleTitle, articleContent)}
          disabled={!articleTitle || !articleContent || (articleTitle === prevTitle && articleContent === prevContent)}
        >
          <EditIcon />
          <div>수정하기</div>
        </button>
      </form>
    </div>
  );
}
