import styled from "styled-components";
import { LARGE_FONT_SIZE } from '@constants/fontSizes';
import { CORNFLOWER_BLUE, NAVY_BLUE } from '@constants/colors';
import { FONT_ROBOTO } from '@constants/fonts';

export const LogoContainer = styled.div`
  margin: 20px;
  display: flex;
  align-items: center;
  flex-direction: row;
`;

export const LogoImg = styled.img`
  width: 60px;
  height: 60px;
`;

export const LogoTitle = styled.h1`
  font-size: ${LARGE_FONT_SIZE};
  font-family: ${FONT_ROBOTO};
  background: -webkit-linear-gradient(${NAVY_BLUE}, ${CORNFLOWER_BLUE}); 
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;