import React from 'react';
import { InputContainer, InputTitle } from '@components/general/styles';
import Input from '@components/Input';
import { address, timeZone } from '@constants/patient';
import { useTranslation } from 'react-i18next';
import { InputProps } from '@components/Patient/Inputs/type';
import SelectInput from '@components/Select';
import { timeZones } from '@constants/mockData';

function InputAddressTimeZone({ control, errors }: InputProps) {
  const { t } = useTranslation();

  return (
    <>
      <InputContainer>
        <InputTitle>{t('Patient.address')}</InputTitle>
        <Input
          control={control}
          fullWidth
          name={address}
          placeholder={t('Patient.enterAddress') ?? ''}
          helperText={errors.address?.message}
          error={Boolean(errors?.address)}
        />
      </InputContainer>
      <InputContainer>
        <InputTitle>{t('Patient.timeZone')}</InputTitle>
        <SelectInput
          control={control}
          fullWidth
          name={timeZone}
          placeholder={t('Patient.enterTimeZone') ?? ''}
          helperText={errors.timeZone?.message}
          error={Boolean(errors?.timeZone)}
          options={timeZones}
          required={true}
        />
      </InputContainer>
    </>
  );
}

export default InputAddressTimeZone;
