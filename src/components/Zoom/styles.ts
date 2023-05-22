import styled from 'styled-components';
import { Participant } from '@zoom/videosdk';

interface SelfVideoProps {
  isSelfFullScreen: boolean;
}

interface ParticipantCanvasProps {
  isParticipantFullScreen: boolean;
}

export const VideoContainer = styled.div`
  background-color: #d7ddf4;
  padding: 12px;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

export const SelfVideo = styled.video<SelfVideoProps>`
  position: ${({ isSelfFullScreen }) => (isSelfFullScreen ? 'fixed' : '')};
  top: 0;
  left: 0;
  right: 0;
  z-index: ${({ isSelfFullScreen }) => (isSelfFullScreen ? 10 : null)};
  width: ${({ isSelfFullScreen }) => (isSelfFullScreen ? '100vw' : '512px')};
  height: ${({ isSelfFullScreen }) => (isSelfFullScreen ? '100vh' : '288px')};

  border-radius: 4px;
  background-color: ${({ isSelfFullScreen }) =>
    isSelfFullScreen ? '#00000085' : 'azure'};
  transition: all 0.3s;
`;

export const ParticipantCanvas = styled.canvas<ParticipantCanvasProps>`
  position: ${({ isParticipantFullScreen }) =>
    isParticipantFullScreen ? 'fixed' : ''};
  top: 0;
  left: 0;
  right: 0;
  z-index: ${({ isParticipantFullScreen }) =>
    isParticipantFullScreen ? 10 : null};
  width: ${({ isParticipantFullScreen }) =>
    isParticipantFullScreen ? '100vw' : '512px'};
  height: ${({ isParticipantFullScreen }) =>
    isParticipantFullScreen ? '100vh' : '288px'};

  border-radius: 4px;
  background-color: ${({ isParticipantFullScreen }) =>
    isParticipantFullScreen ? '#00000085' : 'azure'};
  transition: all 0.3s;
`;
