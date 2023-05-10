import React, { useEffect } from 'react';
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
import Spinner from '@components/Loaders/Spinner';

const EditPatientCardForm: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { editPatientCardSchema } = patientSchema();
  const [updatePatient] = patientApi.useUpdatePatientMutation();

  const { data: patient, isLoading } = patientApi.useGetPatientByIdQuery(
    Number(id)
  );
  useEffect(() => {
    if (patient) {
      reset({
        firstName: patient,
        lastName: patient,
        phoneNumber: patient,
        email: patient,
        gender: patient,
        birthDate: patient,
        country: patient,
        city: patient,
        address: patient,
        timeZone: patient,
        overview: patient,
      });
    }
  }, []);

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: async () => await { ...patient },
    resolver: yupResolver(editPatientCardSchema),
  });


  const onSubmit = async (data: IPatient) => {
    data.phoneNumber = plus + data.phoneNumber.replace(/\D/g, '');
    try {
      const updatedPatientInfo = {
        id: patient.id,
        ...data,
      };
      await updatePatient(updatedPatientInfo);
      console.log(`dataPatient`, data);

      toast.success(t('Patient.cardUpdetedSuccess'), {
        position: toast.POSITION.TOP_CENTER,
      });
      setTimeout(() => {
        navigate(PATH.PATIENTS_LIST);
      }, 2000);
    } catch (error) {
      toast.error(t('Error.somethingWasWrong'), {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
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
      )}
    </>
  );
};

export default EditPatientCardForm;
