import styled, { keyframes, css } from 'styled-components';
import { ACTIVE, GHOST_WHITE } from '@constants/colors';
import { SMALL_FONT_SIZE } from '@constants/fontSizes';
import FONT_ROBOTO from '@constants/fonts';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: ${FONT_ROBOTO};
  background-color: ${GHOST_WHITE};
  height: 56px;
  border: 1.5px solid #085dd7;
  border-radius: 16px;
  padding: 30px 16px;
  width: 100%;
  cursor: pointer;
`;

export const Text = styled.div`
  color: ${ACTIVE};
  font-size: ${SMALL_FONT_SIZE};
  font-weight: 700;
`;

export const PlusButton = styled.div`
  display: flex;
  align-items: center;

  svg {
    fill: ${ACTIVE};
  }
`;
