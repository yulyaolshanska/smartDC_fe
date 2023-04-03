import styled from 'styled-components';
import { ExampleButtonProps } from './types';
import { colors, fonts } from '@constants/index';

export const ExampleButton = styled.button<ExampleButtonProps>`
  font-size: ${fonts.primary.size};
  padding: 10px;
  border: none;
  border-radius: 4px;
  color: ${colors.secondary};
  background-color: ${(props) =>
    props.primary ? `${colors.primary}` : 'green'};
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.primary ? `${colors.primary}` : 'darkgreen'};
  }
`;
