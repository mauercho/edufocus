import { AuthForm, InputBox } from '../../components/AuthForm';
import { useRef } from 'react';
import styles from './PasswordResetPage.module.css';

export default function PasswordResetPage() {
  const emailRef = useRef('');
  const buttonText = useRef('비밀번호 찾기');
  const handleSubmit = () => {
    // TODO: 비밀번호 찾기 POST 기능 추가
    console.log('비밀번호 찾기', emailRef.current.value);
    buttonText.current = '로그인하러 가기';
  };
  return (
    <div className={styles.wrapper}>
      <AuthForm
        submitFunction={handleSubmit}
        title="비밀번호 찾기"
        buttonText={buttonText.current}
      >
        {/* <div className={styles.text}>비밀번호 초기화 이메일을 보냈습니다. 이메일을 확인해주세요</div> */}
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
