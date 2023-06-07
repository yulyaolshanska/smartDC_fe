import { XS_FONT_SIZE, SMALL_FONT_SIZE } from '@constants/fontSizes';
import { ERROR_RED,ERROR_LIGHT } from '@constants/colors';
import FONT_ROBOTO from '@constants/fonts';
import styled from 'styled-components';

export const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: ${FONT_ROBOTO};
  font-size: ${SMALL_FONT_SIZE};
  padding: 12px 20px;
  border: 1px solid ${ERROR_RED};
  border-radius: 4px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const TextWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const Button = styled.button`
padding:12px 24px;
border-radius:4px;
background-color: ${ERROR_LIGHT};
color:${ERROR_RED};
font-size: ${XS_FONT_SIZE};
font-weight:700;
line-height:1.42;
`