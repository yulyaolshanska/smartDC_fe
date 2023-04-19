import { BORDER, GHOST_WHITE } from '@constants/colors';
import styled from 'styled-components';

const WrapperElement = styled.div`
  background-color: ${GHOST_WHITE};
  border: 1.5px solid;
  border-color: ${BORDER};
  border-radius: 16px;
  padding: 30px 16px;
  width: 100%;
`;

export default WrapperElement;
