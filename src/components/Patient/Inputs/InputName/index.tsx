import React from 'react';
import { InputContainer, InputTitle } from '@components/general/styles';
import Input from '@components/Input';
import { firstName, lastName } from '@constants/patient';
import { useTranslation } from 'react-i18next';
import { InputProps } from '@components/Patient/Inputs/type';

function InputName({ control, errors }: InputProps) {
  const { t } = useTranslation();

  return (
    <>
      <InputContainer>
        <InputTitle>{t('Patient.firstName')}</InputTitle>
        <Input
          control={control}
          fullWidth
          name={firstName}
          placeholder={t('Patient.enterFirstName') ?? ''}
          helperText={errors.firstName?.message}
          error={Boolean(errors?.firstName)}
          required={true}
        />
      </InputContainer>
      <InputContainer>
        <InputTitle>{t('Patient.lastName')}</InputTitle>
        <Input
          control={control}
          fullWidth
          name={lastName}
          placeholder={t('Patient.enterLastName') ?? ''}
          helperText={errors.lastName?.message}
          error={Boolean(errors?.lastName)}
          required={true}
        />
      </InputContainer>
    </>
  );
}

export default InputName;
