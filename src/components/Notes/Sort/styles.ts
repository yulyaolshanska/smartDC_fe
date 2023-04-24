import {
  ACTIVE,
  BLACK,
  GHOST_WHITE,
  NOT_ACTIVE_HOVER,
  PINK_SWAN,
  ZAMBEZI,
} from '@constants/colors';
import styled, { keyframes, css } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const SortContainer = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
  min-width: 200px;
  gap: 5px;

  cursor: pointer;
`;
export const SortByText = styled.div`
  color: ${ZAMBEZI};
`;

export const SortStatementText = styled.div`
  color: ${BLACK};
`;
export const SortList = styled.ul<{ toggle?: boolean }>`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;

  animation: ${(props) =>
    props.toggle
      ? css`
          ${fadeIn} 0.5s ease-in-out
        `
      : 'none'};

  & * {
    background-color: ${NOT_ACTIVE_HOVER};
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    :last-child {
      border-bottom-left-radius: 15px;
      border-bottom-right-radius: 15px;
    }
    :first-child {
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
    }
  }
`;
export const Arrow = styled.div<{ toggle: boolean }>`
  border: solid black;
  border-width: 0 1px 1px 0;
  display: inline-block;
  padding: 3px;
  margin-left: 8px;
  margin-top: ${(props) => (props.toggle ? '-3px' : '10px')};
  color: black;

  transition: 0.5s all;
  transform: rotate(${(props) => (props.toggle ? '45deg' : '-135deg')});
  -webkit-transform: rotate(${(props) => (props.toggle ? '45deg' : '-135deg')});
`;
