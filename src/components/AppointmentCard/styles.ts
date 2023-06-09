import { Box } from '@mui/system';
import { GHOST_WHITE, PERIWINKLE } from '@constants/colors';
import FONT_ROBOTO from '@constants/fonts';
import styled from 'styled-components';

export const Wrapper = styled.div`
  background: ${GHOST_WHITE};
  border: 1.5px solid ${PERIWINKLE};
  border-radius: 4px;
  padding: 12px;
`;

export const BoxWrapper = styled(Box)`
font-family: ${FONT_ROBOTO};
`