import React from 'react';
import { InputContainer, InputTitle } from '@components/general/styles';
import Input from '@components/Input';
import { birthDate, date, gender } from '@constants/patient';
import { useTranslation } from 'react-i18next';
import { InputProps } from '@components/Patient/Inputs/type';
import SelectInput from '@components/Select';
import { genders } from '@constants/mockData';

function InputGenderBirthDate({ control, errors }: InputProps) {
  const { t } = useTranslation();

  return (
    <>
      <InputContainer>
        <InputTitle>{t('Patient.gender')}</InputTitle>
        <SelectInput
          control={control}
          fullWidth
          name={gender}
          placeholder={t('Patient.enterGender') ?? ''}
          helperText={errors.gender?.message}
          error={Boolean(errors?.gender)}
          options={genders}
          required={true}
        />
      </InputContainer>
      <InputContainer>
        <InputTitle>{t('Patient.birthDate')}</InputTitle>
        <Input
          control={control}
          fullWidth
          name={birthDate}
          type={date}
          placeholder={t('Patient.enterDateOfBirth') ?? ''}
          helperText={errors.birthDate?.message}
          error={Boolean(errors?.birthDate)}
          required={true}
        />
      </InputContainer>
    </>
  );
}

export default InputGenderBirthDate;
