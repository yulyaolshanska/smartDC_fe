import {Control, Controller} from "react-hook-form";
import { TextFieldProps } from "@mui/material/TextField/TextField";
import {TextField} from "@mui/material";
import { SignUpFields } from '@types';
import {InputContainer} from "@components/Input/styles";
import { ISignUp } from "@components/Auth/type";

export function Input({ control, name, label, error, type, placeholder, ...props}: TextFieldProps & { control: Control<ISignUp>}) {
  return (
    <InputContainer hasError={!!error}>
      <span>{label}</span>
      <Controller
        control={control}
        defaultValue=""
        name={(name as SignUpFields)}
        render={(rest) => (
          <TextField
            {...props}
            id={name}
            type={type}
            placeholder={placeholder}
            value={rest.field.value}
            onChange={rest.field.onChange}
          />
        )}
      />
    </InputContainer>
  );
}

export default Input;