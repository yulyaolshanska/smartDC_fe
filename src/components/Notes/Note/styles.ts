import { PINK_SWAN, BORDER, NOTE_DOCTOR } from '@constants/colors';
import { VERY_SMALL_FONT_SIZE } from '@constants/fontSizes';
import styled from 'styled-components';

export const Date = styled.div`
  color: ${PINK_SWAN};
`;

export const MainText = styled.div`
  padding: 16px 0 8px 0;
  margin: 8px 0;

  border-top: 1px solid ${BORDER};
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
