import { Stack } from '@mui/material';
import styled from 'styled-components';
import {
  DARK_BLUE,
  PINK_SWAN,
  BORDER,
  NOTE_DOCTOR,
  WHITE,
  ACTIVE,
} from '@constants/colors';
import {
  VERY_SMALL_FONT_SIZE,
  SMALL_FONT_SIZE,
  NORMAL_FONT_SIZE,
} from '@constants/fontSizes';
import FONT_ROBOTO from '@constants/fonts';

export const CreateNoteContainer = styled.div`
  padding: 16px 0;
  margin: 10px 0;
  border-bottom: 1px solid ${BORDER};
  border-top: 1px solid ${BORDER};
  font-family: ${FONT_ROBOTO};
  font-size: ${SMALL_FONT_SIZE};
`;

export const Description = styled.p`
  color: ${DARK_BLUE};
  font-size: ${NORMAL_FONT_SIZE};
`;
export const HintText = styled.p`
  font-size: ${VERY_SMALL_FONT_SIZE};
  margin-right: 4px;
`;

export const ErrorText = styled.span`
  font-size: ${VERY_SMALL_FONT_SIZE};
  color: ${ACTIVE};
`;

export const ErrorWrapper = styled.div`
  position: absolute;
  display: flex;
  bottom: -10px;
`;

export const TextAreaSection = styled(Stack)`
  position: relative;
`;
export const UploaderWrapper = styled.div`
  margin-top: 15px;
`;
export const Date = styled.div`
  color: ${PINK_SWAN};
`;

export const AddButton = styled.button<{ disabled: boolean }>`
  font-family: ${FONT_ROBOTO};
  :disabled {
    color: ${PINK_SWAN};
    border: 1px solid ${BORDER};
  }
  color: ${ACTIVE};
  font-weight: 700;
  font-size: ${VERY_SMALL_FONT_SIZE};
  width: 80px;
  height: 44px;
  border: 1px solid ${ACTIVE};
  border-radius: 4px;
`;

export const MainText = styled.div`
  padding: 16px 0 8px 0;
  margin: 8px 0;

  border-top: 1px solid ${BORDER};
`;

export const StyledTextArea = styled.textarea`
  height: 112px;
  padding: 10px;
  background-color: ${WHITE};
  border: 1.5px solid ${BORDER};
  border-radius: 4px;
  margin: 6px 0;
  resize: none;
`;

export const Show = styled.div`
  color: ${NOTE_DOCTOR};
  font-size: ${VERY_SMALL_FONT_SIZE};
  font-weight: 700;
  border-bottom: 1px solid ${BORDER};
  margin: 8px 0px;
  padding-bottom: 8px;
  cursor: pointer;
`;
export const Doctor = styled.div`
  color: ${NOTE_DOCTOR};
  font-size: ${VERY_SMALL_FONT_SIZE};
  font-style: italic;
  font-weight: 100;
`;
