import styles from './UserRegisterPage.module.css';
import { useRef, useState } from 'react';
import { AuthForm, InputBox } from '../../components/AuthForm';
import instance from '../../utils/axios/instance';
import { API_URL } from '../../constants';

export default function UserRegisterPage() {
  const idRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: 회원가입 POST 기능 추가
    const isPWMatch = passwordRef.current.value === passwordConfirmRef.current.value;

    setPasswordMatch(isPWMatch);
    if (!isPWMatch) {
      return;
    }

    const userData = {
      userId: idRef.current.value,
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    const response = await instance.post(`${API_URL}/user/join`, userData);
    console.log(response);
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
