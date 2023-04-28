import styled from 'styled-components';
import {
  PINK_SWAN,
  WHITE,
  NAVY_BLUE,
  CORNFLOWER_BLUE,
} from '@constants/colors';
import { SMALL_FONT_SIZE } from '@constants/fontSizes';
import FONT_ROBOTO from '@constants/fonts';

const SimpleButton = styled.button`
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
  width: 45%;
  margin-top: 20px;
  line-height: 22px;
  color: ${WHITE};
  font-size: ${SMALL_FONT_SIZE};
  font-weight: bold;
  background: -webkit-linear-gradient(${NAVY_BLUE}, ${CORNFLOWER_BLUE});
`;
export default SimpleButton;
