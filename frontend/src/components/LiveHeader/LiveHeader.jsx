import styles from './LiveHeader.module.css';

export default function LiveHeader() {
  const { data } = {
    data: {
      title: '정보처리기사 실기 완전정복',
      subtitle: '2차시',
      participants: 3,
    },
  };

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <div className={styles.area}>
          <h1>{data.title}</h1>
          <div>{data.subtitle}</div>
        </div>
        <div className={styles.area}>
          <h2>참가자 수</h2>
          <div>{data.participants}명</div>
        </div>
      </div>
    </header>
  );
}
