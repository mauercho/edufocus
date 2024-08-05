import { InfoEditForm } from '../../components/InfoEditForm';
import { useAuth } from '../../hooks/api/useAuth';

export default function MyInfoChangePage() {
  const { updateInfo } = useAuth();

  const handleSubmit = async (e, username, useremail) => {
    e.preventDefault();
    await updateInfo(username, useremail)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return <InfoEditForm onSubmit={handleSubmit} />;
}
