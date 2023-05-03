import { useTranslation } from 'react-i18next';
import { ReactComponent as CallIcon } from '@assets/patients/call.svg';
import { ReactComponent as EmailIcon } from '@assets/patients/email.svg';
import { ReactComponent as PinIcon } from '@assets/patients/pin.svg';
import { ReactComponent as GenderMaleIcon } from '@assets/patients/genderMale.svg';
import { ReactComponent as GenderFemaleIcon } from '@assets/patients/genderFemale.svg';
import { ReactComponent as CalengarIcon } from '@assets/patients/calendar.svg';
import { PATH } from '@router/index';

import {
  ContactInfo,
  ContactsContainer,
  InfoContainer,
  LastAppointment,
  LastAppointmentTitle,
  Overview,
  OverviewTitle,
  PatientItem,
  UserInfo,
  ViewLink,
} from './styles';
import CardWrapper from '@components/CardWrapper';

import { IPatient } from '@components/general/type';
import { male } from '@constants/patient';

interface IProps {
  patient: IPatient;
  searchValue: string;
}

function PatientCard({ patient, searchValue }: IProps) {
  const { t } = useTranslation();
  const {
    phoneNumber,
    firstName,
    lastName,
    email,
    gender,
    country,
    city,
    birthDate,
    overview,
  } = patient;
  const patientFullName = `${firstName} ${lastName}`;
  const patientAge: number =
    new Date().getFullYear() - new Date(birthDate).getFullYear();

  return (
    <PatientItem>
      <CardWrapper patientFullName={patientFullName} searchValue={searchValue}>
        <>
          <ContactsContainer>
            <CallIcon />
            <ContactInfo>{phoneNumber}</ContactInfo>
            <EmailIcon />
            <ContactInfo>{email}</ContactInfo>
          </ContactsContainer>
          <InfoContainer>
            <>
              {gender === male ? <GenderMaleIcon /> : <GenderFemaleIcon />}
              <UserInfo>{gender}</UserInfo>
              <CalengarIcon />
              <UserInfo>
                {patientAge} {t('PatientCard.years')}
              </UserInfo>
              <PinIcon />
              <UserInfo>
                {city},{country}
              </UserInfo>
            </>
          </InfoContainer>
          <Overview>
            <OverviewTitle>{t('Patient.overview')}:</OverviewTitle>
            {overview}
          </Overview>
          <LastAppointment>
            <LastAppointmentTitle>
              {t('PatientCard.lastAppointment')}
            </LastAppointmentTitle>
            The average volume of RBCs, or the space each red blood cell fills,
            is measured through this test. Results outside of the normal range
            can be a sign of anemia or chronic fatigue.
          </LastAppointment>
          <ViewLink to={PATH.PATIENT_CARD_INFO}>
            {t('PatientCard.viewProfile')}
          </ViewLink>
        </>
      </CardWrapper>
    </PatientItem>
  );
}

export default PatientCard;
