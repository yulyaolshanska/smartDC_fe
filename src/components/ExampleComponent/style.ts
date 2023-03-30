import styled from 'styled-components';
import { ExampleButtonProps } from './types';

export const ExampleButton = styled.button<ExampleButtonProps>`
  font-size: 16px;
  padding: 10px;
  border: none;
  border-radius: 4px;
  color: white;
  background-color: ${(props) => (props.primary ? 'blue' : 'green')};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.primary ? 'darkblue' : 'darkgreen')};
  }
`;
