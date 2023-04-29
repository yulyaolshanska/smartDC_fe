import { TextFieldProps } from '@mui/material/TextField/TextField';
import { Control, FieldErrors } from 'react-hook-form';
import { FormValues } from '@components/general/type';

export type InputProps = TextFieldProps & {
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
};
