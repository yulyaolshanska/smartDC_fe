import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const NotificationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 16px 20px;
  height: 80px;
  background: #ffffff;
  border: 1.5px solid #00a344;
  border-radius: 4px;
`;

export const Title = styled.h4`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #585858;
`;

export const DetailsBtn = styled(NavLink)`
  padding: 12px 24px;
  height: 44px;
  background: #e6f6ed;
  border-radius: 4px;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  color: #00a344;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PatientInfo = styled(NavLink)`
  margin-right: 5px;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: #00a344;
`;
export const DoctorInfo = styled.button`
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: #00a344;
`;

export const CallInfo = styled.div`
  display: flex;
`;
