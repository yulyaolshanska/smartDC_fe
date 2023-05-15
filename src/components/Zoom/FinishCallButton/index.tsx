import React from 'react';
import { FinishCallButtonStyle } from './styles';
import { ReactComponent as CameraIcon } from '@assets/Video Camera.svg';

const FinishCallButton = ({ leaveSession }) => {
  return (
    <FinishCallButtonStyle onClick={leaveSession}>
      <p>Finish and call next client</p>
      <CameraIcon />
    </FinishCallButtonStyle>
  );
};

export default FinishCallButton;
