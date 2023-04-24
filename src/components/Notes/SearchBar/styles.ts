import { BORDER, GHOST_WHITE, PINK_SWAN } from '@constants/colors';
import FONT_ROBOTO from '@constants/fonts';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  font-family: ${FONT_ROBOTO};
  background-color: ${GHOST_WHITE};
  height: 48px;
  border: 1.5px solid ${BORDER};
  border-radius: 16px;
  padding: 0px 16px;
  width: 100%;
`;

export const StyledStack = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 15px;
  width: 100%;
  height: 100%;
`;

export const SearchIconContainer = styled.div`
  svg {
    fill: ${PINK_SWAN};
    width: 100%;
    margin-top: 6px;
  }
`;

export const StyledInput = styled.input`
  width: 100%;
  height: 100%;
`;
