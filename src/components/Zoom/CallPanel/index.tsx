import { Stack } from '@mui/material';
import React from 'react';
import ZoomVideo from '@zoom/videosdk';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import MicOffIcon from '@mui/icons-material/MicOff';
import SpeakerIcon from '@mui/icons-material/Speaker';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import { ReactComponent as ChatInCallIcon } from '@assets/chatInCall.svg';
import { ReactComponent as EndCallIcon } from '@assets/endCall.svg';
import { ReactComponent as MicrophoneIcon } from '@assets/microphone.svg';
import { ReactComponent as CameraIcon } from '@assets/cameraCall.svg';

import {
  CallPanelWrapper,
  EndCallButtonStyle,
  PanelButtonStyle,
} from './style';

interface CallPanelProps {
  client: any;
  isSelfFullScreen: boolean;
  isParticipantFullScreen: boolean;
  setIsParticipantFullScreen: (arg: boolean) => void;
  setIsSelfFullScreen: (arg: boolean) => void;
  setStatus: (arg: boolean) => void;
  startVideoButton: () => void;
  startAudioButton: () => void;
  audioStarted: boolean;
  isMuted: boolean;
  videoStarted: boolean;
}

const CallPanel = ({
  client,
  isSelfFullScreen,
  isParticipantFullScreen,
  setIsParticipantFullScreen,
  setIsSelfFullScreen,
  setStatus,
  startVideoButton,
  startAudioButton,
  audioStarted,
  isMuted,
  videoStarted,
}: CallPanelProps) => {
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
      <PanelButtonStyle onClick={startVideoButton}>
        {videoStarted ? <VideocamOffIcon /> : <CameraIcon />}
      </PanelButtonStyle>
      <PanelButtonStyle>
        <ChatInCallIcon />
      </PanelButtonStyle>
      <EndCallButtonStyle onClick={leaveSession}>
        <EndCallIcon />
      </EndCallButtonStyle>
      <PanelButtonStyle
        onClick={() => setIsSelfFullScreen(!setIsSelfFullScreen)}
      >
        <CloseFullscreenIcon />
      </PanelButtonStyle>
      <PanelButtonStyle onClick={startAudioButton}>
        {!audioStarted ? <SpeakerIcon /> : null}
        {audioStarted && !isMuted ? <MicOffIcon /> : null}
        {audioStarted && isMuted ? <MicrophoneIcon /> : null}
      </PanelButtonStyle>
    </CallPanelWrapper>
  );
};

export default CallPanel;
