
import styled from 'styled-components';
import { DayPicker } from 'react-day-picker';

export const StyledDayPicker = styled(DayPicker)`
  .DayPicker-wrapper {
    display: flex;
    justify-content: center;
    position: relative;
  }

  .DayPicker-Months {
    display: flex;
    gap: 10px;
    /* border: 1px solid red; */
    width: 700px; //подивитись за макетом
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