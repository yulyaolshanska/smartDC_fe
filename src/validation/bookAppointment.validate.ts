import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

export default function appointmentSchema() {
  const { t } = useTranslation();
  const tWithDefault = (key: string) => {
    const translation = t(key);
    return translation || '';
  };

  const createBookAppointmentSchema = yup.object().shape({
    specialization: yup
      .string()
      .required(tWithDefault('Error.Error.fieldRequired')),
    date: yup.date().required(tWithDefault('Error.Error.fieldRequired')),
    appointmentTimeRange: yup
      .string()
      .required(tWithDefault('Error.Error.fieldRequired')),
    // doctor: yup.string().required(tWithDefault('Error.doctor')),
  });

  return {
    createBookAppointmentSchema,
  };
}
