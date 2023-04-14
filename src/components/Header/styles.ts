import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const HeaderContainer = styled.div`
  padding: 20px 0px 20px 20px;
  align-items: flex-start;
  width: 10%;
`;

export const LinkToLogin = styled(NavLink)`
  text-decoration: none;
  width: 40%;
`;
