import { useEffect, useRef, useState } from 'react';
import { chatClient } from '../../utils/chat/chatClient';
import useBoundStore from '../../store';
import { useQuizsets } from '../api/useQuizsets';

export default function useChatRoom(roomId) {
  const client = chatClient;
  const [messages, setMessages] = useState([]);
  const userName = useBoundStore((state) => state.userName) ?? '익명';
  const inputRef = useRef(null);
  const chatListRef = useRef(null);
  const { data: quizSetData } = useQuizsets();
  const quizSets = quizSetData?.data ?? [];
  const [quizSetInfo, setQuizSetInfo] = useState(null);

  const startQuiz = (quizSetId) => {
    chatClient.publish({
      destination: `/pub/chat.quiz.${roomId}`,
      body: JSON.stringify({
        quizSetId,
      }),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = inputRef.current.value;

    if (!text) {
      return;
    }

    chatClient.publish({
      destination: `/pub/chat.message.${roomId}`,
      body: JSON.stringify({
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
        const { content: message, name, quizSetId, reportSetId } = data;

        if (quizSetId !== undefined) {
          setQuizSetInfo([quizSetId, reportSetId]);
          return;
        }
        setMessages((prev) => [...prev, { id: prev.length, text: message, name }]);
      });
    };
    client.activate();

    return () => {
      client.deactivate();
    };
  }, [client, roomId]);

  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [messages]);

  return {
    messages,
    inputRef,
    handleSubmit,
    chatListRef,
    startQuiz,
    quizSets,
    quizSetInfo,
    setQuizSetInfo,
  };
}
