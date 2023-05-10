import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { BLACK, PINK_SWAN, WHITE } from '@constants/colors';
import { XS_FONT_SIZE } from '@constants/fontSizes';
import FONT_ROBOTO from '@constants/fonts';
import { ReactComponent as CrossIcon } from '@assets/Cross.svg';

export const CancelIcon = styled(CrossIcon)`
  margin-right: 4px;

  fill: ${WHITE};
  &:hover {
    fill: inherit;
  }
`;

export const CancelBtnSmall = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;

  font-family: ${FONT_ROBOTO};
  line-height: 1.42;
  font-size: ${XS_FONT_SIZE};
  font-weight: bold;

  padding: 8px 14px 8px 8px;
  border-radius: 8px;
  border: none;

  height: 36px;
  width: 86px;

  color: ${WHITE};
  background-color: ${PINK_SWAN};

  cursor: pointer;
  text-decoration: none;

  &:hover > ${CancelIcon} {
    fill: ${BLACK};
  }
`;
