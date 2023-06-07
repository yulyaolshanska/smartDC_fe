import styled from 'styled-components';
import { NORMAL_FONT_SIZE } from '@constants/fontSizes';
import FONT_ROBOTO from '@constants/fonts';

export const CalendarContainer = styled.div`
  margin: 8px 0px 60px 0px;
  height: 210px;
`;

export const CalendarTitle = styled.h1`
  font-weight: 700;
  font-size: ${NORMAL_FONT_SIZE};
  font-family: ${FONT_ROBOTO};
  line-height: 1.3;
  margin-bottom: 10px;
  text-align: center;
`;
export const EventMain = styled.div`
  border-radius: 50%;
  color: ${(props) => props.color};
  width: 10px;
  height: 10px;
`;

export const AppointmentEvent = styled.div``;

export const EventContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 3px auto;
`;
