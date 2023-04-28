import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
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
import { useNavigate } from 'react-router-dom';
import InputName from '@components/Patient/Inputs/InputName';
import InputPhoneNumberEmail from '@components/Patient/Inputs/InputPhoneNumberEmail';
import InputGenderBirthDate from '@components/Patient/Inputs/InputGenderBirthDate';
import InputAddressTimeZone from '@components/Patient/Inputs/InputAddressTimeZone';
import InputOverview from '@components/Patient/Inputs/InputOverview';
import InputCountryCity from '@components/Patient/Inputs/InputCountryCity';
import { patientApi } from 'services/PatientService';
import { error, plus } from '@constants/auth';

const EditPatientCardForm: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { editPatientCardSchema } = patientSchema();

  //   hardcoded values Patient (i need props from patientprofile)

  const patCard = {
    firstName: 'John',
    lastName: 'Nedoe',
    phoneNumber: '+380992598283',
    email: 'john_nedoe@gmail.com',
    gender: 'Male',
    birthDate: '2000-10-10',
    country: 'DE',
    city: 'Berlin',
    address: 'Berger Str. 22',
    timeZone: '(GMT+2) Europe/Berlin',
    overview: 'Some issue',
    id: '17',
  };

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      firstName: patCard.firstName,
      lastName: patCard.lastName,
      phoneNumber: patCard.phoneNumber,
      email: patCard.email,
      gender: patCard.gender,
      birthDate: patCard.birthDate,
      country: patCard.country,
      city: patCard.city,
      address: patCard.address,
      timeZone: patCard.timeZone,
      overview: patCard.overview,
    },

    resolver: yupResolver(editPatientCardSchema),
  });

  const [editPatient] = patientApi.useCreatePatientMutation();

  const onSubmit = async (data: IPatient) => {
    data.phoneNumber = plus + data.phoneNumber;

    await editPatient(data, patCard.id).then((res) => {
      if (error in res && res.error) {
        toast.error(t('Patient.somethingWasWrong'), {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        navigate(PATH.DASHBOARD);
      }
    });
  };

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
