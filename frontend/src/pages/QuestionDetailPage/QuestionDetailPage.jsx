import LectureHeader from '../../components/LectureHeader/LectureHeader';
import { SideBar, SideLink, SideItem } from '../../components/SideBar';
import { MaxWidthLayout } from '../../components/Layout';
import { ArticleDetail } from '../../components/Article';

export default function QuestionDetailPage() {
  const lecture = {
    title: '정보처리기사 실기 완전정복',
    tutor: '박정민',
    isLive: true,
  };
  const title = '헷갈리는게 있어요';
  const author = '이재용';
  const content = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis sed dolorem vitae?';
  const answer = { answerId: '144632619Ux15326', content: '우리 재용이는 참 예의가 없구나' };
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
            <SideLink to={'/'}>공지사항</SideLink>
            <SideLink to={'/'}>Q&A</SideLink>
            <SideLink to={'/'}>수업자료</SideLink>
            <SideLink to={'/'}>퀴즈</SideLink>
          </SideBar>

          <SideBar title="내 학습">
            <SideItem
              name={'학습 진도'}
              sub={'2 / 12'}
            />
            <SideItem
              name={'퀴즈 점수'}
              sub={'80%'}
            />
          </SideBar>
        </aside>
        <main>
          <ArticleDetail
            topic="Q&A"
            title={title}
            author={author}
            content={content}
            answer={answer.content}
          />
        </main>
      </MaxWidthLayout>
    </>
  );
}
