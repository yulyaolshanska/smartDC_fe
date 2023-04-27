import styled from 'styled-components';
import {
  NORMAL_FONT_SIZE,
  SMALL_FONT_SIZE,
} from '@constants/fontSizes';
import FONT_ROBOTO from '@constants/fonts';
import { CORNFLOWER_BLUE, NAVY_BLUE } from '@constants/colors';

export const Form = styled.form`
  margin: 35px;
  text-align: center;
`;

export const InputInlineContainer = styled.div`
  display: grid;
  justify-content: space-between;
  padding-bottom: 40px;
  gap: 4em;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1.5px solid #d8dbe8;
`;

export const Text = styled.div`
  font-size: ${NORMAL_FONT_SIZE};
  text-align: start;
  font-weight: bold;
  font-family: ${FONT_ROBOTO};
  background: -webkit-linear-gradient(${NAVY_BLUE}, ${CORNFLOWER_BLUE});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 20px;
`;

export const LinkContainer = styled.div`
  text-align: start;
  padding-bottom: 20px;
  font-style: normal;
  font-size: ${SMALL_FONT_SIZE};
  font-family: ${FONT_ROBOTO};
  line-height: 22px;
  margin-top: 10px;
`;
