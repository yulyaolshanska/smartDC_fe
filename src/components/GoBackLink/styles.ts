import styled from 'styled-components';
import { NAVY_BLUE, BLACK } from '@constants/colors';
import { SMALL_FONT_SIZE } from '@constants/fontSizes';
import FONT_ROBOTO from '@constants/fonts';

export const LinkContainer = styled.div`
  text-align: start;
  padding-bottom: 20px;
  font-style: normal;
  font-size: ${SMALL_FONT_SIZE};
  font-family: ${FONT_ROBOTO};
  line-height: 22px;
  margin-top: 10px;
`;

export const GoBack = styled.button`
  text-align: center;
  font-style: normal;
  font-weight: bold;
  line-height: 22px;
  color: ${BLACK};
  text-decoration: none;

  &:hover {
    color: ${NAVY_BLUE};

    & > i {
      border: solid ${NAVY_BLUE};
      display: inline-block;
      border-width: 0 2px 2px 0;
    }
  }
`;
