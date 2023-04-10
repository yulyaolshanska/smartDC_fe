import {Control, Controller} from "react-hook-form";
import { TextFieldProps } from "@mui/material/TextField/TextField";
import {TextField} from "@mui/material";
import {InputContainer} from "@components/Input/styles";
import {ISignUp} from "@components/Auth/type";
import { SignUpFields } from "types/auth.type";
import {BLACK} from "@constants/colors";

export function Input({ control, name, label, error, type, placeholder, ...props}: TextFieldProps & { control: Control<ISignUp>}) {
  return (
    <InputContainer hasError={!!error}>
      <span>{label}</span>
      <Controller
        control={control}
        defaultValue=""
        name={(name as SignUpFields)}
        render={(rest) => (
          <>
          <TextField
            {...props}
            id={name}
            type={type}
            placeholder={placeholder}
            value={rest.field.value}
            sx={{ input: { color: type=='date'?`${BLACK}`:null }} }
            onChange={rest.field.onChange}
          />
          </>
        )}
      />
    </InputContainer>
  );
}

export default Input;