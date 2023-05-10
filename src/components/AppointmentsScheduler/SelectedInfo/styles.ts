import styled from 'styled-components';
import { PINK_SWAN, RED } from '@constants/colors';
import { LARGE_FONT_SIZE, MEDIUM_FONT_SIZE } from '@constants/fontSizes';
import FONT_ROBOTO from '@constants/fonts';

export const SelectedInfo = styled.div`
  margin-bottom: 20px;
  font-size: ${MEDIUM_FONT_SIZE};
  font-family: ${FONT_ROBOTO};
`;

export const SelectedDayInfo = styled.h1`
  color: ${PINK_SWAN};
  margin-top: 35px;
  margin-bottom: 20px;
  font-size: ${LARGE_FONT_SIZE};
  font-family: ${FONT_ROBOTO};
`;

export const ErrorInfo = styled.div`
  color: ${RED};
  font-size: ${MEDIUM_FONT_SIZE};
  font-family: ${FONT_ROBOTO};
`;
