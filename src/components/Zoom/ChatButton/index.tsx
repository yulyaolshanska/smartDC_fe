import React from 'react';
import { ChatButtonStyle } from './styles';
import { ReactComponent as ChatIcon } from '@assets/chatIcon.svg';

const ChatButton = () => {
  return (
    <ChatButtonStyle>
      <p>Chat</p>
      <ChatIcon />
    </ChatButtonStyle>
  );
};

export default ChatButton;
