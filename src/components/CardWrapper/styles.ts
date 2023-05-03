import { ViewLink } from '@components/PatientItem/styles';
import { BLACK, BORDER, ZAMBEZI } from '@constants/colors';
import { SMALL_FONT_SIZE } from '@constants/fontSizes';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
`;

export const Arrow = styled.div<{ toggle: boolean }>`
  border: solid ${BLACK};
  border-width: 0 1px 1px 0;
  display: inline-block;
  padding: 3px;
  margin-left: 8px;
  margin-top: ${(props) => (props.toggle ? '-3px' : '10px')};
  color: ${BLACK};
  transition: 0.5s all;
  transform: rotate(${(props) => (props.toggle ? '45deg' : '-135deg')});
  -webkit-transform: rotate(${(props) => (props.toggle ? '45deg' : '-135deg')});
`;

export const PatientName = styled.div<{ toggle: boolean }>`
  display: flex;
  justify-content: left;
  align-items: center;
  cursor: pointer;
  color: ${ZAMBEZI};
  font-size: ${SMALL_FONT_SIZE};
`;

export const AccordionBody = styled.div<{
  toggle: boolean;
  ref?: React.RefObject<HTMLDivElement>;
}>`
  padding: ${(props) => (props.toggle ? '16px 0 16px 0' : '0')};
  border-top: ${(props) => (props.toggle ? `1px solid ${BORDER}` : null)};
  margin-top: ${(props) => (props.toggle ? '20px' : null)};
  font-size: ${SMALL_FONT_SIZE};
`;

export const EditCardLink = styled(ViewLink)`
  margin-left: auto;
`;
