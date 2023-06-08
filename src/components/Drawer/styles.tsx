import styled from 'styled-components';
import FONT_ROBOTO from '@constants/fonts';
import { NORMAL_FONT_SIZE, SMALL_FONT_SIZE } from '@constants/fontSizes';
import {
  ACTIVE,
  ACTIVE_BACKGROUND,
  DRAWER_BORDER,
  DRAWER_CONT,
  NOT_ACTIVE,
  NOT_ACTIVE_BACKGROUND_HOVER,
  NOT_ACTIVE_HOVER,
} from '@constants/colors';

export const DrawerContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 23.5vw;
  background-color: ${DRAWER_CONT};
  min-height: 100vh;
  border-right: 1px solid ${DRAWER_BORDER};
  padding: 12px;
  font-family: ${FONT_ROBOTO};
`;

export const PositionContainer = styled.div<{ selected?: boolean | string }>`
  display: flex;
  flex-direction: row;
  border-radius: 8px;
  padding: 12px 46px 12px 17px;
  color: ${({ selected }) => (selected ? ACTIVE : NOT_ACTIVE)};
  font-size: ${NORMAL_FONT_SIZE};
  font-weight: 700;
  background-color: ${({ selected }) => (selected ? ACTIVE_BACKGROUND : null)};
  &:hover {
    background-color: ${({ selected }) =>
      selected ? null : NOT_ACTIVE_BACKGROUND_HOVER};
    color: ${({ selected }) => (selected ? ACTIVE : NOT_ACTIVE_HOVER)};
    svg {
      fill: ${({ selected }) => (selected ? ACTIVE : NOT_ACTIVE_HOVER)};
    }
  }
  svg {
    margin-right: 16px;
    fill: ${({ selected }) => (selected ? ACTIVE : NOT_ACTIVE)};
  }
  cursor: ${({ selected }) => (selected ? 'default' : 'pointer')};
  transition: 0.2s all;
  &:nth-child(2) {
    margin-top: 40px;
  }
  &:active {
    ${({ selected }) => !selected && 'transform: translateY(-7px);'}
  }
`;

export const PositionContainerBlocked = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 8px;
  padding: 12px 46px 12px 17px;
  color: ${NOT_ACTIVE};
  opacity: 0.6;
  font-size: ${NORMAL_FONT_SIZE};
  font-weight: 700;
  svg {
    margin-right: 16px;
    fill: ${NOT_ACTIVE};
  }
  transition: 0.2s all;
  &:nth-child(2) {
    margin-top: 40px;
  }
`;

export const TopDrawer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 140px;
  border-bottom: 1px solid ${DRAWER_BORDER};
`;
export const BottomDrawer = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  gap: 8px;
  margin-top: 20px;
  padding-left: 12px;
`;
export const DoctorInfo = styled.div``;

export const DoctorName = styled.div`
  font-size: ${SMALL_FONT_SIZE};
  font-weight: 700;
`;
export const DoctorSpeciality = styled.div`
  color: #a6adbc;
  font-size: ${SMALL_FONT_SIZE};
  font-weight: 500;
`;
