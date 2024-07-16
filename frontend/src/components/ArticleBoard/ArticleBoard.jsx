import { ArticleLink } from '../ArticleLink';
import styles from './ArticleBoard.module.css';

export default function ArticleBoard() {
  return (
    <div className={styles.articleBoard}>
      <div className={styles.title}>공지사항</div>
      <div className={styles.article}>
        <ArticleLink />
        <ArticleLink />
        <ArticleLink />
        <ArticleLink />
        <ArticleLink />
        <ArticleLink />
        <ArticleLink />
      </div>
    </div>
  );
}
