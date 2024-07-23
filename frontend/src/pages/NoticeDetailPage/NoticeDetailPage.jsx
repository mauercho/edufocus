import { ArticleDetail } from '../../components/Article';

export default function NoticeDetailPage() {
  const { data } = {
    data: {
      title: '2주차 공지사항',
      content:
        '이런저런 꿀팁 공부를 열심히 하는 사람을 떨어지지 않는다.' +
        '동해 물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세. 무궁화 삼천리 화려강산 대한 사람 대한으로 길이 보전하세. 줄이 길어지면 다음 줄로 자동 줄바꿈 된다',
    },
  };

  return (
    <ArticleDetail
      topic="공지사항"
      title={data.title}
      content={data.content}
    />
  );
}
