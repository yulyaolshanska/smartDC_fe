import styled from 'styled-components';
import { BORDER, DARK_BLUE } from '@constants/colors';
import { XS_FONT_SIZE } from '@constants/fontSizes';
import FONT_ROBOTO from '@constants/fonts';

export const DoctorItem = styled.li`
  display: flex;
  gap: 50px;
  padding-top: 12px;
  padding-bottom: 12px;
  border-bottom: 1.5px solid ${BORDER};
  color: ${DARK_BLUE};
  font-family: ${FONT_ROBOTO};
  font-size: ${XS_FONT_SIZE};
`;

export const DoctorName = styled.span`
  font-weight: 100;
  font-style: italic;
  margin-left: 12px;
`;

export const DoctorImg = styled.img`
  border-radius: 50%;
  border: 1px solid ${BORDER};
  overflow: hidden;
  margin-left: 12px;
`;

export const DoctorItemInfo = styled.div`
  display: flex;
  align-items: center;
  text-align: start;
  width: 250px;
`;
