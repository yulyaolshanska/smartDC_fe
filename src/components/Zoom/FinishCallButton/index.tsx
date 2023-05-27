import React from 'react';
import { FinishCallButtonStyle } from './styles';
import { ReactComponent as CameraIcon } from '@assets/Video Camera.svg';
import { useTranslation } from 'react-i18next';

interface FinishCallButtonProps {
  leaveSession: () => void;
}

const FinishCallButton = ({ leaveSession }: FinishCallButtonProps) => {
  const { t } = useTranslation();
  return (
    <FinishCallButtonStyle onClick={leaveSession}>
      <p>{t('Zoom.Finish')}</p>
      <CameraIcon />
    </FinishCallButtonStyle>
  );
};

export default FinishCallButton;
