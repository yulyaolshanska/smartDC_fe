import styled from 'styled-components';
import { PINK_SWAN, WHITE, BORDER } from '@constants/colors';
import { DayPicker } from 'react-day-picker';
import { Container } from '@mui/material';

export const StyledDayPicker = styled(DayPicker)`
  .DayPicker-wrapper {
    display: flex;
    justify-content: center;
    position: relative;
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

    border: 1px solid #e5e5e5;
    width: calc(100% / 2);

    border-radius: 8px;
    box-shadow: 0px 25px 25px 0px rgba(53, 53, 53, 0.12);

    background-color: ${WHITE};
  }
  .DayPicker-Month:hover {
    box-shadow: 0px 30px 30px 0px rgba(53, 53, 53, 0.16);
  }

  .rdp-caption {
    width: 100%;
  }
  .rdp-head_row {
    color: #808080;
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
`;
export const SelectText = styled.p`
  text-align: left;
  padding-bottom: 16px;
  color: ${PINK_SWAN};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
