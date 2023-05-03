import { InputContainer } from '@components/general/styles';
// import Input from '@components/Input';
import { specialization } from '@constants/other';
import { useTranslation } from 'react-i18next';
import { InputProps } from '@components/Patient/Inputs/type';
import SelectInput from '@components/Select';
import { specializations } from '@constants/mockData';

function SpecializationSelectInput({ control, errors }: InputProps) {
  const { t } = useTranslation();
  return (
   
      <SelectInput
        control={control}
        fullWidth
        name={specialization}
        placeholder={t('BookAppointment.selectDoctorSpecialization') ?? ''}
        helperText={errors.specialization?.message}
        error={Boolean(errors?.specialization)}
        options={specializations}
        required={true}
      />
  
  );
}

export default SpecializationSelectInput;
