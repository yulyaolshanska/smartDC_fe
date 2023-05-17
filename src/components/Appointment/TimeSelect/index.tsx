import { useTranslation } from 'react-i18next';
import { Container } from '@mui/material';
import { appointmentTimeRange } from '@constants/other';
import { InputProps } from '@components/Patient/Inputs/type';
import SelectTimeInput from '@components/Appointment/BookAppointmentForm/Selects/SelectTimeInput';

interface Prop {
  avalibleTimeRange: any;
  setFormattedTime: React.Dispatch<React.SetStateAction<string>>;
}

function AppointmentTimeSelectInput({
  control,
  errors,
  avalibleTimeRange,
  setFormattedTime,
}: InputProps & Prop) {
  const { t } = useTranslation();

  return (
    <Container style={{ padding: '0' }}>
      <SelectTimeInput
        control={control}
        fullWidth
        name={appointmentTimeRange}
        placeholder={t('BookAppointment.SelectAppointmentTime') ?? ''}
        helperText={errors.appointmentTimeRange?.message}
        error={Boolean(errors?.appointmentTimeRange)}
        options={avalibleTimeRange}
        required={true}
        setFormattedTime={setFormattedTime}
      />
    </Container>
  );
}

export default AppointmentTimeSelectInput;
