import PhoneInput from 'react-phone-input-2';
import styled from 'styled-components';
import {
  BLACK,
  MANDY,
  NAVY_BLUE,
  RED,
  SNUFF,
  WHISPER,
  WHITE,
} from '@constants/colors';
import { VERY_SMALL_FONT_SIZE } from '@constants/fontSizes';
import FONT_ROBOTO from '@constants/fonts';

export const PhoneInputContainer = styled(PhoneInput)<{ hasError: boolean }>`
  background: #${WHITE};
  font-style: normal;
  height: 60px;
  border-radius: 8px;
  outline: none !important;
  font-family: ${FONT_ROBOTO};

  .button-class {
    position: absolute;
    border: none;
    background: none;
    width: 82px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 2px solid ${WHISPER};
    transition: box-shadow ease 0.25s, border-color ease 0.25s;
    border-right: ${(props) =>
      props.hasError ? `2px solid ${RED}` : '2px solid transparent'};
    border-color: ${(props) => (props.hasError ? `${RED}` : `${WHISPER}`)};
  }

  .button-class:focus {
    border-color: ${NAVY_BLUE};
  }

  .input-phone {
    width: 100%;
    height: 60px;
    outline: none;
    border-radius: 8px;
    border: 2px solid ${WHISPER};
    padding-left: 90px;
    color: ${BLACK};
    border-right: ${(props) =>
      props.hasError ? `2px solid ${RED}` : '2px solid transparent'};
    border-color: ${(props) => (props.hasError ? `${RED}` : `${WHISPER}`)};
  }
  .input-phone:focus {
    outline: none !important;
    border-color: ${NAVY_BLUE};
    box-shadow: none !important;
    color: ${BLACK};
  }
  .input-phone:focus + .button-class {
    border-color: ${NAVY_BLUE};
    transition: box-shadow ease 0.25s, border-color ease 0.25s;
  }

  .selected-flag:before {
    border: none !important;
    box-shadow: none !important;
  }
  .selected-flag:before {
    transition: none;
  }

  .selected-flag:not(:hover) {
    background-color: ${MANDY};
  }

  .selected-flag:hover {
    background-color: ${SNUFF};
  }
  .selected-flag:focus {
    outline: none;
    border: none;
  }
`;

export const HelperText = styled.span`
  color: ${RED};
  margin-left: 0;
  padding-top: 6px;
  font-family: ${FONT_ROBOTO};
  font-size: ${VERY_SMALL_FONT_SIZE};
`;
