import styled from 'styled-components';
import { BLACK, DARK_BLUE } from '@constants/colors';
import { XS_FONT_SIZE, NORMAL_FONT_SIZE } from '@constants/fontSizes';
import FONT_ROBOTO from '@constants/fonts';

export const TextInfo = styled.p`
  margin-bottom: 10px;
  font-family: ${FONT_ROBOTO};
  color: ${DARK_BLUE};
  font-size: ${NORMAL_FONT_SIZE};
`;

export const CalendarWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
`;

export const FormInfo = styled.div`
  text-align: left;
  border-left: 2px solid ${BLACK};
  padding-left: 7px;
`;

export const YouSelected = styled.p`
  font-family: ${FONT_ROBOTO};
  color: ${DARK_BLUE};
  font-size: ${NORMAL_FONT_SIZE};
  width: max-content;
`;

export const SelectedDayTime = styled.p`
  width: max-content;
  font-weight: 100;
  font-style: italic;
  font-size: ${XS_FONT_SIZE};
`;

export const HiddenInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;
  white-space: nowrap;
  -webkit-clip-path: inset(100%);
  clip-path: inset(100%);
  clip: rect(0 0 0 0);
  overflow: hidden;
`;
