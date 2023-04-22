import styled from 'styled-components';
import {
  BLACK,
  GRAY_SHADOW,
  WHISPER,
  WHITE,
} from '@constants/colors';
import { SMALL_FONT_SIZE } from '@constants/fontSizes';
import { FONT_ROBOTO } from '@constants/fonts';

export const ModalContainer = styled.div`
  z-index: 1000;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  justify-content: center;
  font-family: ${FONT_ROBOTO};
  border-radius: 8px;
  border: 2px solid ${WHISPER};
  height: fit-content;
  width: fit-content;
  padding: 32px;
  background-color: ${WHITE}; 
  color: ${BLACK}; 
  font-size: ${SMALL_FONT_SIZE};
  font-weight: bold;
  transition: all 0.2s ease-in-out;
`;

export const ModalContent = styled.div`
  min-width: 200px;
  height: fit-content;
  width: fit-content;
`;

export const ModalButtonsWrapper = styled.div`
  display: flex;
  width: max-width;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: ${GRAY_SHADOW};
`;

export const Title = styled.h2`
  color: ${BLACK}; 
  margin-bottom: 10px;
  font-family: ${FONT_ROBOTO};
  text-align: center;
`;

export const Label = styled.label`
`;

export const DateInput = styled.input`
`;

export const SelectedDateText = styled.p`
`;

export const WrapperLabelAndInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
  margin-bottom: 20px;
`;
