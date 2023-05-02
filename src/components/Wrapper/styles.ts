import { BORDER, GHOST_WHITE } from '@constants/colors';
import styled, { keyframes, css } from 'styled-components';
import { SMALL_FONT_SIZE } from '@constants/fontSizes';
import FONT_ROBOTO from '@constants/fonts';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const WrapperElement = styled.div`
  background-color: ${GHOST_WHITE};
  border: 1.5px solid ${BORDER};
  border-radius: 16px;
  padding: 30px 16px;
  width: 100%;

  animation: ${css`
    ${fadeIn} 0.5s ease-in-out
  `};
`;
