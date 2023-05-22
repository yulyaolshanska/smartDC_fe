import React from 'react';
import { FinishCallButtonStyle } from './styles';
import { ReactComponent as CameraIcon } from '@assets/Video Camera.svg';

interface FinishCallButtonProps {
  leaveSession: () => void;
}

const FinishCallButton = ({ leaveSession }: FinishCallButtonProps) => {
  return (
    <FinishCallButtonStyle onClick={leaveSession}>
      <p>Finish and call next client</p>
      <CameraIcon />
    </FinishCallButtonStyle>
  );
};

export default FinishCallButton;
