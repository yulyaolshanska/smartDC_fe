import { useTranslation } from 'react-i18next';
import { Container } from '@mui/material';
import { appointmentTimeRange } from '@constants/other';
import { InputProps } from '@components/Patient/Inputs/type';
import SelectInput from '@components/Select';
import { appointmentTime } from '@constants/mockData';

import {AppointmentFormValues} from '@components/general/type'

function AppointmentTimeSelectInput({
  control,
  errors,
}: 
(InputProps & AppointmentFormValues)) {
  const { t } = useTranslation();
  return (
    <Container style={{ padding: '0' }}>
      <SelectInput
        control={control}
        fullWidth
        name={appointmentTimeRange}
        placeholder={t('BookAppointment.SelectAppointmentTime') ?? ''}
        helperText={errors.appointmentTimeRange?.message}
        error={Boolean(errors?.appointmentTimeRange)}
        options={appointmentTime}
        required={true}
      />
    </Container>
  );
}

export default AppointmentTimeSelectInput;
