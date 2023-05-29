import React from 'react';
import Wrapper from '@components/Wrapper';
import BookAppointmentForm from '@components/Appointment/BookAppointmentForm';
import PatientCardInfoShort from '@components/Appointment/PatientCardInfoShort';
import BackToDashboard from '@components/BackToDashboardLink';
import { LinkContainer } from '@components/Patient/styles';

const CreateAppointment: React.FC = () => {
    
  return (
    <>
      <LinkContainer>
        <BackToDashboard />
      </LinkContainer>
      <Wrapper>
        <PatientCardInfoShort />
      </Wrapper>
      <Wrapper>
        <BookAppointmentForm />
      </Wrapper>
    </>
  );
};

export default CreateAppointment;
