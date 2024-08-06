import styles from './UserRegisterPage.module.css';
import { useRef, useState } from 'react';
import { AuthForm, InputBox } from '../../components/AuthForm';
import { useAuth } from '../../hooks/api/useAuth';
import { useNavigate } from 'react-router-dom';

export default function UserRegisterPage() {
  const navigate = useNavigate();

  const idRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const [userType, setUserType] = useState('STUDENT');
  const [passwordMatch, setPasswordMatch] = useState(true);

  const { userRegister } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isPWMatch = passwordRef.current.value === passwordConfirmRef.current.value;

    setPasswordMatch(isPWMatch);
    if (!isPWMatch) {
      return;
    }
    userRegister(
      userType,
      idRef.current.value,
      nameRef.current.value,
      emailRef.current.value,
      passwordRef.current.value
    ).then((response) => {
      console.log(response);
      navigate('../login');
    });
  };

  const linkProps = {
    message: '이미 회원이신가요?',
    path: '../login',
    title: '로그인',
  };

  return (
    <div className={styles.wrapper}>
      <AuthForm
        onSubmit={handleSubmit}
        title="회원가입"
        buttonText="회원가입"
        linkProps={linkProps}
      >
        <div className={styles.typeWrapper}>
          <button
            type="button"
            className={`${styles.typeButton} ${userType === 'STUDENT' && styles.active}`}
            onClick={() => setUserType('STUDENT')}
          >
            학생
          </button>
          <button
            type="button"
            className={`${styles.typeButton} ${userType === 'ADMIN' && styles.active}`}
            onClick={() => setUserType('ADMIN')}
          >
            강사
          </button>
        </div>
        <InputBox
          title="ID"
          type="text"
          id="ID"
          ref={idRef}
        />
        <InputBox
          title="이름"
          type="text"
          id="name"
          ref={nameRef}
        />
        <InputBox
          title="이메일"
          type="email"
          id="email"
          ref={emailRef}
        />
        <InputBox
          title="비밀번호"
          type="password"
          id="password"
          ref={passwordRef}
        />
        <InputBox
          title="비밀번호 확인"
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
  );
}
