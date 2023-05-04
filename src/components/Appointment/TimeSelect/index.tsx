import { appointmentTimeRange } from '@constants/other';
import { useTranslation } from 'react-i18next';
import { InputProps } from '@components/Patient/Inputs/type';
import SelectInput from '@components/Select';
import { appointmentTime } from '@constants/mockData';

function AppointmentTimeSelectInput({
  control,
  errors,
//   formattedTime
}: InputProps) {
  const { t } = useTranslation();
  return (
    <SelectInput
      control={control}
      fullWidth
      name={appointmentTimeRange}
      placeholder={t('BookAppointment.SelectAppointmentTime') ?? ''}
      helperText={errors.appointmentTimeRange?.message}
      error={Boolean(errors?.appointmentTimeRange)}
      options={appointmentTime}
      required={true}
    //   value={formattedTime}
    />
  );
}

export default AppointmentTimeSelectInput;
