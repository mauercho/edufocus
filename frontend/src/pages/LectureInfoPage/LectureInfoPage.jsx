import styles from './LectureInfoPage.module.css';
import ClassInfo from '../../components/ClassInfo/ClassInfo';
import { MaxWidthLayout } from '../../components/Layout';
import LectureHeader from '../../components/LectureHeader/LectureHeader';
import { useLectureInfo } from '../../hooks/api/useLectureInfo';
import { useParams, useNavigate } from 'react-router-dom';
import { useLectureRegister } from '../../hooks/api/useLectureRegister';
import useBoundStore from '../../store';

export default function LectureInfoPage() {
  const navigate = useNavigate();
  const { lectureId } = useParams();
  const { data } = useLectureInfo(lectureId);
  const lectureData = data?.data;
  const startDate = new Date(lectureData.startDate).toLocaleDateString();
  const endDate = new Date(lectureData.endDate).toLocaleDateString();
  const userType = useBoundStore((state) => state.userType);
  const status = lectureData.status;
  const { lectureRegister } = useLectureRegister();
  const handleSubmit = () => {
    if (userType === null) {
      window.alert('로그인이 필요한 서비스입니다.');
      navigate('/auth/login');
    }

    if (status === 'ENROLLED') {
      navigate(`/lecture/${lectureId}/class`);
    }

    if (status === 'NOT_ENROLLED') {
      lectureRegister(lectureId)
        .then(() => {
          window.alert('강사가 수강신청 수락시 수업이 시작됩니다.');
          navigate('/');
        })
        .catch(() => {});
    }
  };

  return (
    <>
      <LectureHeader
        title={lectureData.title}
        img={lectureData.image}
        tutor={lectureData.teacherName}
        tutorImg={lectureData.tutorImg}
      />
      <div className={styles.wrapper}>
        <main>
          <div className={styles.group}>
            <h2>수업소개</h2>
            <p>{lectureData.description}</p>
          </div>
          <div className={styles.group}>
            <h2>커리큘럼</h2>
            <p>{lectureData.plan}</p>
          </div>
        </main>
        <aside>
          <ClassInfo
            classTerm={`${startDate} ~ ${endDate}`}
            classTime={lectureData.time}
            onSubmit={handleSubmit}
            status={status}
          />
        </aside>
      </div>
    </>
  );
}
