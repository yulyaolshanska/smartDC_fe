import styled from 'styled-components';
import FONT_ROBOTO from '@constants/fonts';

export const PhotoChangerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #d8dbe8;
  padding-bottom: 8px;
  font-family: ${FONT_ROBOTO};
  p {
    color: #4d84e7;
    font-weight: 700;
    font-size: 0.875rem;
    align-self: right;
    margin-left: 32px;
  }
`;

export const Photo = styled.div`
  align-self: center;
  position: relative;
  width: 160px;
  height: 160px;
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
