import {
  GREEN_BORDER,
  NOTIFICATION_BTN_BACKGROUND,
  WHITE,
  ZAMBEZI,
} from '@constants/colors';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const NotificationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 16px 20px;
  height: 80px;
  background: ${WHITE};
  border: 1.5px solid ${GREEN_BORDER};
  border-radius: 4px;
`;

export const Title = styled.h4`
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;
  color: ${ZAMBEZI};
`;

export const DetailsBtn = styled(NavLink)`
  padding: 12px 24px;
  height: 44px;
  background: ${NOTIFICATION_BTN_BACKGROUND};
  border-radius: 4px;
  font-weight: 700;
  font-size: 14px;
  line-height: 1.4;
  color: ${GREEN_BORDER};
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PatientInfo = styled(NavLink)`
  font-weight: 700;
  font-size: 16px;
  line-height: 1.5;
  color: ${GREEN_BORDER};
`;
export const DoctorInfo = styled.button`
  font-weight: 700;
  font-size: 16px;
  line-height: 1.5;
  color: ${GREEN_BORDER};
`;

export const CallInfo = styled.div`
  display: flex;
`;

export const El = styled.span`
  margin: 0 5px;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;
  color: ${ZAMBEZI};
`;
