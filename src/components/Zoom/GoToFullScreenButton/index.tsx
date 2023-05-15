import React from 'react';
import { GoToFullScreenButtonStyle } from './styles';
import { ReactComponent as FullScreenIcon } from '@assets/fullScreenCall.svg';

const GoToFullScreenButton = ({
  isSelfFullScreen,
  isParticipantFullScreen,
  changeShape,
}) => {
  return (
    <GoToFullScreenButtonStyle
      onClick={changeShape}
      isSelfFullScreen={isSelfFullScreen}
      isParticipantFullScreen={isParticipantFullScreen}
    >
      <FullScreenIcon />
    </GoToFullScreenButtonStyle>
  );
};

export default GoToFullScreenButton;
