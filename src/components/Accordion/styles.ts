import styled from 'styled-components';

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

export const AccordionTitle = styled.div<{ toggle: boolean }>`
  display: flex;
  justify-content: left;
  align-items: center;
  cursor: pointer;

  color: #585858;
  font-size: 16px;
`;

export const AccordionBody = styled.div<{ toggle: boolean }>`
  padding: ${(props) => (props.toggle ? '16px 0 16px 0' : '0')};
  border-top: ${(props) => (props.toggle ? '1px solid #d8dbe8' : null)};
  border-bottom: ${(props) => (props.toggle ? '1px solid #d8dbe8' : null)};
  margin-top: ${(props) => (props.toggle ? '20px' : null)};
  font-size: 16px;
`;
