import { t } from 'i18next';
import * as yup from 'yup';

const NAME_PATTERN = /^([A-Z][a-z]{1,11})/;

export const EditRemoteSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('*First name is required')
    .min(2, '*Too short!')
    .matches(
      NAME_PATTERN,
      '*The name must contain English letters with first Uppercase character',
    ),
  lastName: yup
    .string()
    .required('*Last name is required')
    .min(2, '*Too short!')
    .matches(
      NAME_PATTERN,
      '*The name must contain English letters with first Uppercase character',
    ),
  email: yup
    .string()
    .email('*Invalid email format')
    .required('*Email is required'),
  phoneNumber: yup
    .string()
    .required('*Phone number is required')
    .min(6, '*Too short!'),
  city: yup.string().required(t('Error.fieldRequired') ?? ''),
  country: yup.string().required(t('Error.fieldRequired') ?? ''),
  gender: yup.string().required(t('Error.fieldRequired') ?? ''),

  timeZone: yup.string().required(t('Error.fieldRequired') ?? ''),
  address: yup.string().required(t('Error.fieldRequired') ?? ''),
});

export const EditLocalSchema = yup.object().shape({});
