import React from 'react';
import { InputContainer, InputTitle } from '@components/general/styles';
import Input from '@components/Input';
import { city, country } from '@constants/patient';
import { useTranslation } from 'react-i18next';
import { InputProps } from '@components/Patient/Inputs/type';
import SelectInput from '@components/Select';
import { countries } from '@constants/mockData';

function InputCountryCity({ control, errors }: InputProps) {
  const { t } = useTranslation();

  return (
    <>
      <InputContainer>
        <InputTitle>{t('Patient.country')}</InputTitle>
        <SelectInput
          control={control}
          fullWidth
          name={country}
          placeholder={t('Patient.enterCountry') ?? ''}
          helperText={errors.country?.message}
          error={Boolean(errors?.country)}
          options={countries}
          required={true}
        />
      </InputContainer>
      <InputContainer>
        <InputTitle>{t('Patient.city')}</InputTitle>
        <Input
          control={control}
          fullWidth
          name={city}
          placeholder={t('Patient.enterCity') ?? ''}
          helperText={errors.city?.message}
          error={Boolean(errors?.city)}
        />
      </InputContainer>
    </>
  );
}

export default InputCountryCity;
