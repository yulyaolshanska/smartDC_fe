import React from 'react';
import { StartCallButtonStyle } from './styles';
import { ReactComponent as CameraIcon } from '@assets/Video Camera.svg';
import { init } from 'i18next';

interface StartCallButtonProps {
  initAndJoinSession?: () => void;
  init?: () => void;
}

const StartCallButton = ({
  initAndJoinSession,
  init,
}: StartCallButtonProps) => {
  return (
    <StartCallButtonStyle onClick={init}>
      <p>Start Call</p>
      <CameraIcon />
    </StartCallButtonStyle>
  );
};

export default StartCallButton;
