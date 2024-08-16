import { Link } from 'react-router-dom';
import styles from './ClassCard.module.css';
import CompassIcon from '/src/assets/icons/compass.svg?react';
import { STATIC_URL } from '../../constants';

export default function ClassCard({ img, path, children }) {
  return (
    <Link
      to={path}
      className={styles.card}
    >
      <div className={styles.thumbnail}>
        {img ? (
          <img
            src={`${STATIC_URL}${img}`}
            alt="강의 이미지"
            className={styles.thumbnail}
          />
        ) : (
          <CompassIcon />
        )}
      </div>
      <div className={styles.title}>{children}</div>
    </Link>
  );
}
