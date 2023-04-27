import { useTranslation } from 'react-i18next';
import { ReactComponent as CallIcon } from '@assets/patients/call.svg';
import { ReactComponent as EmailIcon } from '@assets/patients/email.svg';
import { ReactComponent as PinIcon } from '@assets/patients/pin.svg';
import { ReactComponent as GenderMaleIcon } from '@assets/patients/genderMale.svg';
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

function PatientCard() {
  const { t } = useTranslation();

  return (
    <PatientItem>
      <CardWrapper>
        <ContactsContainer>
          <CallIcon />
          <ContactInfo>+380660012300</ContactInfo>
          <EmailIcon />
          <ContactInfo>pat123beverley@gmail.com</ContactInfo>
        </ContactsContainer>
        <InfoContainer>
          <GenderMaleIcon />
          <UserInfo>Male</UserInfo>
          <CalengarIcon />
          <UserInfo>32 years</UserInfo>
          <PinIcon />
          <UserInfo>Leova, Moldova</UserInfo>
        </InfoContainer>
        <Overview>
          <OverviewTitle>{t('Patient.overview')}:</OverviewTitle>
          Overview information
        </Overview>
        <LastAppointment>
          <LastAppointmentTitle>
            {t('PatientCard.lastAppointment')}
          </LastAppointmentTitle>
          The average volume of RBCs, or the space each red blood cell fills, is
          measured through this test. Results outside of the normal range can be
          a sign of anemia or chronic fatigue.
        </LastAppointment>
        <ViewLink to={PATH.CREATE_PATIENT_CARD}>
          {t('PatientCard.viewProfile')}
        </ViewLink>
      </CardWrapper>
    </PatientItem>
  );
}

export default PatientCard;
