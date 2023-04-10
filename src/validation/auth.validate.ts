import * as yup from 'yup';
import {PASSWORD_REQUIRED_LENGTH} from "@constants/auth";

const NAME_PATTERN = /^([A-Z][a-z]{1,11})/;
const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.{10,})/;

export const signUpFirstStepSchema = yup.object().shape({
 firstName: yup
     .string()
     .required('*First name is required')
     .min(2, "*Too short!")
     .matches(NAME_PATTERN, '*The name must contain English letters with first Uppercase character'),
 lastName: yup
     .string()
     .required('*Last name is required')
     .min(2, "*Too short!")
     .matches(NAME_PATTERN, '*The name must contain English letters with first Uppercase character'),
 email: yup
     .string()
     .email('*Invalid email format')
     .required('*Email is required'),
 phoneNumber: yup
     .string()
     .required('*Phone number is required')
     .min(6, "*Too short!"),
 password: yup
     .string()
     .required('*Please Enter your password')
     .matches(
         PASSWORD_PATTERN,
         `*Must Contain ${PASSWORD_REQUIRED_LENGTH} Characters, One Uppercase, One Lowercase`,
     ),
 confirmPassword: yup
     .string()
     .required('*Confirm password is required')
     .oneOf([yup.ref('password')], '*Passwords does not match'),
});
export const signUpSecondStepSchema = yup.object().shape({
 address:yup
     .string()
     .required('Field is required'),
 city:yup.string()
     .required('Field is required'),
 country:yup
     .string()
     .required('Field is required'),
 gender:yup
     .string()
     .required('Field is required'),
 specialization:yup
     .string()
     .required('Field is required'),
 role:yup
     .string()
     .required('Field is required'),
 timeZone:yup
     .string()
     .required('Field is required'),
});
export const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email('*Invalid email format')
    .required('*Email is required'),
  password: yup
    .string()
    .required('*Please Enter your password')
    .matches(
      PASSWORD_PATTERN,
      `*Must Contain ${PASSWORD_REQUIRED_LENGTH} Characters, One Uppercase, One Lowercase`,
    )
});
