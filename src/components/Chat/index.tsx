import React, { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { useTranslation } from 'react-i18next';
import MessageInput from '@components/Chat/MessageInput';
import Messages from '@components/Chat/Messages';
import { useAppSelector } from '@redux/hooks';
import {
  ChatContainer,
  MessagesContainer,
  Typing,
} from 'components/Chat/styles';
import { IAuth } from '@components/general/type';
import { createMessage, message, typing } from '@constants/socket';

export interface Message {
  text: string;
  user: IAuth;
  createdAt: Date;
  file: string[];
  fileName: string[];
}

function Chat() {
  const { t } = useTranslation();
  const doctorData = useAppSelector((state) => state.doctorReducer);
  const doctorId = doctorData.id;
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [typingDisplay, setTypingDisplay] = useState<string>('');

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_REACT_APP_BASE_URL_SERVER);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [setSocket]);

  useEffect(() => {
    if (socket) {
      socket?.on(message, (message) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: message.text,
            user: message.user,
            file: message.file,
            fileName: message.fileName,
            createdAt: message.createdAt,
          },
        ]);
      });

      socket?.on(typing, ({ user, isTyping }) => {
        if (isTyping) {
          setTypingDisplay(`${user.lastName} ${t('Chat.isTyping')}...`);
        } else {
          setTypingDisplay('');
        }
      });

      return () => {
        socket.off(message);
      };
    }
  }, [socket]);

  const sendMessage = (message: Message) => {
    if (socket) {
      socket.emit(createMessage, message);
    }
  };

  let timeout;
  const emitTyping = () => {
    if (socket) {
      socket.emit(typing, {
        isTyping: true,
        user: doctorId,
      });
      timeout = setTimeout(() => {
        socket.emit(typing, { isTyping: false });
      }, 2000);
    }
  };

  return (
    <ChatContainer>
      <MessagesContainer>
        <Messages messages={messages} currentUser={doctorData.id} />
      </MessagesContainer>
      {typingDisplay && <Typing>{typingDisplay}</Typing>}
      <MessageInput
        sendMessage={sendMessage}
        typing={emitTyping}
        doctor={doctorData}
      />
    </ChatContainer>
  );
}
export default Chat;
