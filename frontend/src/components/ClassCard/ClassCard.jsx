import { Link } from 'react-router-dom';
import styles from './ClassCard.module.css';
import CompassIcon from '/src/assets/icons/compass.svg?react';

export default function ClassCard({ img, path, children }) {
  return (
    <Link
      to={path}
      className={styles.card}
    >
      {img ? (
        <img
          src={`${import.meta.env.VITE_STATIC_URL}${img}`}
          alt="강의 이미지"
          className={styles.thumbnail}
        />
      ) : (
        <div className={styles.thumbnail}>
          <CompassIcon />
        </div>
      )}
      <div>{children}</div>
    </Link>
  );
}
