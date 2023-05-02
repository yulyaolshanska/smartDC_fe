import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  CancelButton,
  FormContainer,
  SendButton,
  ButtonContainer,
} from '@components/general/styles';
import { Form, InputInlineContainer, Text } from '@components/Patient/styles';
import { FormValues, IAuth } from '@components/general/type';
import patientSchema from '@validation/patient.validate';
import { PATH } from '@router/index';
import InputName from '@components/Patient/Inputs/InputName';
import InputPhoneNumberEmail from '@components/Patient/Inputs/InputPhoneNumberEmail';
import InputGenderBirthDate from '@components/Patient/Inputs/InputGenderBirthDate';
import InputAddressTimeZone from '@components/Patient/Inputs/InputAddressTimeZone';
import InputOverview from '@components/Patient/Inputs/InputOverview';
import InputCountryCity from '@components/Patient/Inputs/InputCountryCity';

const EditPatientCardForm: React.FC = () => {
  const { t } = useTranslation();
  const { editPatientCardSchema } = patientSchema();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      gender: '',
      birthDate: '',
      country: '',
      city: '',
      address: '',
      timeZone: '',
      role: '',
    },

    resolver: yupResolver(editPatientCardSchema),
  });

  const onSubmit = (data: IAuth) => data;

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Text>{t('Patient.editPatientCard')}</Text>
        <InputInlineContainer>
          <InputName control={control} errors={errors} />
        </InputInlineContainer>
        <InputInlineContainer>
          <InputPhoneNumberEmail control={control} errors={errors} />
        </InputInlineContainer>
        <InputInlineContainer>
          <InputGenderBirthDate control={control} errors={errors} />
        </InputInlineContainer>
        <InputInlineContainer>
          <InputCountryCity control={control} errors={errors} />
        </InputInlineContainer>
        <InputInlineContainer>
          <InputAddressTimeZone control={control} errors={errors} />
        </InputInlineContainer>
        <InputOverview control={control} errors={errors} />
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
};

export default EditPatientCardForm;
