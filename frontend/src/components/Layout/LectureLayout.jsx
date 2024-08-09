import styles from './LectureLayout.module.css';
import { Outlet, useParams } from 'react-router-dom';
import LectureHeader from '../LectureHeader/LectureHeader';
import { SideBar, SideLink } from '../SideBar';
import MaxWidthLayout from './MaxWidthLayout';
import { Suspense, useEffect } from 'react';
import useBoundStore from '../../store';
import { useLectureInfo } from '../../hooks/api/useLectureInfo';
import LoadingIndicator from '../LoadingIndicator.jsx/LoadingIndicator';
import { useLectureDelete } from '../../hooks/api/useLectureDelete';
import { useNavigate } from 'react-router-dom';

export default function LectureLayout() {
  const { lectureId } = useParams();
  const navigate = useNavigate();

  const { lectureDelete } = useLectureDelete();
  const { data } = useLectureInfo(lectureId);
  const lecture = data?.data;
  const userType = useBoundStore((state) => state.userType);
  const handleDelete = () => {
    confirm('강의를 삭제할까요??') &&
      lectureDelete(lectureId).then(() => {
        navigate('..');
      });
  };
  const lectureData = {
    title: lecture.title,
    description: lecture.description,
    plan: lecture.plan,
    startDate: lecture.startDate,
    endDate: lecture.endDate,
    time: lecture.time,
  };

  useEffect(() => {
    if (['NOT_ENROLLED', 'MANAGED_BY_OTHERS', 'PENDING'].includes(lecture.status)) {
      navigate('..');
    }
  }, [lecture.status, navigate]);

  return (
    <>
      <LectureHeader
        title={lecture.title}
        tutor={lecture.teacherName}
        img={lecture.image}
        isLive={lecture.online}
      />
      <MaxWidthLayout hasSideBar>
        <aside>
          <SideBar title="바로가기">
            <SideLink
              to={''}
              end
            >
              수업 홈
            </SideLink>
            <SideLink to={'notice'}>공지사항</SideLink>
            <SideLink to={'qna'}>Q&A</SideLink>
            <SideLink to={'freeboard'}>자유게시판</SideLink>
            {userType === 'student' && <SideLink to={'report'}>퀴즈 성적</SideLink>}
            {userType === 'teacher' && <SideLink to={'quiz'}>퀴즈 만들기</SideLink>}
            {userType === 'teacher' && <SideLink to={'enroll'}>수강생 관리</SideLink>}
          </SideBar>
          {userType === 'teacher' && (
            <SideBar title={'강의 정보 관리'}>
              <SideLink to={'teacherReportsets'}>퀴즈 성적 보기</SideLink>
              <SideLink
                to={'edit'}
                state={lectureData}
              >
                강의 정보 수정
              </SideLink>
              <li>
                <span
                  onClick={handleDelete}
                  className={styles.delete}
                >
                  강의 삭제
                </span>
              </li>
            </SideBar>
          )}
        </aside>
        <main>
          <Suspense fallback={<LoadingIndicator fill />}>
            <Outlet />
          </Suspense>
        </main>
      </MaxWidthLayout>
    </>
  );
}
