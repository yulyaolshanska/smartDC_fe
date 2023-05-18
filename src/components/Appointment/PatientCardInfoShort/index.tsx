import { useMemo } from 'react';
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
  PatientCardInfoContainer,
  PatientInfoName,
  UserInfo,
} from '@components/Patient/styles';
import { patientApi } from 'services/PatientService';
import { male, years } from '@constants/patient';
import Spinner from '@components/Loaders/Spinner';

function PatientCardInfo() {
  const { id } = useParams();

  const { data: patient, isLoading } = patientApi.useGetPatientByIdQuery(
    Number(id)
  );

  const patientFullName = useMemo(() => {
    return `${patient?.firstName} ${patient?.lastName}`;
  }, [patient]);

  const patientCityCountry = useMemo(() => {
    return `${patient?.city}, ${patient?.country}`;
  }, [patient]);

  const patientAge = useMemo(() => {
    return `${
      new Date().getFullYear() - new Date(patient?.birthDate).getFullYear()
    } ${years}`;
  }, [patient, years]);

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
        </PatientCardInfoContainer>
      )}
    </>
  );
}

export default PatientCardInfo;
