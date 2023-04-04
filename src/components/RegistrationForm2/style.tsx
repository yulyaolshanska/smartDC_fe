import styled from 'styled-components';
import { StylesConstantsColor } from 'components/RegistrationForm2/constants/styles';
import { SignInButtonProps } from 'components/RegistrationForm2/types';
import { Link } from 'react-router-dom';

export const RegForm2Container = styled.form`
  display: flex;
  height: 90vh;
  width: 35vw;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  margin: 0 auto;
  padding: 5em;
  background: ${StylesConstantsColor.RF2_BG_COLOR};
  border: 1px solid ${StylesConstantsColor.RF2_BOX_COLOR};
  box-shadow: ${StylesConstantsColor.RF2_SHADOW};
  border-radius: 1em;
  @media only screen and (min-width: 360px) {
    min-width: 400px;
  }
`;

export const Title = styled.h1`
  font-size: ${StylesConstantsColor.INPUT_FONT_SIZE_BIG};
  font-weight:700;
  margin-bottom: 0.5em;
`;

interface StyledProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const StyledSelect = styled.select<StyledProps>`
  width: 100%;
  height: 2em;
  border-radius: 5px;
  background: ${StylesConstantsColor.RF2_BTN_COLOR};
  border: 1px solid ${StylesConstantsColor.RF2_BOX_COLOR};
  padding: 5px;
  color: ${StylesConstantsColor.INPUTS_FONT_COLOR};
  font-size: ${StylesConstantsColor.INPUT_FONT_SIZE};
  margin: 5px;
`;

export const StyledLabel = styled.div`
  display: flex;
  width: 100%;
  font-size: ${StylesConstantsColor.INPUT_FONT_SIZE};
  align-items: left;
  color: ${StylesConstantsColor.LABEL_COLOR};
`;

export const StyledInput = styled.input`
  border-radius: 1px;
  background: white;
  border-radius: 5px;
  border: 1px solid ${StylesConstantsColor.RF2_BOX_COLOR};
  color: ${StylesConstantsColor.INPUTS_FONT_COLOR};
  width: 100%;
  height: 1em;
  padding: 0.8rem;
  font-size: ${StylesConstantsColor.INPUT_FONT_SIZE};
  margin: 5px;
`;

export const InputInlineContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px;
  width: 100%;
`;
export const InlineContainerRow = styled.div`
  display: flex;
  width: 50%;
  margin: 5px;
  flex-direction: column;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 5px;
  width: 100%;
`;
export const StyledButton = styled.button<SignInButtonProps>`
  background: ${StylesConstantsColor.BUTTON_BG_COLOR};
  border-radius: 8px;
  width: 50%;
  height: 2rem;
  color: ${(StylesConstantsColor.RF2_BTN_COLOR)};
  disabled: ${(props) => (props.status?"true":"false")};
`;

export const InputGroup = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
`;

export const ErrorMessage = styled.div`
  display: flex;
  width: 100%;
  font-size: ${StylesConstantsColor.INPUT_FONT_SIZE};;
  color: ${StylesConstantsColor.ERROR_COLOR};
`;



export const LinkContainer = styled(Link)`
  font-weight: bold;
  color: black;
  @media only screen and (min-width: 360px) {
    min-width: 360px;
    font-size:${StylesConstantsColor.INPUT_FONT_SIZE};;
  }
`;
