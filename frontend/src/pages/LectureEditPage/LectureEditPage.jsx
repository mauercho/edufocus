import { LectureForm } from '../../components/LectureForm';
import { useLectureEdit } from '../../hooks/api/useLectureEdit';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

export default function LecutreEditPage() {
  const { lectureId } = useParams();
  const location = useLocation();
  const initialData = location.state.from;

  const navigate = useNavigate();
  const { lectureEdit } = useLectureEdit();

  const handleSubmit = async (lectureObject) => {
    const response = await lectureEdit(lectureId, lectureObject)
      .then((res) => {
        console.log(res);
        navigate('..');
      })
      .catch((err) => console.log(err));
    console.log(response?.data);
  };

  return (
    <LectureForm
      initialValues={initialData}
      onSubmit={handleSubmit}
      title={'강의 홈'}
      topic={'강의 수정'}
      to={'..'}
    />
  );
}
