import { AuthForm, InputBox } from '../../components/AuthForm';
import { useRef, useState } from 'react';
import styles from './PasswordResetPage.module.css';
import { Link } from 'react-router-dom';

export default function PasswordResetPage() {
  const [sendEmail, setSendEmail] = useState(false);
  const emailRef = useRef('');
  const buttonText = useRef('비밀번호 찾기');
  const handleSubmit = () => {
    // TODO: 비밀번호 찾기 POST 기능 추가
    console.log('비밀번호 찾기', emailRef.current.value);
    // delay
    setTimeout(() => {
      setSendEmail(true);
    }, 200);
  };

  return sendEmail ? (
    <section className={styles.loginGroup}>
      <h1 className={styles.title}>비밀번호 찾기</h1>
      <p className={styles.text}>
        비밀번호 초기화 이메일을 보냈습니다.
        <br />
        메일함을 확인해주세요.
      </p>
      <Link
        to={'../login'}
        className={styles.linkButton}
      >
        로그인하러 가기
      </Link>
    </section>
  ) : (
    <div className={styles.wrapper}>
      <AuthForm
        submitFunction={handleSubmit}
        title="비밀번호 찾기"
        buttonText={buttonText.current}
      >
        <InputBox
          title="이메일"
          id="email"
          type="email"
          ref={emailRef}
        />
      </AuthForm>
    </div>
  );
}
