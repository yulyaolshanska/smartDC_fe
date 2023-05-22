import { WHITE } from '@constants/colors';
import { NORMAL_FONT_SIZE, SMALL_FONT_SIZE } from '@constants/fontSizes';
import FONT_ROBOTO from '@constants/fonts';
import styled from 'styled-components';

interface NameTipStyleProps {
  isSelfFullScreen: boolean;
}

export const NameTipStyle = styled.div`
  display: ${({ isSelfFullScreen }: NameTipStyleProps) =>
    isSelfFullScreen ? 'none' : 'flex'};
  align-items: center;
  justify-content: center;
  gap: 8px;

  position: ${({ isSelfFullScreen }) =>
    isSelfFullScreen ? 'fixed' : 'absolute'};
  bottom: 8px;
  left: 8px;
  background: #00000085;

  border-radius: 4px;

  width: 20%;
  font-family: ${FONT_ROBOTO};
  color: ${WHITE};
  font-size: ${SMALL_FONT_SIZE};
  font-weight: 400;
  padding: 12px;
  height: 28px;

  z-index: ${({ isSelfFullScreen }) => (isSelfFullScreen ? 100 : null)};
  transition: all 0.2s ease-in-out;

  &:active {
    transform: translateY(-2px);
  }
  &:hover {
    filter: brightness(0.95);
  }
`;
