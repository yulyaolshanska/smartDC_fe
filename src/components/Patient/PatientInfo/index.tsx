import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { ReactComponent as CallIcon } from '@assets/patients/call.svg';
import { ReactComponent as EmailIcon } from '@assets/patients/email.svg';
import { ReactComponent as PinIcon } from '@assets/patients/pin.svg';
import { ReactComponent as GenderMaleIcon } from '@assets/patients/genderMale.svg';
import { ReactComponent as GenderFemaleIcon } from '@assets/patients/genderFemale.svg';
import { ReactComponent as CalendarIcon } from '@assets/patients/сalendar.svg';
import {
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
import { lastAppointmentInfo } from '@constants/mockData';
import { patientApi } from 'services/PatientService';
import { male, years } from '@constants/patient';
import Spinner from '@components/Loaders/Spinner';

function PatientCardInfo() {
  const { t } = useTranslation();
  const [showMore, setShowMore] = useState<boolean>(false);

  const text = lastAppointmentInfo;

  const { id } = useParams();

  const { data: patient, isLoading } = patientApi.useGetPatientByIdQuery(
    Number(id)
  );

  const patientFullName = `${patient?.firstName} ${patient?.lastName}`;
  const patientCityCountry = `${patient?.city}, ${patient?.country}`;
  const patientAge = `${
    new Date().getFullYear() - new Date(patient?.birthDate).getFullYear()
  } ${years}`;

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <PatientCardInfoContainer>
          <PatientInfoName>{patientFullName}</PatientInfoName>
          <ContactsContainer>
            <CallIcon />
            <ContactInfo>{patient?.phoneNumber}</ContactInfo>
            <EmailIcon />
            <ContactInfo>{patient?.email}</ContactInfo>
          </ContactsContainer>
          <InfoContainer>
            {patient?.gender === male ? (
              <GenderMaleIcon />
            ) : (
              <GenderFemaleIcon />
            )}
            <UserInfo>{patient?.gender}</UserInfo>
            <CalendarIcon />
            <UserInfo>{patientAge}</UserInfo>
            <PinIcon />
            <UserInfo>{patientCityCountry}</UserInfo>
          </InfoContainer>
          <Overview>
            <OverviewTitle>{t('Patient.overview')}:</OverviewTitle>
            {patient?.overview}
          </Overview>
          <LastAppointment>
            <LastAppointmentTitle>
              {t('Patient.lastAppointment')}
            </LastAppointmentTitle>
            {showMore ? text : `${text.substring(0, 250)}...`}
          </LastAppointment>
          <ShowMoreLessButton onClick={() => setShowMore(!showMore)}>
            {showMore ? t('Profile.showLess') : t('Profile.showMore')}
          </ShowMoreLessButton>
        </PatientCardInfoContainer>
      )}
    </>
  );
}

export default PatientCardInfo;
