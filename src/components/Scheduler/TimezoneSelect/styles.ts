import {
  NAVY_BLUE, WHITE, RED, WHISPER, LIGHT_GRAY,
} from '@constants/colors';
import styled from 'styled-components';
import FONT_ROBOTO from '@constants/fonts';
import { VERY_SMALL_FONT_SIZE } from '@constants/fontSizes';

export const InputContainer = styled.div`
  margin: 12px 0;
  background: ${WHITE};
  width: fit-content;
  font-style: normal;
  height: fit-content;
  border-radius: 8px;
  font-family: ${FONT_ROBOTO};

  & .MuiInputBase-root {
    height: 60px;
    border-radius: 8px !important;
    border: 2px solid transparent;
    border-color: ${WHISPER};
    margin-bottom: 20px;

    &.Mui-focused fieldset {
      border-color: ${NAVY_BLUE} !important;
    }

    &:hover fieldset {
      transition: all 0.4s ease-out;
      border-color: ${NAVY_BLUE};
    }

    &.Mui-focused {
      border: 2px solid ${NAVY_BLUE};

      transition: 0.1s ease-in-out;
    }

    fieldset {
      border: 0;
    }
  }

  & .MuiFormHelperText-root {
    color: ${RED};
    margin-left: 0;
    font-family: ${FONT_ROBOTO};
    font-size: ${VERY_SMALL_FONT_SIZE};
  }
`;

export const Select = styled.select`
  box-sizing: border-box;
  width: fit-content;
  height: 44px;
  background: ${WHITE};
  color: ${LIGHT_GRAY};
  border: 1px solid ${LIGHT_GRAY};
  border-radius: 4px;
  flex: none;
  order: 1;
  flex-grow: 0;
  padding: 12px 8px;
`;

export const Option = styled.option``;
