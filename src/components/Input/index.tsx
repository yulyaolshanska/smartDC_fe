import { TextFieldProps } from "@mui/material/TextField/TextField";
import {Control, Controller} from "react-hook-form";
import {InputContainer} from "./styles";
import {TextField} from "@mui/material";
import { ISignUp } from "../Auth/type";
import { SignUpFields } from "src/common/types/auth.type";

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