import { BORDER, GHOST_WHITE } from '@constants/colors';
import styled from 'styled-components';

export const WrapperElement = styled.div`
  background-color: ${GHOST_WHITE};
  border: 1.5px solid ${BORDER};
  border-radius: 16px;
  padding: 30px 16px;
  width: 100%;
`;
