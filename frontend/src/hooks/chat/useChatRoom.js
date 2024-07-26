import { useEffect, useRef, useState } from 'react';
import { chatClient } from '../../utils/chat/chatClient';
import useBoundStore from '../../store';

const USER_ID = crypto.getRandomValues(new Uint32Array(1))[0];

export default function useChatRoom(roomId) {
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
      destination: `/pub/message/${roomId}`,
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
      client.subscribe(`/sub/channel/${roomId}`, (response) => {
        const data = JSON.parse(response.body);
        const { content: message, name } = data;
        setMessages((prev) => [...prev, { id: prev.length, text: message, isMine: USER_ID === data.userId, name }]);
      });
    };
    client.activate();

    return () => {
      client.deactivate();
    };
  }, [client, roomId]);

  return {
    messages,
    inputRef,
    handleSubmit,
  };
}
