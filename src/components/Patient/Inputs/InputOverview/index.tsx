import React from 'react';
import { InputContainer, InputTitle } from '@components/general/styles';
import Input from '@components/Input';
import { overview } from '@constants/patient';
import { useTranslation } from 'react-i18next';
import { InputProps } from '@components/Patient/Inputs/type';

function InputOverview({ control, errors }: InputProps) {
  const { t } = useTranslation();

  return (
    <InputContainer>
      <InputTitle>{t('Patient.overview')}</InputTitle>
      <Input
        control={control}
        fullWidth
        name={overview}
        placeholder={t('Patient.enterOverview') ?? ''}
        helperText={errors.overview?.message}
        error={Boolean(errors?.overview)}
      />
    </InputContainer>
  );
}

export default InputOverview;
