import {
  ACTIVE,
  CORNFLOWER_BLUE,
  NAVY_BLUE,
  PINK_SWAN,
  POP_UP_CONTENT_BACKGROUND,
  POP_UP_CONTENT_BORDER,
  WHITE,
} from '@constants/colors';
import { SMALL_FONT_SIZE } from '@constants/fontSizes';
import FONT_ROBOTO from '@constants/fonts';
import styled from 'styled-components';

export const ExportButton = styled.button`
  :disabled {
    background: ${PINK_SWAN};
    color: ${WHITE};
  }
  display: flex;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 20px;
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

export const RangeInput = styled.input.attrs({ type: 'range' })`
  width: 90%;
  height: 20px;
  background: ${WHITE};
  outline: none;
  padding: 0;
  border-radius: 10px;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background: ${ACTIVE};
    cursor: pointer;
    border-radius: 50%;
  }
`;

export const InputWrapper = styled.label`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  cursor: pointer;
`;

export const StyledInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 36px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 2000;
  cursor: pointer;
`;

export const Content = styled.div`
  border: 1px solid ${POP_UP_CONTENT_BORDER};
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  overflow: auto;
  background-color: ${POP_UP_CONTENT_BACKGROUND};
  z-index: 3000;
  min-width: 400px;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
