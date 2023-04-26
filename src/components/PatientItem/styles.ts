import { SMALL_FONT_SIZE } from '@constants/fontSizes';
import styled from 'styled-components';

export const PatientItem = styled.li`
  background: #f5f7fd;
  /* border: 1.5px solid #d8dbe8; */
  border-radius: 8px;
  padding: 20px;
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
  color: #060d33;

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

export const PatientName = styled.h3``;

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
  font-size: 14px;
  line-height: 1.43;
  color: #081972;
`;

export const LastAppointment = styled.p`
  margin-bottom: 6px;
  font-size: 14px;
  line-height: 1.4;
  color: #060d33;
`;

// export const EditCardBtn = styled.button``;
