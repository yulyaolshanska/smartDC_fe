import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

import { PASSWORD_REQUIRED_LENGTH } from '@constants/auth';

const NAME_PATTERN = /^([A-Z][a-z]{1,11})/;
const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.{10,})/;

export default function signUpSchema() {
  const { t } = useTranslation();

  const tWithDefault = (key: string) => {
    const translation = t(key);
    return translation || '';
  };

  const signUpFirstStepSchema = yup.object().shape({
    firstName: yup
      .string()
      .required(tWithDefault('Error.firstNameRequired'))
      .min(2, tWithDefault('Error.tooShort'))
      .matches(NAME_PATTERN, tWithDefault('Error.nameFormat')),
    lastName: yup
      .string()
      .required(tWithDefault('Error.lastNameRequired'))
      .min(2, tWithDefault('Error.tooShort'))
      .matches(NAME_PATTERN, tWithDefault('Error.nameFormat')),
    email: yup
      .string()
      .email(tWithDefault('Error.invalidEmailFormat'))
      .required(tWithDefault('Error.emailRequired')),
    password: yup
      .string()
      .required(tWithDefault('Error.enterPassword'))
      .matches(
        PASSWORD_PATTERN,
        `${tWithDefault(
          'Error.mustContain',
        )} ${PASSWORD_REQUIRED_LENGTH} ${tWithDefault(
          'Error.charactersUppercaseLowercase',
        )}`,
      ),
    confirmPassword: yup
      .string()
      .required(tWithDefault('Error.confirmPasswordRequired'))
      .oneOf(
        [yup.ref('password')],
        tWithDefault('Error.passwordsDoesNotMatch'),
      ),
  });

  const signUpSecondStepSchema = yup.object().shape({
    phoneNumber: yup
      .string()
      .required(tWithDefault('Error.phoneNumberRequired'))
      .min(6, tWithDefault('Error.tooShort')),
    address: yup.string().required(tWithDefault('Error.fieldRequired')),
    city: yup.string().required(tWithDefault('Error.fieldRequired')),
    country: yup.string().required(tWithDefault('Error.fieldRequired')),
    gender: yup.string().required(tWithDefault('Error.fieldRequired')),
    specialization: yup.string().required(tWithDefault('Error.fieldRequired')),
    role: yup.string().required(tWithDefault('Error.fieldRequired')),
    timeZone: yup.string().required(tWithDefault('Error.fieldRequired')),
  });

  const resetPasswordSchema = yup.object().shape({
    password: yup
      .string()
      .required(tWithDefault('Error.enterPassword'))
      .matches(
        PASSWORD_PATTERN,
        `${tWithDefault(
          'Error.mustContain',
        )} ${PASSWORD_REQUIRED_LENGTH} ${tWithDefault(
          'Error.charactersUppercaseLowercase',
        )}`,
      ),
    confirmPassword: yup
      .string()
      .required(tWithDefault('Error.confirmPasswordRequired'))
      .oneOf(
        [yup.ref('password')],
        tWithDefault('Error.passwordsDoesNotMatch'),
      ),
  });

  const forgotPasswordSchema = yup.object().shape({
    email: yup
      .string()
      .email(tWithDefault('Error.invalidEmailFormat'))
      .required(tWithDefault('Error.emailRequired')),
  });

  const LoginSchema = yup.object().shape({
    email: yup
      .string()
      .email(tWithDefault('Error.invalidEmailFormat'))
      .required(tWithDefault('Error.emailRequired')),
    password: yup
      .string()
      .required(tWithDefault('Error.enterPassword'))
      .matches(
        PASSWORD_PATTERN,
        `${tWithDefault(
          'Error.mustContain',
        )} ${PASSWORD_REQUIRED_LENGTH} ${tWithDefault(
          'Error.charactersUppercaseLowercase',
        )}`,
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
