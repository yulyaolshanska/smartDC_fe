import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

export default function appointmentSchema() {
  const { t } = useTranslation();
  const tWithDefault = (key: string) => {
    const translation = t(key);
    return translation || '';
  };

  const createBookAppointmentSchemaStepOne = yup.object().shape({
    specialization: yup
      .string()
      .required(tWithDefault('Error.fieldRequired')),
    date: yup.date().required(tWithDefault('Error.fieldRequired')),
    appointmentTimeRange: yup
      .string()
      .required(tWithDefault('Error.fieldRequired')),
  });

  const createBookAppointmentSchemaStepTwo = yup.object().shape({
    doctor: yup.string().required(tWithDefault('Error.fieldRequired')),
  });

  return {
    createBookAppointmentSchemaStepOne,
    createBookAppointmentSchemaStepTwo,
  };
}
