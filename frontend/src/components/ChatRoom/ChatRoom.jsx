import { useEffect, useRef, useState } from 'react';
import styles from './ChatRoom.module.css';
import { chatClient } from '../../utils/chat/chatClient';
import { useParams } from 'react-router-dom';
import SendIcon from '/src/assets/icons/send.svg?react';
import useBoundStore from '../../store';

const USER_ID = crypto.getRandomValues(new Uint32Array(1))[0];

// TODO: 채팅 훅 분리
export default function ChatRoom() {
  const { lectureId } = useParams();
  const client = chatClient;
  const [messages, setMessages] = useState([]);
  const userName = useBoundStore((state) => state.userName) ?? '익명';
  const inputRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const text = inputRef.current.value;

    if (!text) {
      return;
    }

    chatClient.publish({
      destination: `/pub/message/${lectureId}`,
      body: JSON.stringify({
        userId: USER_ID,
        name: userName,
        content: text,
      }),
    });
    inputRef.current.value = '';
  };

  useEffect(() => {
    client.onConnect = () => {
      client.subscribe(`/sub/channel/${lectureId}`, (response) => {
        const data = JSON.parse(response.body);
        const { content: message, name } = data;
        setMessages((prev) => [...prev, { id: prev.length, text: message, isMine: USER_ID === data.userId, name }]);
      });
    };
    client.activate();

    return () => {
      client.deactivate();
    };
  }, [client, lectureId]);

  return (
    <section className={styles.room}>
      <h2 className={styles.title}>채팅</h2>
      <ol className={styles.messageList}>
        {messages.map((message) => (
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
