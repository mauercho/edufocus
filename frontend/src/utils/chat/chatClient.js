import { Client } from '@stomp/stompjs';

export const chatClient = new Client({
  brokerURL: import.meta.env.VITE_CHAT_URL,
  // TODO: debug 제거
  debug: (str) => console.log(str),
  reconnectDelay: 5000,
});
