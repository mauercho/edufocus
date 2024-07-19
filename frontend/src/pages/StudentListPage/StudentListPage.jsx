import LectureHeader from '../../components/LectureHeader/LectureHeader';
import { SideBar, SideLink, SideItem } from '../../components/SideBar';
import { ArticleLink } from '../../components/ArticleLink';
import { MaxWidthLayout } from '../../components/Layout';
import ArticleBoard from '../../components/ArticleBoard/ArticleBoard';

export default function QuestionListPage() {
  const students = [
    { name: '학생1', quizScore: 40 },
    { name: '학생2', quizScore: 40 },
    { name: '학생3', quizScore: 40 },
    { name: '학생4', quizScore: 40 },
    { name: '이재용', quizScore: 80 },
  ];

  const lecture = {
    title: '정보처리기사 실기 완전정복',
    tutor: '박정민',
    isLive: true,
  };
  return (
    <>
      <LectureHeader
        title={lecture.title}
        tutor={lecture.tutor}
        isLive={lecture.isLive}
      />
      <MaxWidthLayout hasSideBar>
        <aside>
          <SideBar title="바로가기">
            <SideLink path={'/'}>공지사항</SideLink>
            <SideLink path={'/'}>Q&A</SideLink>
            <SideLink path={'/'}>수업자료</SideLink>
            <SideLink path={'/'}>퀴즈</SideLink>
          </SideBar>
          <SideBar title="수업 정보">
            <SideItem
              name="수강생"
              sub="총 12명"
            />
          </SideBar>
        </aside>
        <main>
          <ArticleBoard title="Q&A">
            {students.map((student) => {
              return (
                <ArticleLink
                  key={`${student.name}${student.sub}`}
                  title={student.name}
                  sub={`퀴즈 점수: ${student.quizScore}`}
                />
              );
            })}
          </ArticleBoard>
        </main>
      </MaxWidthLayout>
    </>
  );
}
