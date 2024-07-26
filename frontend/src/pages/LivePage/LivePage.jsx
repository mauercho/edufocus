import useBoundStore from '../../store';
import ChatRoom from '../../components/ChatRoom/ChatRoom';

export default function LivePage() {
  const liveTabStatus = useBoundStore((state) => state.liveTabStatus);
  // const setLiveTabStatus = useBoundStore((state) => state.setLiveTabStatus);

  return (
    <>
      <main></main>
      <aside>{liveTabStatus === 'chat' ? <ChatRoom /> : <div>Quiz</div>}</aside>
    </>
  );
}
