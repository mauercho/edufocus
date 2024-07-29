import styles from './LectureInfoPage.module.css';
import ClassInfo from '../../components/ClassInfo/ClassInfo';
import { MaxWidthLayout } from '../../components/Layout';
import LectureHeader from '../../components/LectureHeader/LectureHeader';
import { useLectureInfo } from '../../hooks/api/useLectureInfo';
import { useParams, useNavigate } from 'react-router-dom';
import { useLectureRegister } from '../../hooks/api/useLectureRegister';

export default function LectureInfoPage() {
  const navigate = useNavigate();
  const { lectureId } = useParams();
  const { data } = useLectureInfo(lectureId);
  const lectureData = data?.data;
  const startDate = new Date(lectureData.startDate).toLocaleDateString();
  const endDate = new Date(lectureData.endDate).toLocaleDateString();

  const { lectureRegister } = useLectureRegister();
  const handleSubmit = () => {
    lectureRegister(lectureId)
      .then(() => {
        navigate(`/lecture/${lectureId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <LectureHeader
        title={lectureData.title}
        img={lectureData.image}
        tutor={lectureData.teachername}
        tutorImg={lectureData.tutorImg}
      />
      <MaxWidthLayout hasSideBar>
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
          />
        </aside>
      </MaxWidthLayout>
    </>
  );
}
