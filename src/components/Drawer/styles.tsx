import styled from 'styled-components';
import FONT_ROBOTO from '@constants/fonts';

export const DrawerContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 24.5vw;
  background-color: #f4f6fd;
  min-height: 100vh;
  border-right: 1px solid #e7e7e7;
  padding: 12px;
  font-family: ${FONT_ROBOTO};
`;

export const PositionContainer = styled.div<{ selected?: boolean | string }>`
  display: flex;
  flex-direction: row;
  border-radius: 8px;
  padding: 12px 46px 12px 17px;
  color: ${({ selected }) => (selected ? '#4D84E7' : '#828bae')};
  font-size: 1.125rem;
  font-weight: 700;
  background-color: ${({ selected }) => (selected ? '#E2EDFD' : null)};
  &:hover {
    background-color: ${({ selected }) => (selected ? null : '#e2edfd')};
    color: ${({ selected }) => (selected ? '#4D84E7' : '#79a8ff')};
    svg {
      fill: ${({ selected }) => (selected ? '#4D84E7' : '#79a8ff')};
    }
  }
  svg {
    margin-right: 16px;
    fill: ${({ selected }) => (selected ? '#4D84E7' : '#828bae')};
  }
  cursor: ${({ selected }) => (selected ? 'default' : 'pointer')};
  transition: 0.3s all;
  &:nth-child(2) {
    margin-top: 40px;
  }
  &:active {
    ${({ selected }) => !selected && 'transform: translateY(-7px);'}
  }
`;
export const TopDrawer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 140px;
  border-bottom: 1px solid #e7e7e7;
`;
export const BottomDrawer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
`;
export const DoctorInfo = styled.div``;

export const DoctorName = styled.div`
  font-size: 16px;
  font-weight: 700;
`;
export const DoctorSpeciality = styled.div`
  color: #a6adbc;
  font-size: 16px;
  font-weight: 500;
`;
