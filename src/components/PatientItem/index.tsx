import {  useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as CallIcon } from '@assets/patients/call.svg';
import { ReactComponent as EmailIcon } from '@assets/patients/email.svg';
import { ReactComponent as PinIcon } from '@assets/patients/pin.svg';
import { ReactComponent as GenderMaleIcon } from '@assets/patients/genderMale.svg';
import { ReactComponent as GenderFemaleIcon } from '@assets/patients/genderFemale.svg';
import { ReactComponent as CalengarIcon } from '@assets/patients/calendar.svg';

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
import { male, female, unknownCity, unknownCountry, unknownGender, unknownAge, years } from '@constants/patient';
import { getLastAppointment } from 'utils/functions/getLastAppointment';

interface IProps {
  patient: IPatient;
  searchValue: string;
}

function PatientCard({ patient, searchValue }: IProps) {
  const { t } = useTranslation();
  const [show, setShow] = useState<boolean>(false);

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
    id,
  } = patient;

  const patientAge: string = birthDate
  ? `${new Date().getFullYear() - new Date(birthDate).getFullYear()} ${years}`
  : unknownAge;

  const patientFullName = `${firstName} ${lastName}`;

  const patientCity: string = city ? city : unknownCity;

  const patientCountry: string = country ? country : unknownCountry;

  const showLastAppointment =  () => getLastAppointment(patient,show)

  return (
    <PatientItem>
      <CardWrapper
        patientFullName={patientFullName}
        searchValue={searchValue}
        id={id}
      >
        <>
          <ContactsContainer>
            <CallIcon />
            <ContactInfo>{phoneNumber}</ContactInfo>
            <EmailIcon />
            <ContactInfo>{email}</ContactInfo>
          </ContactsContainer>
          <InfoContainer>
            <>
              {gender === male && <GenderMaleIcon />}
              {gender === female && <GenderFemaleIcon />}
              <UserInfo>{gender || unknownGender}</UserInfo>
              <CalengarIcon />
              <UserInfo>
                {patientAge}
              </UserInfo>
              <PinIcon />
              <UserInfo>
                {patientCity}, {patientCountry}
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
            {showLastAppointment()}
          </LastAppointment>
          <ViewLink to={`/patient/${id}`}>
            {t('PatientCard.viewProfile')}
          </ViewLink>
        </>
      </CardWrapper>
    </PatientItem>
  );
}

export default PatientCard;
