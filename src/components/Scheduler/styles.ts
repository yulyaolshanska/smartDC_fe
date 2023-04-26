import styled from 'styled-components';
import {
  CORNFLOWER_BLUE,
  NAVY_BLUE,
  PINK_SWAN,
  RED,
  WHITE,
} from '@constants/colors';
import { SMALL_FONT_SIZE } from '@constants/fontSizes';
import { FONT_ROBOTO } from '@constants/fonts';

export const SaveButton = styled.input`
  :disabled {
    background: ${PINK_SWAN}; 
    color: ${WHITE}; 
  }
  display: flex;
  margin-right: auto;
  margin-left: auto;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-family: ${FONT_ROBOTO};
  border: none;
  height: 55px;
  min-width: 90px;
  margin-top: 20px;
  line-height: 22px;
  color: ${WHITE}; 
  font-size: ${SMALL_FONT_SIZE};
  font-weight: bold;
  background: -webkit-linear-gradient(${NAVY_BLUE}, ${CORNFLOWER_BLUE});
  &:hover {
    cursor: pointer;
  }
`;

export const CancelButton = styled.input`
  display: flex;
  margin-right: auto;
  margin-left: auto;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-family: ${FONT_ROBOTO};
  border: none;
  height: 55px;
  min-width: 90px;
  margin-top: 20px;
  line-height: 22px;
  color: ${WHITE}; 
  font-size: ${SMALL_FONT_SIZE};
  font-weight: bold;
  background: ${PINK_SWAN};
  &:hover {
    cursor: pointer;
  }
`;

export const ErrorText = styled.p`
  color: ${RED};
`;

export const SchedulerButtonsWrapper = styled.div`
  float: right;
  display: flex;
  max-width: 40vw;
  gap: 20px;
`;
