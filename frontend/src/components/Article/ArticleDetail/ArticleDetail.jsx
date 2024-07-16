import { Link } from "react-router-dom";
import styles from './ArticleDetail.module.css'
import ArticleDetailAnswer from "./ArticleDetailAnswer/ArticleDetailAnswer";

export default function ArticleDetail() {

    const title = '헷갈리는게 있어요';
    const author = '이재용';
    const content = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis sed dolorem vitae?';
    return (
        <div className={styles.articleDetail}>
            <header>
                <div>
                    <Link to={'/'} className={styles.backButton}>
                        <div>-</div>
                        <div className={styles.backText}>Q&A</div>
                    </Link>
                </div>
                <div>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.author}>{author}</div>
                </div>
            </header>
            <div>
                <p className={styles.content}>{content}</p>
            </div>
            <ArticleDetailAnswer />
        </div>
    )
}