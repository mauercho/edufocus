import styles from './ChatRoom.module.css';
import SendIcon from '/src/assets/icons/send.svg?react';
import { cloneElement, useEffect, useRef } from 'react';
import { ChatEntry, useChat, useMaybeLayoutContext } from '@livekit/components-react';

export default function ChatRoom({ ...props }) {
  const chatInputRef = useRef(null);
  const ulRef = useRef(null);

  const { send, chatMessages, isSending } = useChat();

  const layoutContext = useMaybeLayoutContext();
  const lastReadMsgAt = useRef(0);

  async function handleChatSubmit(event) {
    event.preventDefault();
    if (chatInputRef.current && chatInputRef.current.value.trim() !== '') {
      if (send) {
        await send(chatInputRef.current.value);
        chatInputRef.current.value = '';
        chatInputRef.current.focus();
      }
    }
  }

  useEffect(() => {
    if (ulRef) {
      ulRef.current?.scrollTo({ top: ulRef.current.scrollHeight });
    }
  }, [ulRef, chatMessages]);

  useEffect(() => {
    if (!layoutContext || chatMessages.length === 0) {
      return;
    }

    if (
      layoutContext.widget.state?.showChat &&
      chatMessages.length > 0 &&
      lastReadMsgAt.current !== chatMessages[chatMessages.length - 1]?.timestamp
    ) {
      lastReadMsgAt.current = chatMessages[chatMessages.length - 1]?.timestamp;
      return;
    }

    const unreadMessageCount = chatMessages.filter(
      (msg) => !lastReadMsgAt.current || msg.timestamp > lastReadMsgAt.current
    ).length;

    const { widget } = layoutContext;
    if (unreadMessageCount > 0 && widget.state?.unreadMessages !== unreadMessageCount) {
      widget.dispatch?.({ msg: 'unread_msg', count: unreadMessageCount });
    }
  }, [chatMessages, layoutContext, layoutContext.widget]);

  return (
    <div
      {...props}
      className="lk-chat"
    >
      <h2 className={styles.title}>채팅</h2>

      <ul
        className="lk-list lk-chat-messages"
        ref={ulRef}
      >
        {props.children
          ? chatMessages.map((msg, idx) =>
              cloneElement(props.children, {
                entry: msg,
                key: msg.id ?? idx,
              })
            )
          : chatMessages.map((msg, idx, allMsg) => {
              const hideName = idx >= 1 && allMsg[idx - 1].from === msg.from;
              const hideTimestamp = idx >= 1 && msg.timestamp - allMsg[idx - 1].timestamp < 60_000;

              return (
                <ChatEntry
                  key={msg.id ?? idx}
                  hideName={hideName}
                  hideTimestamp={hideName === false ? false : hideTimestamp}
                  entry={msg}
                />
              );
            })}
      </ul>
      <form
        className="lk-chat-form"
        onSubmit={handleChatSubmit}
      >
        <input
          className="lk-form-control lk-chat-form-input"
          disabled={isSending}
          ref={chatInputRef}
          type="text"
          placeholder="메시지"
          onInput={(ev) => ev.stopPropagation()}
          onKeyDown={(ev) => ev.stopPropagation()}
          onKeyUp={(ev) => ev.stopPropagation()}
        />
        <button
          type="submit"
          className={`lk-button lk-chat-form-button ${styles.button}`}
          disabled={isSending}
        >
          <SendIcon />
        </button>
      </form>
    </div>
  );
}
