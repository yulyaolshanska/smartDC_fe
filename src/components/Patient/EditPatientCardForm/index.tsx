import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
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
import { useNavigate, useParams } from 'react-router-dom';
import InputName from '@components/Patient/Inputs/InputName';
import InputPhoneNumberEmail from '@components/Patient/Inputs/InputPhoneNumberEmail';
import InputGenderBirthDate from '@components/Patient/Inputs/InputGenderBirthDate';
import InputAddressTimeZone from '@components/Patient/Inputs/InputAddressTimeZone';
import InputOverview from '@components/Patient/Inputs/InputOverview';
import InputCountryCity from '@components/Patient/Inputs/InputCountryCity';
import { patientApi } from 'services/PatientService';
import { plus } from '@constants/auth';

const EditPatientCardForm: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { editPatientCardSchema } = patientSchema();

  const { data: patient, isLoading } = patientApi.useGetPatientByIdQuery(
    Number(id)
  );

  console.log(`patientT`, isLoading);

  // const patientT = {
  //   firstName: 'John',
  //   lastName: 'Nedoe',
  //   phoneNumber: '+380992598283',
  //   email: 'john_nedoe@gmail.com',
  //   gender: 'Male',
  //   birthDate: '2000-10-10',
  //   country: 'DE',
  //   city: 'Berlin',
  //   address: 'Berger Str. 22',
  //   timeZone: '(GMT+2) Europe/Berlin',
  //   overview: 'Some issue',
  //   id: 1,
  // };

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      firstName: patient ? patient.firstName : '',
      lastName: patient ? patient.lastName : '',
      phoneNumber: patient ? patient.phoneNumber : '',
      email: patient ? patient.email : '',
      gender: patient ? patient.gender : '',
      birthDate: patient ? patient.birthDate : '',
      country: patient ? patient.country : '',
      city: patient ? patient.city : '',
      address: patient ? patient.address : '',
      timeZone: patient ? patient.timeZone : '',
      overview: patient ? patient.overview : '',
    },

    resolver: yupResolver(editPatientCardSchema),
  });

  const [updatePatient] = patientApi.useUpdatePatientMutation();

  const onSubmit = async (data: IPatient) => {
    data.phoneNumber = plus + data.phoneNumber.replace(/\D/g, '');
    try {
      const updatedPatientInfo = {
        id: patient.id,
        ...data,
      };
      await updatePatient(updatedPatientInfo);
      console.log(`dataPatient`, data);
      navigate(PATH.DASHBOARD);

      //   toast.success(t('Patient.cardUpdetedSuccess'), {
      //     position: toast.POSITION.TOP_CENTER,
      //   });
      //   setTimeout(() => {
      //     navigate(PATH.DASHBOARD);
      //   }, 2000);
    } catch (error) {
      toast.error(t('Error.somethingWasWrong'), {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
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
  );
};

export default EditPatientCardForm;
