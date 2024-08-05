import { Link } from 'react-router-dom';
import styles from './ClassCard.module.css';

export default function ClassCard({ img, path, children }) {
  return (
    <Link
      to={path}
      className={styles.card}
    >
      <img
        src={'img'}
        alt="강의 이미지"
        className={styles.thumbnail}
      />
      <div>{children}</div>
    </Link>
  );
}
