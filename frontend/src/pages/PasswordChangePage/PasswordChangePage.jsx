import { PasswordChangeForm } from '../../components/PasswordChangeForm';
import { useAuth } from '../../hooks/api/useAuth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function PasswordChangePage() {
  const navigate = useNavigate();
  const [error, setError] = useState('none');
  const { updatePassword } = useAuth();
  const handleSubmit = async (currentPw, newPw, newPwCheck) => {
    setError('none');
    await updatePassword(currentPw, newPw, newPwCheck)
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        if (err.response.data === 'Current password is incorrect') {
          setError('currentPwError');
        }
        if (err.response.data === 'New password cannot be the same as the current password') {
          setError('samePwError');
        }
      });
  };
  return (
    <PasswordChangeForm
      onSubmit={handleSubmit}
      onError={error}
    />
  );
}
