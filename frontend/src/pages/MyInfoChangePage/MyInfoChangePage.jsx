import { InfoEditForm } from '../../components/InfoEditForm';
import { useAuth } from '../../hooks/api/useAuth';
import { useNavigate } from 'react-router-dom';

export default function MyInfoChangePage() {
  const navigate = useNavigate();
  const { updateInfo } = useAuth();

  const handleSubmit = async (e, username, useremail) => {
    e.preventDefault();
    await updateInfo(username, useremail)
      .then(() => navigate('/'))
      .catch((err) => console.log(err));
  };

  return <InfoEditForm onSubmit={handleSubmit} />;
}
