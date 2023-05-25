import React, { useEffect, useRef } from 'react';
import moment from 'moment';
import { Message } from '@components/Chat';
import { timeFormat } from '@constants/format';
import {
  AnotherUserContainer,
  AnotherUserMessageContainer,
  MessageInfo,
  MessageText,
  UserContainer,
  UserMessageContainer,
} from 'components/Chat/styles';

function Messages({
  messages,
  currentUser,
}: {
  messages: Message[];
  currentUser: number;
}) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {messages.map((message, index) => {
        const isCurrentUser = message.user.id === currentUser;

        const Container = isCurrentUser ? UserContainer : AnotherUserContainer;

        const MessageContainerComponent = isCurrentUser
          ? UserMessageContainer
          : AnotherUserMessageContainer;

        return (
          <Container key={index}>
            <MessageContainerComponent>
              <MessageText>{message.text}</MessageText>
              <MessageInfo>
                {`${moment(message.createdAt).format(timeFormat)} ${
                  message.user.lastName
                }`}
              </MessageInfo>
            </MessageContainerComponent>
          </Container>
        );
      })}
      <div ref={messagesEndRef} />
    </>
  );
}

export default Messages;
