import { useTranslation } from 'react-i18next';
import { Container } from '@mui/material';
import { specialization } from '@constants/other';
import { InputProps } from '@components/Patient/Inputs/type';
import SelectSpecInput from '@components/Appointment/BookAppointmentForm/Selects/SelectSpecInput';
import { specializations } from '@constants/mockData';

interface Prop {
  setSpecialization: React.Dispatch<React.SetStateAction<number>>;
}

function SpecializationSelectInput({
  control,
  errors,
  setSpecialization,
}: InputProps & Prop) {
  const { t } = useTranslation();

  return (
    <Container style={{ padding: '0' }}>
      <SelectSpecInput
        control={control}
        fullWidth
        name={specialization}
        placeholder={t('BookAppointment.selectDoctorSpecialization') ?? ''}
        helperText={errors.specialization?.message}
        error={Boolean(errors?.specialization)}
        options={specializations.filter((spec) => spec.value !== 0)}
        required={true}
        setSpecialization={setSpecialization}
      />
    </Container>
  );
}

export default SpecializationSelectInput;
