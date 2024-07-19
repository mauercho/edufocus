import LectureHeader from '../../components/LectureHeader/LectureHeader';
import { SideBar, SideLink, SideItem } from '../../components/SideBar';
import { ArticleLink } from '../../components/ArticleLink';
import { MaxWidthLayout } from '../../components/Layout';
import ArticleBoard from '../../components/ArticleBoard/ArticleBoard';

export default function QuestionListPage() {
  const notices = [
    {},
    { title: 'Question1', sub: '7-12 오전 11:40:57' },
    { title: 'Question2', sub: '7-12 오전 11:40:57' },
    { title: '헷갈리는게 있어요', sub: '7-15 오전 11:40:57' },
    { title: '궁금궁금', sub: '7-15 오전 11:40:57' },
    { sub: '날짜만 있는 경우' },
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
          <SideBar title="내 학습">
            <SideItem
              name="진도율"
              sub="2 / 12"
            />
            <SideItem
              name="퀴즈 정답률"
              sub="80%"
            />
          </SideBar>
        </aside>
        <main>
          <ArticleBoard
            title="Q&A"
            canCreate={true}
            createPath="/"
          >
            {notices.map((notice) => {
              if (notice.sub && notice.title) {
                return (
                  <ArticleLink
                    key={`${notice.title}${notice.sub}`}
                    title={notice.title}
                    sub={notice.sub}
                  />
                );
              }
            })}
          </ArticleBoard>
        </main>
      </MaxWidthLayout>
    </>
  );
}
