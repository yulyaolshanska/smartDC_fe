import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  CancelButton,
  FormContainer,
  SendButton,
  ButtonContainer,
} from '@components/general/styles';
import { Form, InputInlineContainer, Text } from '@components/Patient/styles';
import { FormValues, IPatient } from '@components/general/type';
import { patientSchema } from '@validation/patient.validate';
import { PATH } from '@router/index';
import InputName from '@components/Patient/Inputs/InputName';
import InputPhoneNumberEmail from '@components/Patient/Inputs/InputPhoneNumberEmail';
import InputGenderBirthDate from '@components/Patient/Inputs/InputGenderBirthDate';
import InputAddressTimeZone from '@components/Patient/Inputs/InputAddressTimeZone';
import InputCountryCity from '@components/Patient/Inputs/InputCountryCity';
import InputOverview from '@components/Patient/Inputs/InputOverview';
import { error, plus } from '@constants/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@redux/store';
import { createPatientQuery } from '@redux/slices/patient/createPatient';
import { patientApi } from 'services/PatientService';

function CreatePatientCardForm() {
  const { t } = useTranslation();

  const { createPatientCardSchema } = patientSchema();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
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

  const [createPatient] = patientApi.useCreatePatientMutation();

  const onSubmit = async (data: IPatient) => {
    data.phoneNumber = plus + data.phoneNumber;
    await createPatient(data).then((res) => {
      if (error in res && res.error) {
        toast.error(`Sorry, something was wrong!`, {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        navigate(PATH.DASHBOARD);
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
