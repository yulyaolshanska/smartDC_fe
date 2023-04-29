import {
  PINK_SWAN,
  BORDER,
  NOTE_DOCTOR,
  ACTIVE,
  WHITE,
  WHISPER,
} from '@constants/colors';
import { VERY_SMALL_FONT_SIZE } from '@constants/fontSizes';
import styled from 'styled-components';

export const CreateNoteContainer = styled.div`
  padding: 16px 0;
  margin: 10px 0;
  border-bottom: 1px solid ${BORDER};
  border-top: 1px solid ${BORDER};
`;

export const Date = styled.div`
  color: ${PINK_SWAN};
`;

export const AddButton = styled.button<{ disabled: boolean }>`
  :disabled {
    color: ${PINK_SWAN};
    border: 2px solid ${PINK_SWAN};
  }
  color: ${ACTIVE};
  font-weight: 700;
  font-size: ${VERY_SMALL_FONT_SIZE};
  width: 80px;
  height: 44px;
  border: 2px solid ${ACTIVE};
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
  border: 1.5px solid ${WHISPER};
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
