import React from 'react';
import { StartCallButtonStyle } from './styles';
import { ReactComponent as CameraIcon } from '@assets/Video Camera.svg';
import { init } from 'i18next';

const StartCallButton = ({ initAndJoinSession, init }) => {
  return (
    <StartCallButtonStyle onClick={init}>
      <p>Start Call</p>
      <CameraIcon />
    </StartCallButtonStyle>
  );
};

export default StartCallButton;
