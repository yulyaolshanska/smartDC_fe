import React from 'react';
import { StartCallButtonStyle } from './styles';
import { ReactComponent as CameraIcon } from '@assets/Video Camera.svg';
import { useTranslation } from 'react-i18next';

interface StartCallButtonProps {
  initAndJoinSession?: () => void;
  init?: () => void;
}

const { t } = useTranslation();

const StartCallButton = ({
  initAndJoinSession,
  init,
}: StartCallButtonProps) => {
  return (
    <StartCallButtonStyle onClick={init}>
      <p>{t('Chat.StartCall')}</p>
      <CameraIcon />
    </StartCallButtonStyle>
  );
};

export default StartCallButton;
