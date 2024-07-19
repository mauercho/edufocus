import { AuthForm, InputBox } from '../../components/AuthForm';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const idRef = useRef('');
  const passwordRef = useRef('');
  // linkProps : 버튼 아래 나오는 링크(회원가입 등)에 대한 props object
  const linkProps = {
    message: '아직 회원이 아니신가요?',
    path: '/',
    title: '회원가입',
  };

  const findPasswordPath = '/';

  const handleSubmit = () => {
    // TODO: 로그인 POST 기능 추가
    console.log('로그인', idRef.current.value, passwordRef.current.value);
  };
  return (
    <div className={styles.wrapper}>
      <AuthForm
        submitFunction={handleSubmit}
        title="로그인"
        buttonText="로그인"
        linkProps={linkProps}
      >
        <InputBox
          title="ID"
          id="id"
          type="text"
          ref={idRef}
        />
        <InputBox
          title="비밀번호"
          type="password"
          id="password"
          ref={passwordRef}
        >
          <Link
            to={findPasswordPath}
            className={`${styles.textBodyStrong} ${styles.secondaryColor}`}
          >
            비밀번호를 잊으셨나요?
          </Link>
        </InputBox>
      </AuthForm>
    </div>
  );
}
