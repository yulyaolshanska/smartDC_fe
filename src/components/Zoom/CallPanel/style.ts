import { WHITE } from '@constants/colors';
import { NORMAL_FONT_SIZE } from '@constants/fontSizes';
import FONT_ROBOTO from '@constants/fonts';
import styled from 'styled-components';

interface CallPanelWrapperProps {
  isSelfFullScreen?: boolean;
  isParticipantFullScreen?: boolean;
}

export const CallPanelWrapper = styled.button<CallPanelWrapperProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  position: ${({ isSelfFullScreen, isParticipantFullScreen }) =>
    isSelfFullScreen || isParticipantFullScreen ? 'fixed' : 'absolute'};

  z-index: ${({ isSelfFullScreen, isParticipantFullScreen }) =>
    isSelfFullScreen || isParticipantFullScreen ? 100 : null};

  bottom: 8px;
  right: 50%;
  left: 50%;
`;

export const PanelButtonStyle = styled.button<CallPanelWrapperProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: #00000085;
  border-radius: 50%;

  font-family: ${FONT_ROBOTO};

  color: ${WHITE};
  font-size: ${NORMAL_FONT_SIZE};
  font-weight: 700;
  padding: 12px;
  height: 60px;
  width: 60px;
  min-width: 60px;

  z-index: ${({ isSelfFullScreen, isParticipantFullScreen }) =>
    isSelfFullScreen || isParticipantFullScreen ? 100 : null};
  transition: all 0.2s ease-in-out;

  &:active {
    transform: translateY(-2px);
  }
  &:hover {
    filter: brightness(0.95);
  }
`;

export const EndCallButtonStyle = styled.button<CallPanelWrapperProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: #e9380d;
  border-radius: 50%;

  font-family: ${FONT_ROBOTO};

  color: ${WHITE};
  font-size: ${NORMAL_FONT_SIZE};
  font-weight: 700;
  padding: 12px;
  height: 100px;
  width: 100px;
  min-width: 100px;

  z-index: ${({ isSelfFullScreen, isParticipantFullScreen }) =>
    isSelfFullScreen || isParticipantFullScreen ? 100 : null};
  transition: all 0.2s ease-in-out;

  &:active {
    transform: translateY(-2px);
  }
  &:hover {
    filter: brightness(0.95);
  }
`;
