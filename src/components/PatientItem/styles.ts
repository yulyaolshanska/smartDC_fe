import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  ACTIVE,
  BORDER,
  DARK_BLUE,
  GHOST_WHITE,
  LIGHT_BLUE,
} from '@constants/colors';
import { SMALL_FONT_SIZE, VERY_SMALL_FONT_SIZE } from '@constants/fontSizes';
import FONT_ROBOTO from '@constants/fonts';

export const PatientItem = styled.li`
  background: ${GHOST_WHITE};
  border: 1.5px solid ${BORDER};
  font-family: ${FONT_ROBOTO};
  border-radius: 8px;
  padding: 20px;

  &:not(:last-child) {
    margin-bottom: 16px;
  }
`;

export const ContactsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`;

export const ContactInfo = styled.p`
  margin-left: 4px;
  font-size: ${SMALL_FONT_SIZE};
  line-height: 1.5;
  color: ${DARK_BLUE};

  &:not(:last-child) {
    margin-right: 12px;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

export const UserInfo = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 4px;

  &:not(:last-child) {
    margin-right: 12px;
  }
`;

export const OverviewTitle = styled.span`
  margin-right: 4px;
  font-weight: 700;
  font-size: ${SMALL_FONT_SIZE};
  line-height: 1.25;
`;

export const Overview = styled.p`
  margin-bottom: 6px;
`;

export const LastAppointmentTitle = styled.span`
  margin-right: 4px;
  font-weight: 700;
  font-size: ${SMALL_FONT_SIZE};
  line-height: 1.43;
  color: ${LIGHT_BLUE};
`;

export const LastAppointment = styled.p`
  margin-bottom: 6px;
  font-size: ${SMALL_FONT_SIZE};
  line-height: 1.4;
  color: ${DARK_BLUE};
`;

export const ViewLink = styled(Link)`
  font-weight: 700;
  font-size: ${VERY_SMALL_FONT_SIZE};
  line-height: 1.4;
  color: ${ACTIVE};
`;
