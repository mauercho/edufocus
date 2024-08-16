import { Client } from '@stomp/stompjs';
import useBoundStore from '../../store';

export const chatClient = new Client({
  brokerURL: import.meta.env.VITE_CHAT_URL,
  debug: import.meta.env.DEV ? (str) => console.log(str) : () => {},
  reconnectDelay: 3000,
  connectHeaders: {
    Authorization: useBoundStore.getState().token,
  },
});
