import React from 'react';
import 'react-phone-input-2/lib/bootstrap.css';
import {HelperText, PhoneInputContainer } from './styles';
import {Control, Controller} from "react-hook-form";
import {TextFieldProps} from "@mui/material/TextField/TextField";
import { ISignUp } from '../Auth/type';
import { SignUpFields } from 'src/common/types/auth.type';

function PhoneInput({ control, name, label, error, type, helperText, ...props}: TextFieldProps & { control: Control<ISignUp>}) {
  return (
    <Controller
      control={control}
      defaultValue=""
      name={(name as SignUpFields)}
      render={(rest) => (
        <>
          <PhoneInputContainer
            {...props}
            hasError={!!error}
            value={rest.field.value}
            onChange={rest.field.onChange}
            country={'ua'}
            countryCodeEditable={false}
            containerClass={'container-phone'}
            inputClass={'input-phone'}
            buttonClass={'button-class'}
          />
          <HelperText>
            {helperText}
          </HelperText>
        </>
      )}
    />
  );
}

export default PhoneInput;