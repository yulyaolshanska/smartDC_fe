import styled from 'styled-components';
import {
  BORDER,
  DARK_BLUE,
  BLACK,
  PINK_SWAN,
  WHITE,
  NAVY_BLUE,
  CORNFLOWER_BLUE,
  ZAMBEZI,
  BLUEBERRY_BLUE,
} from '@constants/colors';
import { XS_FONT_SIZE, SMALL_FONT_SIZE } from '@constants/fontSizes';
import FONT_ROBOTO from '@constants/fonts';

import { ReactComponent as Search } from '@assets/Search.svg';
import { TextField } from '@mui/material';

export const TextWrapper = styled.div`
  text-align: left;
  font-size: ${SMALL_FONT_SIZE};
  font-family: ${FONT_ROBOTO};
  color: ${ZAMBEZI};
`;

export const TextAccent = styled.span`
  font-weight: 700;
`;

export const FilterWrapper = styled.div`
  position: relative;
  margin-bottom: 5px;
`;
export const SearchIcon = styled(Search)`
  position: absolute;
  left: 20px;
  top: 18px;
`;
export const FilterInput = styled(TextField)`
  background-color: ${WHITE};
`;

export const TitlesWrapper = styled.div`
  display: flex;
  gap: 50px;

  color: ${DARK_BLUE};
  font-weight: 100;
  font-style: italic;
  font-size: ${XS_FONT_SIZE};
`;

export const TitleItem = styled.p`
  width: 200px;
`;

export const DoctorsList = styled.ul`
  margin-bottom: 12px;
`;
export const DoctorItem = styled.li`
  display: flex;
  gap: 50px;
  padding-top: 12px;
  padding-bottom: 12px;
  border-bottom: 1.5px solid ${BORDER};
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

export const LoadMoreBtn = styled.button`
  height: 44px;
  padding: 12px 32px;
  color: ${BLUEBERRY_BLUE};
  border: 1.5px solid ${BLUEBERRY_BLUE};
  border-radius: 4px;
  outline: none;
  &:hover {
    color: ${CORNFLOWER_BLUE};
    border-color: ${CORNFLOWER_BLUE};
  }
`;
