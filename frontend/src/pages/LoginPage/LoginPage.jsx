import { AuthForm, InputBox } from '../../components/AuthForm';
import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/api/useAuth';
import styles from './LoginPage.module.css';
import useBoundStore from '../../store';

export default function LoginPage() {
  const navigate = useNavigate();
  const token = useBoundStore((state) => state.token);
  const { login } = useAuth();
  const idRef = useRef('');
  const passwordRef = useRef('');
  const linkProps = {
    message: '아직 회원이 아니신가요?',
    path: '../register',
    title: '회원가입',
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const id = idRef.current.value;
    const password = passwordRef.current.value;

    login(id, password)
      .then(() => {
        navigate('/', { replace: true });
      })
      .catch(() => {
        alert('아이디 또는 비밀번호를 다시 확인해주세요.');
        passwordRef.current.value = '';
        idRef.current.focus();
      });
  };

  useEffect(() => {
    if (token) {
      navigate('/', { replace: true });
    }
  }, [navigate, token]);

  return (
    <div className={styles.wrapper}>
      <AuthForm
        onSubmit={handleSubmit}
        title="로그인"
        buttonText="로그인"
        linkProps={linkProps}
      >
        <InputBox
          title="ID"
          id="id"
          type="text"
          ref={idRef}
          maxLength={20}
        />
        <InputBox
          title="비밀번호"
          type="password"
          id="password"
          ref={passwordRef}
          maxLength={20}
        >
          <Link
            to={'../password-reset'}
            className={`${styles.textBodyStrong} ${styles.secondaryColor}`}
          >
            비밀번호를 잊으셨나요?
          </Link>
        </InputBox>
      </AuthForm>
    </div>
  );
}
