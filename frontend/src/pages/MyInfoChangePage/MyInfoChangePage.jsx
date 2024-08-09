import { InfoEditForm } from '../../components/InfoEditForm';
import { useAuth } from '../../hooks/api/useAuth';
import { useUserInfo } from '../../hooks/api/useUserInfo';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function MyInfoChangePage() {
  const navigate = useNavigate();
  const { data } = useUserInfo();
  const myInfo = data.data?.userInfo;
  const { updateInfo } = useAuth();
  const [usingEmail, setUsingEmail] = useState(false);

  const handleSubmit = async (e, username, useremail) => {
    e.preventDefault();
    await updateInfo(username, useremail)
      .then(() => navigate('/'))
      .catch((err) => {
        console.log(err);
        console.log(err.response.data);
        if (err.response.data === '이미 사용 중인 이메일입니다.') {
          setUsingEmail(true);
        }
      });
  };

  return (
    <InfoEditForm
      name={myInfo.name}
      email={myInfo.email}
      onSubmit={handleSubmit}
      usingEmail={usingEmail}
    />
  );
}
