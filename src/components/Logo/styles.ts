import styled from "styled-components";
import { LARGE_FONT_SIZE } from '../../common/constants/fontSizes';
import { CORNFLOWER_BLUE, NAVY_BLUE } from '../../common/constants/colors';

export const LogoContainer = styled.div`
  margin: 20px;
  display: flex;
  align-items: center;
  flex-direction: row;
`;

export const LogoImg = styled.img`
`;

export const LogoTitle = styled.h1`
  font-size: ${LARGE_FONT_SIZE};
  background: -webkit-linear-gradient(${NAVY_BLUE}, ${CORNFLOWER_BLUE}); 
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;