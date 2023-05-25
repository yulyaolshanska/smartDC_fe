import React from 'react';
import { ChatButtonStyle } from './styles';
import { ReactComponent as ChatIcon } from '@assets/chatIcon.svg';
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();

const ChatButton = () => {
  return (
    <ChatButtonStyle>
      <p>{t('Chat.Chat')}</p>
      <ChatIcon />
    </ChatButtonStyle>
  );
};

export default ChatButton;
