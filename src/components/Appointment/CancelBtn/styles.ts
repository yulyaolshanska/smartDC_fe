import styled from 'styled-components';
import { BLACK, PINK_SWAN, WHITE } from '@constants/colors';
import { XS_FONT_SIZE } from '@constants/fontSizes';

import { NavLink } from 'react-router-dom';
import FONT_ROBOTO from '@constants/fonts';

import { ReactComponent as CrossIcon } from '@assets/Cross.svg';

export const CancelBtnSmall = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 8px 14px 8px 8px;
  border-radius: 8px;
  font-family: ${FONT_ROBOTO};
  border: none;
  height: 36px;
  width: 86px;

  line-height: 1.42;
  color: ${WHITE};
  font-size: ${XS_FONT_SIZE};
  font-weight: bold;
  cursor: pointer;
  background: ${PINK_SWAN};
  text-decoration: none;

  &:hover > .CancelIcon {
    fill: ${BLACK};
  }
`;

export const CancelIcon = styled(CrossIcon)`
  margin-right: 4px;

  fill: ${WHITE};
  &:hover {
    fill: inherit;
  }
`;


