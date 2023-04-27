import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as CallIcon } from '@assets/patients/call.svg';
import { ReactComponent as EmailIcon } from '@assets/patients/email.svg';
import { ReactComponent as PinIcon } from '@assets/patients/pin.svg';
import { ReactComponent as GenderMaleIcon } from '@assets/patients/genderMale.svg';
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
  UserInfo,
} from '@components/Patient/styles';

function PatientCardInfo() {
  const { t } = useTranslation();

  return (
    <PatientCardInfoContainer>
      <PatientInfoName>Patrick Beverley</PatientInfoName>
      <ContactsContainer>
        <CallIcon />
        <ContactInfo>+380660012300</ContactInfo>
        <EmailIcon />
        <ContactInfo>pat123beverley@gmail.com</ContactInfo>
      </ContactsContainer>
      <InfoContainer>
        <GenderMaleIcon />
        <UserInfo>Male</UserInfo>
        <CalendarIcon />
        <UserInfo>32 years</UserInfo>
        <PinIcon />
        <UserInfo>Leova, Moldova</UserInfo>
      </InfoContainer>
      <Overview>
        <OverviewTitle>{t('Patient.overview')}:</OverviewTitle>
        overview information
      </Overview>
      <LastAppointment>
        <LastAppointmentTitle>
          {t('Patient.lastAppointment')}
        </LastAppointmentTitle>
        The average volume of RBCs, or the space each red blood cell fills, is
        measured through this test. Results outside of the normal range can be a
        sign of anemia or chronic fatigue.
      </LastAppointment>
    </PatientCardInfoContainer>
  );
}

export default PatientCardInfo;
