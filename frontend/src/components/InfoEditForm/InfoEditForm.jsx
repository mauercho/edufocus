import styles from './InfoEditForm.module.css';
import { useState } from 'react';

export default function InfoEditForm() {
  const [username, setUsername] = useState('');
  const [useremail, setUseremail] = useState('');
  return (
    <form className={styles.infoEditForm}>
      <p className={styles.textHeading}>이름 변경</p>
      <div className={styles.inputBox}>
        <label
          htmlFor="username"
          className={styles.textBody}
        >
          강의에서 사용할 이름을 입력하세요
        </label>
        <input
          placeholder="이름"
          type="text"
          id="username"
          className={`${styles.input} ${styles.textBody}`}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <p className={styles.textHeading}>이메일 변경</p>
      <div className={styles.inputBox}>
        <label
          htmlFor="useremail"
          className={styles.textBody}
        >
          이메일을 입력하세요.
        </label>
        <input
          placeholder="이메일"
          type="text"
          id="useremail"
          className={`${styles.input} ${styles.textBody}`}
          value={useremail}
          onChange={(e) => setUseremail(e.target.value)}
          required
        />
      </div>
      <button className={styles.buttonBox}>내 정보 수정</button>
    </form>
  );
}
