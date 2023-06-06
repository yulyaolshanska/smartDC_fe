import styled from 'styled-components';
import FONT_ROBOTO from '@constants/fonts';
import { ACTIVE, BORDER } from '@constants/colors';
import { SMALL_FONT_SIZE } from '@constants/fontSizes';

export const PhotoChangerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${BORDER};
  padding-bottom: 8px;
  font-family: ${FONT_ROBOTO};
  p {
    color: ${ACTIVE};
    font-weight: 700;
    font-size: ${SMALL_FONT_SIZE};
    align-self: right;
    margin-left: 32px;
  }
`;

export const Photo = styled.div`
  align-self: center;
  position: relative;
  width: 160px;
  height: 160px;

  img {
    border-radius: 50%;
  }
`;

export const EditIconContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 10px;
  cursor: pointer;
  transition: 0.3s all;
  &:hover {
    transform: scale(110%) translateY(-3px);
  }

  &:active {
    transform: scale(100%) translateY(0px);
  }
`;

export const LinkContainer = styled.div`
  font-style: normal;
  font-size: ${SMALL_FONT_SIZE};
  font-family: ${FONT_ROBOTO};
  line-height: 22px;
  margin-bottom: 20px;
`;