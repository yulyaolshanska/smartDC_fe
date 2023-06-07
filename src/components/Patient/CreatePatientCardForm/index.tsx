import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  CancelButton,
  SendButton,
  ButtonContainer,
} from '@components/general/styles';
import { Form, InputInlineContainer, Text } from '@components/Patient/styles';
import { FormValues, IPatient } from '@components/general/type';
import patientSchema from '@validation/patient.validate';
import { PATH } from '@router/index';
import InputName from '@components/Patient/Inputs/InputName';
import InputPhoneNumberEmail from '@components/Patient/Inputs/InputPhoneNumberEmail';
import InputGenderBirthDate from '@components/Patient/Inputs/InputGenderBirthDate';
import InputAddressTimeZone from '@components/Patient/Inputs/InputAddressTimeZone';
import InputCountryCity from '@components/Patient/Inputs/InputCountryCity';
import InputOverview from '@components/Patient/Inputs/InputOverview';
import { error, plus } from '@constants/auth';
import { useNavigate } from 'react-router-dom';
import { patientApi } from 'services/PatientService';

function CreatePatientCardForm() {
  const { t } = useTranslation();

  const { createPatientCardSchema } = patientSchema();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
    resolver: yupResolver(createPatientCardSchema),
  });

  const [createPatient] = patientApi.useCreatePatientMutation();

  const onSubmit = async (data: IPatient) => {
    for (const key in data) {
      if (
        typeof data[key] === 'string' &&
        (data[key] as string).trim() === ''
      ) {
        data[key] = null;
      }
    }

    data.phoneNumber = plus + data.phoneNumber.replace(/\D/g, '');
    await createPatient(data).then((res) => {
      if (error in res && res.error) {
        toast.error(t('Error.somethingWasWrong'), {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.success(t('Patient.cardCreatedSuccess'), {
          position: toast.POSITION.TOP_CENTER,
        });
        setTimeout(() => {
          navigate(PATH.PATIENTS_LIST);
        }, 2000);
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Text>{t('Patient.createPatientCard')}</Text>
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
  );
}

export default CreatePatientCardForm;
