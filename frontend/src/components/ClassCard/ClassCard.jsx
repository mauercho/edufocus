import { Link } from 'react-router-dom';
import styles from './ClassCard.module.css';

export default function ClassCard({ path, children }) {
  return (
    <Link
      to={path}
      className={styles.card}
    >
      <div className={styles.thumbnail} />
      <div>{children}</div>
    </Link>
  );
}
