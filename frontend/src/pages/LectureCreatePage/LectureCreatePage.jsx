import { LectureForm } from '../../components/LectureForm';
import { useLectureCreate } from '../../hooks/api/useLectureCreate';

export default function LectureCreatePage() {
  const { lectureCreate } = useLectureCreate();

  const handleSubmit = async (lectureObject, imageFile) => {
    const formData = new FormData();
    formData.append('lectureCreateRequest', new Blob([JSON.stringify(lectureObject)], { type: 'application/json' }));

    if (imageFile) {
      formData.append('image', imageFile);
    }

    const response = await lectureCreate(formData);
    console.log(response?.data);
  };

  return (
    <div>
      <h1>강의 생성</h1>
      <LectureForm
        title={'강의 생성'}
        onSubmit={handleSubmit}
        onCreate={true}
      />
    </div>
  );
}
