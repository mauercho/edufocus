import { AuthForm, InputBox } from '../../components/AuthForm';
import { useRef, useState } from 'react';
import styles from './PasswordResetAuthPage.module.css';

export default function PasswordResetPage() {
  const [sentAuthNum, setSentAuthNum] = useState(false);
  const authNumRef = useRef('');
  const passwordRef = useRef('');
  const passwordConfirmRef = useRef('');

  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(authNumRef.current.value);
    authNumRef.current.value = '';
    setSentAuthNum(true);
  };

  const handlePost = async (e) => {
    e.preventDefault();
    const isPWMatch = passwordRef.current.value === passwordConfirmRef.current.value;

    setPasswordMatch(isPWMatch);
    if (!isPWMatch) {
      return;
    }
    console.log(passwordRef.current.value, passwordConfirmRef.current.value);
  };

  return sentAuthNum ? (
    <div className={styles.wrapper}>
      <AuthForm
        onSubmit={handlePost}
        title="비밀번호 변경"
        buttonText="비밀번호 변경"
      >
        <InputBox
          title="새 비밀번호"
          type="password"
          id="password"
          ref={passwordRef}
        />
        <InputBox
          title="새 비밀번호 확인"
          type="password"
          id="passwordConfirm"
          ref={passwordConfirmRef}
          hasError={!passwordMatch}
        >
          {!passwordMatch && (
            <div className={`${styles.textBodyStrong} ${styles.dangerColor}`}>비밀번호가 일치하지 않습니다</div>
          )}
        </InputBox>
      </AuthForm>
    </div>
  ) : (
    <div className={styles.wrapper}>
      <AuthForm
        onSubmit={handleSubmit}
        title="인증번호 입력"
        buttonText="인증번호 입력"
      >
        <InputBox
          title="인증번호"
          id="authNum"
          type="password"
          ref={authNumRef}
        />
      </AuthForm>
    </div>
  );
}
