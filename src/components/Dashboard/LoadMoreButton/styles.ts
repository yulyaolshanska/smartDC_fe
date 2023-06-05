import styled from 'styled-components';
import { ACTIVE, PINK_SWAN } from '@constants/colors';

import { VERY_SMALL_FONT_SIZE } from '@constants/fontSizes';

export const LoadButton = styled.button`
  :disabled {
    color: ${PINK_SWAN};
    border: 2px solid ${PINK_SWAN};
  }
  color: ${ACTIVE};
  font-weight: 700;
  font-size: ${VERY_SMALL_FONT_SIZE};
  width: 20%;
  height: 44px;
  border: 2px solid ${ACTIVE};
  border-radius: 4px;
`;
export const mock = [];
