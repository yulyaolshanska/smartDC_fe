import styled from 'styled-components';
import {
  BLACK,
  CORNFLOWER_BLUE,
  NAVY_BLUE,
  VERY_LIGHT_GREY,
  WHITE,
  ZAMBEZI,
} from '@constants/colors';
import FONT_ROBOTO from '@constants/fonts';
import { LARGE_FONT_SIZE, MEDIUM_FONT_SIZE } from '@constants/fontSizes';

export const Title = styled.h1`
  color: ${BLACK};
  margin-bottom: 35px;
  font-size: ${LARGE_FONT_SIZE};
  font-family: ${FONT_ROBOTO};
  text-align: center;
`;

export const CalendarContainer = styled.div`
  .rbc-calendar {
    background-color: ${WHITE};
    height: 600px;
    font-family: ${FONT_ROBOTO};
  }
  .rbc-day-bg {
    :hover {
      background-color: ${CORNFLOWER_BLUE};
      cursor: pointer;
    }
  }

  .rbc-events-container:hover {
    cursor: pointer;
  }

  .rbc-timeslot-group:hover {
    cursor: none;
  }

  .rbc-toolbar {
    font-size: ${MEDIUM_FONT_SIZE};
    margin-bottom: 30px;
  }

  .rbc-toolbar-label {
    font-size: ${LARGE_FONT_SIZE};
  }

  .rbc-event {
    background-color: ${NAVY_BLUE};
    text-align: center;

    :focus {
      background-color: ${ZAMBEZI};
    }
  }

  .rbc-time-content {
    .rbc-event:hover {
      background-color: ${ZAMBEZI};
    }
    .rbc-selected {
      background-color: ${NAVY_BLUE};
    }
  }
  .rbc-event-content {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .rbc-event-label {
    display: none;
  }

  .rbc-header {
    height: 50px;
    font-size: ${MEDIUM_FONT_SIZE};
  }

  .rbc-agenda-content {
    height: 50px;
    font-size: ${MEDIUM_FONT_SIZE};
  }

  .rbc-agenda-event-cell:hover {
    background-color: ${VERY_LIGHT_GREY};
    cursor: pointer;
  }
`;
