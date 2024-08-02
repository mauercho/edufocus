import { PasswordChangeForm } from '../../components/PasswordChangeForm';
import { useAuth } from '../../hooks/api/useAuth';

export default function PasswordChangePage() {
  // TODO: 400에러 고치기
  const { updatePassword } = useAuth();
  const handleSubmit = async (currentPw, newPw, newPwCheck) => {
    console.log(currentPw, newPw);
    await updatePassword(currentPw, newPw, newPwCheck);
  };
  return <PasswordChangeForm onSubmit={handleSubmit} />;
}
