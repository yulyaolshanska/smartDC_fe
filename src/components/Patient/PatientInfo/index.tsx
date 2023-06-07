import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { ReactComponent as CallIcon } from '@assets/patients/call.svg';
import { ReactComponent as EmailIcon } from '@assets/patients/email.svg';
import { ReactComponent as PinIcon } from '@assets/patients/pin.svg';
import { ReactComponent as GenderMaleIcon } from '@assets/patients/genderMale.svg';
import { ReactComponent as GenderFemaleIcon } from '@assets/patients/genderFemale.svg';
import { ReactComponent as CalendarIcon } from '@assets/patients/сalendar.svg';
import {
  BookAppointmentButton,
  ButtonContainer,
  ContactInfo,
  ContactsContainer,
  InfoContainer,
  LastAppointment,
  LastAppointmentTitle,
  Overview,
  OverviewTitle,
  PatientCardInfoContainer,
  PatientInfoName,
  ShowMoreLessButton,
  UserInfo,
} from '@components/Patient/styles';
import { patientApi } from 'services/PatientService';
import {
  female,
  male,
  unknownAge,
  unknownCity,
  unknownCountry,
  unknownGender,
  years,
} from '@constants/patient';
import Spinner from '@components/Loaders/Spinner';
import { useAppSelector } from '@redux/hooks';
import { local } from '@constants/other';

function PatientCardInfo() {
  const { t } = useTranslation();
  const [showMore, setShowMore] = useState<boolean>(false);

  const doctorData = useAppSelector((state) => state.doctorReducer);

  const { id } = useParams();

  const {
    data: patient,
    isLoading,
    refetch: patientRefetch,
  } = patientApi.useGetPatientByIdQuery(Number(id));

  const userAge: string = patient?.birthDate
    ? `${
        new Date().getFullYear() - new Date(patient.birthDate).getFullYear()
      } ${years}`
    : unknownAge;

  const userCity: string = patient?.city ? patient.city : unknownCity;

  const userCountry: string = patient?.country
    ? patient.country
    : unknownCountry;

  const patientFullName = `${patient?.firstName} ${patient?.lastName}`;
  const patientCityCountry = `${userCity}, ${userCountry}`;
  const patientAge = `${userAge}`;
  const patientOverview = patient?.overview
    ? patient.overview
    : t('Patient.noOverviewYet');

  const showLastAppointment = () => {
    const lastAppointment = patient.notes[0]?.note;

    if (lastAppointment) {
      return showMore
        ? lastAppointment
        : `${lastAppointment?.substring(0, 250)}...`;
    }
    return t('Appointments.noAppointmentsYet');
  };

  useEffect(() => {
    patientRefetch();
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <PatientCardInfoContainer>
            <PatientInfoName>{patientFullName}</PatientInfoName>
            <ContactsContainer>
              <CallIcon />
              <ContactInfo>{patient?.phoneNumber}</ContactInfo>
              <EmailIcon />
              <ContactInfo>{patient?.email}</ContactInfo>
            </ContactsContainer>
            <InfoContainer>
              {patient?.gender === male && <GenderMaleIcon />}
              {patient?.gender === female && <GenderFemaleIcon />}
              <UserInfo>{patient?.gender || unknownGender}</UserInfo>
              <CalendarIcon />
              <UserInfo>{patientAge}</UserInfo>
              <PinIcon />
              <UserInfo>{patientCityCountry}</UserInfo>
            </InfoContainer>
            <Overview>
              <OverviewTitle>{t('Patient.overview')}:</OverviewTitle>
              {patientOverview}
            </Overview>
            <LastAppointment>
              <LastAppointmentTitle>
                {t('Patient.lastAppointment')}
              </LastAppointmentTitle>
              {showLastAppointment()}
            </LastAppointment>
            {patient.notes[0]?.note && (
              <ShowMoreLessButton onClick={() => setShowMore(!showMore)}>
                {showMore ? t('Profile.showLess') : t('Profile.showMore')}
              </ShowMoreLessButton>
            )}
          </PatientCardInfoContainer>
          {doctorData.role === local && (
            <ButtonContainer>
              <BookAppointmentButton to={`/book-appointment/${patient.id}`}>
                {t('BookAppointment.button')}
              </BookAppointmentButton>
            </ButtonContainer>
          )}
        </>
      )}
    </>
  );
}

export default PatientCardInfo;
