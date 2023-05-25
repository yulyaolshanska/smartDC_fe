import { ACTIVE, COLOR_ONE, WHITE } from '@constants/colors';
import { NORMAL_FONT_SIZE } from '@constants/fontSizes';
import FONT_ROBOTO from '@constants/fonts';
import styled from 'styled-components';

export const ChatButtonStyle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: ${COLOR_ONE};
  border: 2px solid ${ACTIVE};
  border-radius: 4px;

  width: 20%;
  font-family: ${FONT_ROBOTO};
  color: ${ACTIVE};
  font-size: ${NORMAL_FONT_SIZE};
  font-weight: 700;
  padding: 12px;
  height: 52px;
  transition: all 0.2s ease-in-out;

  &:active {
    transform: translateY(-2px);
  }
  &:hover {
    filter: brightness(0.95);
  }
`;
