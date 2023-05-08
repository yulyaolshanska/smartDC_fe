import styled from 'styled-components';
import { ACTIVE } from '@constants/colors';
import { SMALL_FONT_SIZE } from '@constants/fontSizes';
import { Link } from '@components/general/styles';

export const BackToDashLink = styled(Link)`
  display: flex;
  align-items: center;
  color: ${ACTIVE};

  font-size: ${SMALL_FONT_SIZE};
  font-weight: 700;

  transition: all 0.2s ease-in-out;
`;
