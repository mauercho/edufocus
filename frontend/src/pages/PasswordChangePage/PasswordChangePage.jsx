import { PasswordChangeForm } from '../../components/PasswordChangeForm';
import { useAuth } from '../../hooks/api/useAuth';
import { useNavigate } from 'react-router-dom';

export default function PasswordChangePage() {
  const navigate = useNavigate();
  const { updatePassword } = useAuth();
  const handleSubmit = async (currentPw, newPw, newPwCheck) => {
    await updatePassword(currentPw, newPw, newPwCheck).then(() => navigate('/'));
  };
  return <PasswordChangeForm onSubmit={handleSubmit} />;
}
