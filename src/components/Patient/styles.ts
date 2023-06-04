import styled from 'styled-components';
import {
  MEDIUM_FONT_SIZE,
  NORMAL_FONT_SIZE,
  SMALL_FONT_SIZE,
} from '@constants/fontSizes';
import FONT_ROBOTO from '@constants/fonts';
import {
  BLACK,
  BORDER,
  CORNFLOWER_BLUE,
  DARK_BLUE,
  LIGHT_BLUE,
  NAVY_BLUE,
  WHITE,
} from '@constants/colors';
import { NavLink } from 'react-router-dom';

export const Form = styled.form`
  margin: 35px;
  text-align: center;
`;

export const InputInlineContainer = styled.div`
  display: grid;
  justify-content: space-between;
  padding-bottom: 40px;
  gap: 4em;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1.5px solid ${BORDER};
`;

export const Text = styled.div`
  font-size: ${NORMAL_FONT_SIZE};
  text-align: start;
  font-weight: bold;
  font-family: ${FONT_ROBOTO};
  background: -webkit-linear-gradient(${NAVY_BLUE}, ${CORNFLOWER_BLUE});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 20px;
`;

export const LinkContainer = styled.div`
  text-align: start;
  padding-bottom: 20px;
  font-style: normal;
  font-size: ${SMALL_FONT_SIZE};
  font-family: ${FONT_ROBOTO};
  line-height: 22px;
  margin-top: 10px;
`;

export const PatientCardInfoContainer = styled.div`
  font-family: ${FONT_ROBOTO};
`;

export const PatientInfoName = styled.h1`
  margin-bottom: 10px;
`;

export const ContactsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  font-size: ${NORMAL_FONT_SIZE};
`;

export const ContactInfo = styled.p`
  margin-left: 4px;
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
  font-size: ${NORMAL_FONT_SIZE};
`;

export const UserInfo = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${DARK_BLUE};
  margin-left: 4px;
  &:not(:last-child) {
    margin-right: 12px;
  }
`;

export const OverviewTitle = styled.span`
  margin-right: 4px;
  font-weight: 700;
  line-height: 1.25;
`;

export const Overview = styled.p`
  margin-bottom: 6px;
  margin-top: 20px;
  color: ${DARK_BLUE};
  font-size: ${NORMAL_FONT_SIZE};
`;

export const LastAppointmentTitle = styled.span`
  margin-right: 4px;
  font-weight: 700;
  line-height: 1.43;
  color: ${LIGHT_BLUE};
`;

export const LastAppointment = styled.p`
  margin-bottom: 6px;
  font-size: ${NORMAL_FONT_SIZE};
  line-height: 1.4;
  color: ${DARK_BLUE};
`;

export const ShowMoreLessButton = styled.button`
  color: ${BLACK};
  font-weight: bold;
  &:hover {
    color: ${NAVY_BLUE};
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;

export const BookAppointmentButton = styled(NavLink)`
  background: -webkit-linear-gradient(${NAVY_BLUE}, ${CORNFLOWER_BLUE});
  color: ${WHITE};
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  width: 250px;
  height: 50px;
  border-radius: 10px;
  font-size: ${SMALL_FONT_SIZE};
  font-family: ${FONT_ROBOTO};
  font-weight: bold;
  :hover {
    color: ${WHITE};
  }
`;
