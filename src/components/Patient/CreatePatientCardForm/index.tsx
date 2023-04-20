import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '@components/Input';
import {
  CancelButton,
  FormContainer,
  InputContainer,
  InputTitle,
  SendButton,
  ButtonContainer,
} from '@components/general/styles';
import { Form, InputInlineContainer, Text } from '@components/Patient/styles';
import { FormValues, ISignUp } from '@components/general/type';
import {
  gender,
  address,
  timeZone,
  birthDate,
  city,
  country,
  date,
  phoneNumber,
  firstName,
  lastName,
  email,
  overview,
} from '@constants/patient';
import { genders, countries, timeZones } from '@constants/mockData';
import SelectInput from '@components/Select';
import PhoneInput from '@components/PhoneInput';
import { patientSchema } from '@validation/patient.validate';
import { PATH } from '@router/index';

function CreatePatientCardForm() {
  const { t } = useTranslation();

  const { createPatientCardSchema } = patientSchema();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      role: '',
      gender: '',
      phoneNumber: '',
      city: '',
      country: '',
      address: '',
      birthDate: '',
      timeZone: '',
    },

    resolver: yupResolver(createPatientCardSchema),
  });

  const onSubmit = (data: ISignUp) => {};

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Text>{t('Patient.createPatientCard')}</Text>
        <InputInlineContainer>
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
        </InputInlineContainer>
        <InputInlineContainer>
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
        </InputInlineContainer>
        <InputInlineContainer>
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
        </InputInlineContainer>
        <InputInlineContainer>
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
        </InputInlineContainer>
        <InputInlineContainer>
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
        </InputInlineContainer>
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
        <ButtonContainer>
          <CancelButton to={PATH.DASHBOARD}>
            {t('Patient.cancel') ?? ''}
          </CancelButton>
          <SendButton
            disabled={!isValid}
            type="submit"
            value={t('Patient.save') ?? ''}
          />
        </ButtonContainer>
        <ToastContainer />
      </Form>
    </FormContainer>
  );
}

export default CreatePatientCardForm;
