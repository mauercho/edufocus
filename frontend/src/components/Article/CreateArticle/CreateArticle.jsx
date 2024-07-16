import { Link } from 'react-router-dom';
import styles from './CreateArticle.module.css';

export default function CreateArticle() {
  // TODO: 입력 크기에 따라 반응형으로 textarea 크기 변경
  return (
    <div className={styles.createArticle}>
      <header className={styles.header}>
        <div>
          <Link
            to={'/'}
            className={styles.backButton}
          >
            <div>-</div>
            <div className={styles.backText}>Q&A</div>
          </Link>
        </div>
        <div className={styles.title}>질문하기</div>
      </header>
      <div className={styles.formWrapper}>
        <form>
          <div className={styles.fieldWrapper}>
            <label className={styles.label}>제목</label>
            <input
              type="text"
              className={styles.titleInput}
            />
          </div>
          <div className={styles.fieldWrapper}>
            <label className={styles.label}>내용</label>
            <textarea className={styles.contentInput}></textarea>
          </div>
          <div className={styles.buttonWrapper}>
            <button className={styles.button}>
              <div>| i |</div>
              <div className={styles.buttonText}>글 쓰기</div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
