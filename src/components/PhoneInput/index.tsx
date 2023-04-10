import React from 'react';
import {Control, Controller} from "react-hook-form";
import {TextFieldProps} from "@mui/material/TextField/TextField";
import 'react-phone-input-2/lib/bootstrap.css';
import {HelperText, PhoneInputContainer } from '@components/PhoneInput/styles';
import {ISignUp, ISignUpFirstStep, ISignUpSecondStep} from '@components/Auth/type';
import { SignUpFields } from '@types';

function PhoneInput({ control, name, label, error, type, helperText, ...props}: TextFieldProps & { control: Control<ISignUpFirstStep | ISignUpSecondStep>}) {
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