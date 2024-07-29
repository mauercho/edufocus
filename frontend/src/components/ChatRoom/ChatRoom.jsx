import styles from './ChatRoom.module.css';
import { useParams } from 'react-router-dom';
import SendIcon from '/src/assets/icons/send.svg?react';
import useChatRoom from '../../hooks/chat/useChatRoom';

export default function ChatRoom() {
  const { roomId } = useParams();
  const { messages, handleSubmit, inputRef, chatListRef } = useChatRoom(roomId);

  return (
    <section className={styles.room}>
      <h2 className={styles.title}>채팅</h2>
      <ol
        className={styles.messageList}
        ref={chatListRef}
      >
        {messages.map?.((message) => (
          <li
            key={message.id}
            className={message.isMine ? styles.my : styles.your}
          >
            <span className={styles.name}>{message.name}</span>
            <span className={styles.bubble}>{message.text}</span>
          </li>
        ))}
      </ol>
      <form
        action="POST"
        onSubmit={handleSubmit}
        className={styles.form}
      >
        <input
          type="text"
          ref={inputRef}
        />
        <button type="submit">
          <SendIcon />
        </button>
      </form>
    </section>
  );
}
