import React from 'react';
import { InputContainer, InputTitle } from '@components/general/styles';
import Input from '@components/Input';
import { email, phoneNumber } from '@constants/patient';
import { useTranslation } from 'react-i18next';
import { InputProps } from '@components/Patient/Inputs/type';
import PhoneInput from '@components/PhoneInput';

function InputPhoneNumberEmail({ control, errors }: InputProps) {
  const { t } = useTranslation();

  return (
    <>
      <InputContainer>
        <InputTitle>{t('Patient.phoneNumber')}</InputTitle>
        <PhoneInput
          control={control}
          fullWidth
          name={phoneNumber}
          placeholder={t('Patient.defaultPhoneNumber') ?? ''}
          helperText={errors.phoneNumber?.message}
          error={Boolean(errors?.phoneNumber)}
          required={true}
        />
      </InputContainer>
      <InputContainer>
        <InputTitle>{t('Patient.email')}</InputTitle>
        <Input
          control={control}
          fullWidth
          name={email}
          placeholder={t('Patient.enterEmail') ?? ''}
          helperText={errors.email?.message}
          error={Boolean(errors?.email)}
          required={true}
        />
      </InputContainer>
    </>
  );
}

export default InputPhoneNumberEmail;
