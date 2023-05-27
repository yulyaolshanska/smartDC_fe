import {
  ADDRESS_REGEX,
  EMAIL_PATTERN,
  NAME_PATTERN,
} from '@constants/validation';
import { t } from 'i18next';
import * as yup from 'yup';

const tWithDefault = (key: string) => {
  const translation = t(key);
  return translation || '';
};

export const EditRemoteSchema = yup.object().shape({
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
    .matches(EMAIL_PATTERN, tWithDefault('Error.invalidEmailFormat'))
    .required(tWithDefault('Error.emailRequired')),
  phoneNumber: yup
    .string()
    .required(tWithDefault('Error.phoneNumberRequired'))
    .min(10, tWithDefault('Error.tooShort')),
  city: yup.string().required(tWithDefault('Error.fieldRequired')),
  country: yup.string().required(tWithDefault('Error.fieldRequired')),
  gender: yup.string().required(tWithDefault('Error.fieldRequired')),

  timeZone: yup.string().required(tWithDefault('Error.fieldRequired')),
  address: yup
    .string()
    .required(tWithDefault('Error.fieldRequired'))
    .matches(ADDRESS_REGEX, tWithDefault('Error.addressFormat')),
});

export const EditLocalSchema = yup.object().shape({});
