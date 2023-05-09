import styled from 'styled-components';
import { ACTIVE } from '@constants/colors';
import {
  SMALL_FONT_SIZE,
  EXTRA_LARGE_FONT_SIZE,
  MEDIUM_FONT_SIZE,
  LARGE_FONT_SIZE,
} from '@constants/fontSizes';
import { Link } from '@components/general/styles';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: ${ACTIVE};
  font-size: ${MEDIUM_FONT_SIZE};
  font-weight: 700;
`;

export const ErrorNumber = styled.p`
  font-size: ${EXTRA_LARGE_FONT_SIZE};
`;

export const ErrorText = styled.p`
  font-size: ${LARGE_FONT_SIZE};
`;

export const BackToDashLink = styled(Link)`
  display: flex;
  align-items: center;
  color: ${ACTIVE};

  font-size: ${SMALL_FONT_SIZE};
  font-weight: 700;

  transition: all 0.2s ease-in-out;
`;
