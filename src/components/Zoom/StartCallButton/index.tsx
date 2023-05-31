import { StartCallButtonStyle } from './styles';
import { ReactComponent as CameraIcon } from '@assets/Video Camera.svg';
import { useTranslation } from 'react-i18next';

interface StartCallButtonProps {
  initAndJoinSession?: () => void;
  init?: () => void;
}

const StartCallButton = ({
  initAndJoinSession,
  init,
}: StartCallButtonProps) => {
  const { t } = useTranslation();
  return (
    <StartCallButtonStyle onClick={init}>
      <p>{t('Zoom.startCall')}</p>
      <CameraIcon />
    </StartCallButtonStyle>
  );
};

export default StartCallButton;
