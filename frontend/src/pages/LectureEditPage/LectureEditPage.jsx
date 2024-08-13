import { LectureForm } from '../../components/LectureForm';
import { useLectureEdit } from '../../hooks/api/useLectureEdit';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useLectureInfo } from '../../hooks/api/useLectureInfo';

export default function LecutreEditPage() {
  const { lectureId } = useParams();
  const location = useLocation();
  const initialData = location.state.from;
  const lectureInfo = useLectureInfo(lectureId);

  const navigate = useNavigate();
  const { lectureEdit } = useLectureEdit();

  const handleSubmit = async (lectureObject) =>
    await lectureEdit(lectureId, lectureObject)
      .then(() => {
        lectureInfo.refetch();
        navigate('..');
      })
      .catch(() => {});

  return (
    <div>
      <LectureForm
        initialValues={initialData}
        onSubmit={handleSubmit}
        title={'강의 홈'}
        topic={'강의 수정'}
        to={'..'}
      />
    </div>
  );
}
