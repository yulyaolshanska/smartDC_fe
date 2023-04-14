import * as yup from 'yup';
import { PASSWORD_REQUIRED_LENGTH } from '@constants/auth';
import { useTranslation } from 'react-i18next';

const NAME_PATTERN = /^([A-Z][a-z]{1,11})/;
const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.{10,})/;

export function signUpSchema() {
  const { t } = useTranslation();

  const signUpFirstStepSchema = yup.object().shape({
    firstName: yup
      .string()
      .required(t('Error.firstNameRequired') ?? '')
      .min(2, t('Error.firstNameRequired') ?? '')
      .matches(NAME_PATTERN, t('Error.firstNameRequired') ?? ''),
    lastName: yup
      .string()
      .required(t('Error.lastNameRequired') ?? '')
      .min(2, t('Error.tooShort') ?? '')
      .matches(NAME_PATTERN, t('Error.nameFormat') ?? ''),
    email: yup
      .string()
      .email(t('Error.invalidEmailFormat') ?? '')
      .required(t('Error.emailRequired') ?? ''),
    phoneNumber: yup
      .string()
      .required(t('Error.phoneNumberRequired') ?? '')
      .min(6, t('Error.tooShort') ?? ''),
    password: yup
      .string()
      .required(t('Error.enterPassword') ?? '')
      .matches(
        PASSWORD_PATTERN,
        `${t('Error.mustContain') ?? ''} ${PASSWORD_REQUIRED_LENGTH} ${
          t('Error.charactersUppercaseLowercase') ?? ''
        }`
      ),
    confirmPassword: yup
      .string()
      .required(t('Error.confirmPasswordRequired') ?? '')
      .oneOf([yup.ref('password')], t('Error.passwordsDoesNotMatch') ?? ''),
  });

  const signUpSecondStepSchema = yup.object().shape({
    address: yup.string().required(t('Error.fieldRequired') ?? ''),
    city: yup.string().required(t('Error.fieldRequired') ?? ''),
    country: yup.string().required(t('Error.fieldRequired') ?? ''),
    gender: yup.string().required(t('Error.fieldRequired') ?? ''),
    specialization: yup.string().required(t('Error.fieldRequired') ?? ''),
    role: yup.string().required(t('Error.fieldRequired') ?? ''),
    timeZone: yup.string().required(t('Error.fieldRequired') ?? ''),
  });

  const resetPasswordSchema = yup.object().shape({
    password: yup
      .string()
      .required(t('Error.enterPassword') ?? '')
      .matches(
        PASSWORD_PATTERN,
        `${t('Error.mustContain') ?? ''} ${PASSWORD_REQUIRED_LENGTH} ${
          t('Error.charactersUppercaseLowercase') ?? ''
        }`
      ),
    confirmPassword: yup
      .string()
      .required(t('Error.confirmPasswordRequired') ?? '')
      .oneOf([yup.ref('password')], t('Error.passwordsDoesNotMatch') ?? ''),
  });

  const forgotPasswordSchema = yup.object().shape({
    email: yup
      .string()
      .email(t('Error.invalidEmailFormat') ?? '')
      .required(t('Error.emailRequired') ?? ''),
  });

  const LoginSchema = yup.object().shape({
    email: yup
      .string()
      .email(t('Error.invalidEmailFormat') ?? '')
      .required(t('Error.emailRequired') ?? ''),
    password: yup
      .string()
      .required(t('Error.enterPassword') ?? '')
      .matches(
        PASSWORD_PATTERN,
        `${t('Error.mustContain') ?? ''} ${PASSWORD_REQUIRED_LENGTH} ${
          t('Error.charactersUppercaseLowercase') ?? ''
        }`
      ),
  });

  return {
    signUpFirstStepSchema,
    signUpSecondStepSchema,
    LoginSchema,
    resetPasswordSchema,
    forgotPasswordSchema,
  };
}
