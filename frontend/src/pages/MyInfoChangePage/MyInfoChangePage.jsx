import { InfoEditForm } from '../../components/InfoEditForm';
import { useAuth } from '../../hooks/api/useAuth';
import { useUserInfo } from '../../hooks/api/useUserInfo';
import { useNavigate } from 'react-router-dom';

export default function MyInfoChangePage() {
  const navigate = useNavigate();
  const { data } = useUserInfo();
  const myInfo = data.data?.userInfo;
  const { updateInfo } = useAuth();

  const handleSubmit = async (e, username, useremail) => {
    e.preventDefault();
    await updateInfo(username, useremail)
      .then(() => navigate('/'))
      .catch((err) => console.log(err));
  };

  return (
    <InfoEditForm
      name={myInfo.name}
      email={myInfo.email}
      onSubmit={handleSubmit}
    />
  );
}
