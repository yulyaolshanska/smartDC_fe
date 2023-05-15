import { Stack } from '@mui/material';
import React from 'react';
import ZoomVideo from '@zoom/videosdk';
import { ReactComponent as ChatInCallIcon } from '@assets/chatInCall.svg';
import { ReactComponent as EndCallIcon } from '@assets/endCall.svg';
import { ReactComponent as MicrophoneIcon } from '@assets/microphone.svg';
import { ReactComponent as CameraIcon } from '@assets/cameraCall.svg';
import { ReactComponent as FullScreenIcon } from '@assets/fullScreenCall.svg';

import {
  CallPanelWrapper,
  EndCallButtonStyle,
  PanelButtonStyle,
} from './style';
const CallPanel = ({
  client,
  isSelfFullScreen,
  isParticipantFullScreen,
  setIsParticipantFullScreen,
  setIsSelfFullScreen,
  setStatus,
  startVideoButton,
}) => {
  const leaveSession = async () => {
    try {
      startVideoButton();
      await client.leave().then(() => {
        setIsParticipantFullScreen(false);
        setIsSelfFullScreen(false);
        setStatus(false);
      });
    } catch (error) {
      console.log('Unpossible to leave the session', error);
    }
  };
  return (
    <CallPanelWrapper
      isSelfFullScreen={isSelfFullScreen}
      isParticipantFullScreen={isParticipantFullScreen}
    >
      <PanelButtonStyle>
        <CameraIcon />
      </PanelButtonStyle>
      <PanelButtonStyle>
        <ChatInCallIcon />
      </PanelButtonStyle>
      <EndCallButtonStyle onClick={leaveSession}>
        <EndCallIcon />
      </EndCallButtonStyle>
      <PanelButtonStyle>
        <FullScreenIcon />
      </PanelButtonStyle>
      <PanelButtonStyle>
        <MicrophoneIcon />
      </PanelButtonStyle>
    </CallPanelWrapper>
  );
};

export default CallPanel;
