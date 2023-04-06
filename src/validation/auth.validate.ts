import * as yup from 'yup';

const NAME_PATTERN = /^([A-Z][a-z]{1,11})/;
const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.{10,})/;

const PASSWORD_REQUIRED_LENGTH = 10;

export const signUpSchema = yup.object().shape({
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

export const resetPasswordSchema = yup.object().shape({
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
