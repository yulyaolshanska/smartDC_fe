import React from 'react';
import { FinishCallButtonStyle } from './styles';
import { ReactComponent as CameraIcon } from '@assets/Video Camera.svg';
import { useTranslation } from 'react-i18next';

interface FinishCallButtonProps {
  leaveSession: () => void;
}

const { t } = useTranslation();

const FinishCallButton = ({ leaveSession }: FinishCallButtonProps) => {
  return (
    <FinishCallButtonStyle onClick={leaveSession}>
      <p>{t('Chat.Finish')}</p>
      <CameraIcon />
    </FinishCallButtonStyle>
  );
};

export default FinishCallButton;
