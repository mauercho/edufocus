import styles from './Toggle.module.css';

export default function Toggle({ choices, active, setActive }) {
  return (
    <div className={styles.toggle}>
      {choices?.map((choice) => (
        <button
          key={choice}
          type="button"
          className={choice === active ? styles.active : ''}
          onClick={() => setActive(choice)}
        >
          {choice}
        </button>
      ))}
    </div>
  );
}
