import React from 'react';
import { ChatButtonStyle } from './styles';
import { ReactComponent as ChatIcon } from '@assets/chatIcon.svg';
import { useTranslation } from 'react-i18next';

const ChatButton = () => {
  const { t } = useTranslation();
  return (
    <ChatButtonStyle>
      <p>{t('Zoom.Chat')}</p>
      <ChatIcon />
    </ChatButtonStyle>
  );
};

export default ChatButton;
