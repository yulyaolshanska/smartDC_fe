import { useTranslation } from 'react-i18next';
import { ReactComponent as ChatIcon } from '@assets/chatIcon.svg';
import { ChatButtonStyle } from './styles';

const ChatButton = ({ onClick }) => {
  const { t } = useTranslation();
  return (
    <ChatButtonStyle onClick={onClick}>
      <p>{t('Zoom.Chat')}</p>
      <ChatIcon />
    </ChatButtonStyle>
  );
};

export default ChatButton;
