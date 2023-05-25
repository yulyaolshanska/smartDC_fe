import { BLACK_BUT_NOT, WHITE } from '@constants/colors';
import { NORMAL_FONT_SIZE } from '@constants/fontSizes';
import FONT_ROBOTO from '@constants/fonts';
import styled from 'styled-components';

interface GoToFullScreenButtonStyleProps {
  isSelfFullScreen?: boolean;
  isParticipantFullScreen?: boolean;
}

export const GoToFullScreenButtonStyle = styled.button<GoToFullScreenButtonStyleProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: ${BLACK_BUT_NOT};
  border-radius: 50%;

  position: ${({ isSelfFullScreen, isParticipantFullScreen }) =>
    isSelfFullScreen || isParticipantFullScreen ? 'fixed' : 'absolute'};

  top: 8px;
  right: 8px;

  font-family: ${FONT_ROBOTO};

  color: ${WHITE};
  font-size: ${NORMAL_FONT_SIZE};
  font-weight: 700;
  padding: 12px;
  height: 36px;
  width: 36px;

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
