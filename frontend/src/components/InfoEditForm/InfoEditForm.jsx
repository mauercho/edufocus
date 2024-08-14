import styles from './InfoEditForm.module.css';
import { useState, useEffect } from 'react';

export default function InfoEditForm({ name, email, onSubmit, usingEmail }) {
  const [username, setUsername] = useState(name);
  const [useremail, setUseremail] = useState(email);

  useEffect(() => {
    setUsername(name);
    setUseremail(email);
  }, [name, email]);

  return (
    <form
      onSubmit={(e) => onSubmit(e, username, useremail)}
      className={styles.infoEditForm}
    >
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
          maxLength={20}
          className={`${styles.input} ${styles.textBody}`}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {username.length > 19 && <div className={styles.maxLengthMessage}>최대 20자까지 입력 가능합니다</div>}
      </div>
      <p className={styles.textHeading}>이메일 변경</p>
      <div className={styles.inputBox}>
        <label
          htmlFor="useremail"
          className={styles.textBody}
        >
          이메일을 입력하세요
        </label>
        <input
          placeholder="이메일"
          type="email"
          id="useremail"
          className={`${styles.input} ${styles.textBody} ${usingEmail && styles.errorBox}`}
          value={useremail}
          maxLength={50}
          onChange={(e) => setUseremail(e.target.value)}
          required
        />
        {useremail.length > 49 && <div className={styles.maxLengthMessage}>최대 50자까지 입력 가능합니다</div>}

        {usingEmail && <div className={styles.errorText}>이미 사용중인 이메일입니다</div>}
      </div>
      <button
        disabled={(!username && !useremail) || (username == name && useremail == email)}
        className={styles.buttonBox}
      >
        내 정보 수정
      </button>
    </form>
  );
}
