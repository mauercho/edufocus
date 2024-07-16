import styles from './ChatInput.module.css';
import { useRef } from 'react';

export default function ChattingInput() {
  // TODO: 채팅이 넘어갈 시 줄바꿈이 되도록 수정
  // TODO: ㅁ 을 아이콘으로 변경
  const message = useRef('');
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: 실제 메시지 전송 기능 추가
    console.log(message.current.value);
    message.current.value = '';
  };
  return (
    <form
      onSubmit={handleSubmit}
      className={styles.chattingInput}
    >
      <input
        ref={message}
        className={styles.input}
        placeholder="메시지를 입력하세요"
      />
      <div onClick={handleSubmit}>ㅁ</div>
    </form>
  );
}
