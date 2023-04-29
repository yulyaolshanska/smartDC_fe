import React from 'react';
import CreatePatientCardForm from '@components/Patient/CreatePatientCardForm';
import Wrapper from '@components/Wrapper';
import { ArrowBack, Link } from '@components/general/styles';
import { PATH } from '@router/index';
import { useTranslation } from 'react-i18next';
import { LinkContainer } from '@components/Patient/styles';

const CreatePatientCard = () => {
  const { t } = useTranslation();

  return (
    <>
      <LinkContainer>
        <Link to={PATH.DASHBOARD}>
          <ArrowBack />
          {t('Dashboard.backToDashboard')}
        </Link>
      </LinkContainer>
      <Wrapper>
        <CreatePatientCardForm />
      </Wrapper>
    </>
  );
};

export default CreatePatientCard;
