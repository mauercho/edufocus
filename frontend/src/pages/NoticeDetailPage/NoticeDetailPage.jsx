import LectureHeader from '../../components/LectureHeader/LectureHeader';
import { SideBar, SideLink, SideItem } from '../../components/SideBar';
import { MaxWidthLayout } from '../../components/Layout';
import { ArticleDetail } from '../../components/Article';

export default function NoticeDetailPage() {
  const lecture = {
    title: '정보처리기사 실기 완전정복',
    tutor: '박정민',
    isLive: true,
  };
  const title = '2주차 공지사항';
  const content =
    '이런저런 꿀팁 공부를 열심히 하는 사람을 떨어지지 않는다.' +
    '동해 물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세. 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세. 줄이 길어지면 다음 줄로 자동 줄바꿈 된다';
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
            topic="공지사항"
            title={title}
            content={content}
          />
        </main>
      </MaxWidthLayout>
    </>
  );
}
