import { BORDER, GHOST_WHITE } from '@constants/colors';
import styled from 'styled-components';
import { SMALL_FONT_SIZE } from '@constants/fontSizes';
import FONT_ROBOTO from '@constants/fonts';

export const WrapperElement = styled.div`
  background-color: ${GHOST_WHITE};
  border: 1.5px solid ${BORDER};
  border-radius: 16px;
  padding: 30px 16px;
  width: 100%;
`;
