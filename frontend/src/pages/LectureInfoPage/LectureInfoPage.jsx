import styles from './LectureInfoPage.module.css';
import ClassInfo from '../../components/ClassInfo/ClassInfo';
import { MaxWidthLayout } from '../../components/Layout';
import LectureHeader from '../../components/LectureHeader/LectureHeader';

export default function LectureInfoPage() {
  const { data: lectureData } = {
    data: {
      title: '정보처리기사 실기 완전정복',
      img: '',
      tutor: '이재용',
      tutorImg: '',
      term: '2021.07.01 ~ 2021.12.31',
      time: '매주 화, 목 19:00 ~ 21:00',
      description: [
        {
          title: '수업소개',
          content: '이 코스는 정보처리기사 실기에 대한 완전정복을 목표로 합니다.',
        },
        {
          title: '커리큘럼',
          content:
            '1. 데이터베이스\n2. 소프트웨어 공학\n3. 운영체제\n4. 네트워크\n5. 데이터통신\n6. 전자계산기\n7. 알고리즘\n8. 프로그래밍 언어\n9. 시스템 소프트웨어\n10. 정보시스템 개발 관리',
        },
        {
          title: '이런 사람이 들으면 좋아요',
          content: '정보처리기사 실기에 관심이 많은 사람',
        },
      ],
    },
  };

  return (
    <>
      <LectureHeader
        title={lectureData.title}
        img={lectureData.img}
        tutor={lectureData.tutor}
        tutorImg={lectureData.tutorImg}
      />
      <MaxWidthLayout hasSideBar>
        <main>
          {lectureData.description.map((section) => (
            <div
              key={section.title}
              className={styles.group}
            >
              <h2>{section.title}</h2>
              <p>{section.content}</p>
            </div>
          ))}
        </main>
        <aside>
          <ClassInfo
            classTerm={lectureData.term}
            classTime={lectureData.time}
          />
        </aside>
      </MaxWidthLayout>
    </>
  );
}
