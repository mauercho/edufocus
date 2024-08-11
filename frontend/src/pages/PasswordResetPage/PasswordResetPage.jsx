import { AuthForm, InputBox } from '../../components/AuthForm';
import { useRef, useState } from 'react';
import styles from './PasswordResetPage.module.css';
import { Link } from 'react-router-dom';
import { usePasswordReset } from '../../hooks/api/usePasswordReset';

export default function PasswordResetPage() {
  const [emailSent, setEmailSent] = useState('');
  const [notFound, setNotFound] = useState(false);
  const emailRef = useRef('');

  const { sendEmail } = usePasswordReset();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotFound(false);
    await sendEmail(emailRef.current.value)
      .then(() => {
        setEmailSent(emailRef.current.value);
      })
      .catch((err) => {
        if (err.message === 'Request failed with status code 404') {
          setNotFound(true);
        }
        return;
      });
  };

  return emailSent ? (
    <section className={styles.loginGroup}>
      <h1 className={styles.title}>인증번호 받기</h1>
      <p className={styles.text}>
        비밀번호 초기화 인증번호를 이메일로 보냈습니다.
        <br />
        메일함을 확인해주세요.
      </p>
      <Link
        to={'../resetAuth'}
        className={styles.linkButton}
        state={emailSent}
      >
        인증번호 입력하러 가기
      </Link>
    </section>
  ) : (
    <div className={styles.wrapper}>
      <AuthForm
        onSubmit={handleSubmit}
        title="비밀번호 재설정"
        buttonText="인증번호 받기"
      >
        <InputBox
          title="이메일"
          id="email"
          type="email"
          ref={emailRef}
          hasError={notFound}
        >
          {notFound && <div>존재하지 않는 이메일입니다</div>}
        </InputBox>
      </AuthForm>
    </div>
  );
}
