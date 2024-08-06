import { AuthForm, InputBox } from '../../components/AuthForm';
import { useRef, useState, useEffect } from 'react';
import styles from './PasswordResetPage.module.css';
import { Link, useNavigate } from 'react-router-dom';

export default function PasswordResetPage() {
  const navigate = useNavigate();
  const [time, setTime] = useState(5);
  const [sendEmail, setSendEmail] = useState(false);
  const emailRef = useRef('');
  const buttonText = useRef('비밀번호 찾기');
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('비밀번호 찾기', emailRef.current.value);
    setSendEmail(true);
  };

  useEffect(() => {
    if (!sendEmail) {
      return;
    }
    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [sendEmail]);

  useEffect(() => {
    if (time === 0) {
      navigate('../resetAuth');
    }
  }, [navigate, time]);

  return sendEmail ? (
    <section className={styles.loginGroup}>
      <h1 className={styles.title}>비밀번호 찾기</h1>
      <p className={styles.text}>
        비밀번호 초기화 인증번호를 이메일로 보냈습니다.
        <br />
        메일함을 확인해주세요.
        <br />
        <span className={styles.seconds}>{time}초</span> 후에 자동으로 인증번호 입력 페이지로 이동합니다.
      </p>
      <Link
        to={'../resetAuth'}
        className={styles.linkButton}
      >
        인증번호 입력하러 가기
      </Link>
    </section>
  ) : (
    <div className={styles.wrapper}>
      <AuthForm
        onSubmit={handleSubmit}
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
