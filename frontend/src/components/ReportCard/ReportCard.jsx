import styles from './ReportCard.module.css';

export default function ReportCard({ allCount = 10, correctCount = 7 }) {
  const radius = 2 * Math.PI * 100;
  const percentage = allCount > 0 ? (correctCount / allCount) * 100 : 0;
  const strokeDashoffset = radius - (percentage / 100) * radius;

  return (
    <div className={styles.wrapper}>
      <div className={styles.svgWrapper}>
        <svg
          width="220"
          height="220"
          viewBox="0 0 220 220"
        >
          <circle
            cx="110"
            cy="110"
            r="100"
            strokeDasharray={radius}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 110 110)"
            className={styles.circle}
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className={`${styles.bodyStrong} ${styles.centerText}`}
          >
            {`점수 : ${Math.round(percentage)}`}
          </text>
        </svg>
      </div>
      <div className={styles.stats}>
        <span className={styles.bodyStrong}>내 성적</span>
        <span className={styles.body}>
          {correctCount} / {allCount}
        </span>
      </div>
    </div>
  );
}
