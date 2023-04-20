import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

const NAME_PATTERN = /^([A-Z][a-z]{1,11})/;

export function patientSchema() {
  const { t } = useTranslation();

  const createPatientCardSchema = yup.object().shape({
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
    email: yup.string().email(t('Error.invalidEmailFormat') ?? ''),
    phoneNumber: yup
      .string()
      .required(t('Error.phoneNumberRequired') ?? '')
      .min(6, t('Error.tooShort') ?? ''),
  });

  return {
    createPatientCardSchema,
  };
}
