import React from 'react';
import CreatePatientCardForm from '@components/Patient/CreatePatientCardForm';
import Wrapper from '@components/Wrapper';
import GoBackLink from '@components/GoBackLink';

const CreatePatientCard = () => {
  return (
    <>
      <GoBackLink />
      <Wrapper>
        <CreatePatientCardForm />
      </Wrapper>
    </>
  );
};

export default CreatePatientCard;
