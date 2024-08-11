import { AuthForm, InputBox } from '../../components/AuthForm';
import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './PasswordResetAuthPage.module.css';
import { usePasswordReset } from '../../hooks/api/usePasswordReset';

export default function PasswordResetPage() {
  // TODO: 비밀번호 변경 기능확인 후 최종 완성
  const location = useLocation();
  const email = location.state;
  const navigate = useNavigate();
  const { verify, updatePassword } = usePasswordReset();
  const [sentAuthNum, setSentAuthNum] = useState(false);
  const authNumRef = useRef('');
  const passwordRef = useRef('');
  const passwordConfirmRef = useRef('');

  const [passwordMatch, setPasswordMatch] = useState(true);
  const [authError, setAuthError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setAuthError(false);
    verify(authNumRef.current.value, email)
      .then(() => {
        setSentAuthNum(true);
      })
      .catch((err) => {
        if (err.message === 'Request failed with status code 404') {
          setAuthError(true);
        }
        return;
      });
  };

  const handlePost = async (e) => {
    e.preventDefault();
    const isPWMatch = passwordRef.current.value === passwordConfirmRef.current.value;

    setPasswordMatch(isPWMatch);
    if (!isPWMatch) {
      return;
    }
    updatePassword(passwordRef.current.value, email).then(() => {
      navigate('/auth/login');
    });
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
          {!passwordMatch && <div>비밀번호가 일치하지 않습니다</div>}
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
        >
          {authError && <div>잘못된 인증번호입니다</div>}
        </InputBox>
      </AuthForm>
    </div>
  );
}
