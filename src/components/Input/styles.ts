import { NAVY_BLUE, WHITE, RED } from 'src/common/constants/colors';
import styled from "styled-components";

export const InputContainer = styled.div<{ hasError: boolean }>`
  background: ${WHITE};
  width: 100%;
  font-style: normal;
  height: 60px;
  border-radius: 8px;
  
  & .MuiInputBase-root {
    height: 60px;
    border-radius: 8px !important;
    border: ${(props) =>
    props.hasError ? "2px solid ${RED}" : "2px solid transparent"};
    border-color: ${(props) => (props.hasError ? "${RED}" : "${WHISPER}")}; 

    &.Mui-focused fieldset {
      border-color: ${NAVY_BLUE} !important; 
    }

    &:hover fieldset {
      transition: all 0.4s ease-out;
      border-color: ${NAVY_BLUE}; 
    }

    &.Mui-focused {
      border: 2px solid ${NAVY_BLUE}; 

      transition: 0.1s ease-in-out;
    }

    fieldset {
      border: 0;
    }
  }

  & .MuiFormHelperText-root {
    color: ${RED}; 
    margin-left: 0;
  }
`