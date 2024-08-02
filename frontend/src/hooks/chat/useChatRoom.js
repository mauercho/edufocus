import { useEffect, useRef, useState } from 'react';
import { chatClient } from '../../utils/chat/chatClient';
import useBoundStore from '../../store';

const USER_ID = crypto.getRandomValues(new Uint32Array(1))[0];

export default function useChatRoom(roomId) {
  const client = chatClient;
  const [messages, setMessages] = useState([]);
  const userName = useBoundStore((state) => state.userName) ?? '익명';
  const inputRef = useRef(null);
  const chatListRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = inputRef.current.value;

    if (!text) {
      return;
    }

    chatClient.publish({
      destination: `/pub/chat.message.${roomId}`,
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
      client.subscribe(`/exchange/chat.exchange/*.room.${roomId}`, (response) => {
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

  useEffect(() => {
    if (chatListRef.current.scrollHeight - chatListRef.current.scrollTop - chatListRef.current.clientHeight < 200) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [messages]);

  return {
    messages,
    inputRef,
    handleSubmit,
    chatListRef,
  };
}
