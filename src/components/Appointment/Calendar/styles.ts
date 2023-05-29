import styled from 'styled-components';
import { DayPicker } from 'react-day-picker';
import { Container } from '@mui/material';
import {
  PINK_SWAN,
  WHITE,
  BORDER,
  BLACK,
  BLACK_TRANSPORT,
  BLACK_ARROW_HOVER,
  WHISPER,
  CALENDAR_BOX_SHADOW,
  CALENDAR_HOVER_SHADOW,
  LIGHT_GRAY,
} from '@constants/colors';
import { ReactComponent as ArrowMui } from '@assets/arrowMui.svg';
import { ReactComponent as CrossIcon } from '@assets/Cross.svg';

export const StyledDayPicker = styled(DayPicker)`
  .DayPicker-wrapper {
    position: relative;
    display: flex;
    justify-content: center;
  }

  .DayPicker-Months {
    display: flex;
    gap: 10px;
    width: 100%;
    border-top: 1.5px solid ${BORDER};
    padding-top: 16px;
  }

  .DayPicker-Month {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 22px 20px 20px 20px;
    width: calc(100% / 2);

    border: 1px solid ${WHISPER};
    border-radius: 8px;
    box-shadow: 0px 25px 25px 0px ${CALENDAR_BOX_SHADOW};

    background-color: ${WHITE};
  }

  .DayPicker-Month:hover,
  .DayPicker-Month:focus {
    box-shadow: 0px 30px 30px 0px ${CALENDAR_HOVER_SHADOW};
  }

  .rdp-caption {
    width: 100%;
  }
  .rdp-caption_start,
  .rdp-caption_end {
    flex-direction: column;
    align-items: center;
    border: none;
  }
  .rdp-head_row {
    color: ${LIGHT_GRAY};
  }
`;

export const CancelIcon = styled(CrossIcon)`
  position: absolute;
  right: 13px;
  width: 20px;

  fill: ${BLACK_TRANSPORT};
  opacity: 0;

  cursor: pointer;

  &:hover,
  &:focus {
    fill: inherit;
  }
`;

export const CalendarWrapper = styled(Container)`
  margin-top: 14px;
  padding-top: 20px;
  padding-left: 0;
  padding-right: 0;

  background-color: ${WHITE};
  border-radius: 8px;
  border: 2px solid ${BORDER};

  cursor: text;

  &:hover ${CancelIcon}, &:focus ${CancelIcon} {
    opacity: 1;
  }
`;

export const TextinCalendarInput = styled.span`
  color: ${BLACK};
`;

export const SelectText = styled.p`
  position: relative;
  display: flex;
  align-items: center;

  text-align: left;
  padding-bottom: 16px;
  color: ${PINK_SWAN};
`;

export const ArrowIcon = styled(ArrowMui)`
  position: absolute;
  right: -15px;

  fill: ${BLACK_TRANSPORT};
  width: 25px;
  border-radius: 50%;
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: ${BLACK_ARROW_HOVER};
  }
`;

export const ArrowIconShown = styled(ArrowIcon)`
  transform: rotate(180deg);
`;
