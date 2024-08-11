import { PasswordChangeForm } from '../../components/PasswordChangeForm';
import { useAuth } from '../../hooks/api/useAuth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function PasswordChangePage() {
  const navigate = useNavigate();
  const [pwError, setPwError] = useState(false);
  const { updatePassword } = useAuth();
  const handleSubmit = async (currentPw, newPw, newPwCheck) => {
    await updatePassword(currentPw, newPw, newPwCheck)
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        if (err.response.data === 'Current password is incorrect') {
          setPwError(true);
        }
      });
  };
  return (
    <PasswordChangeForm
      onSubmit={handleSubmit}
      pwError={pwError}
    />
  );
}
