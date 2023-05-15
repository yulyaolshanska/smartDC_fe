import React from 'react';
import Wrapper from '@components/Wrapper';
import EditPatientCardForm from '@components/Patient/EditPatientCardForm';
import BackToDashboard from '@components/BackToDashboardLink';
import { LinkContainer } from '@components/Patient/styles';

const EditPatientCard: React.FC = () => {
  return (
    <>
      <LinkContainer>
        <BackToDashboard />
      </LinkContainer>
      <Wrapper>
        <EditPatientCardForm />
      </Wrapper>
    </>
  );
};

export default EditPatientCard;
