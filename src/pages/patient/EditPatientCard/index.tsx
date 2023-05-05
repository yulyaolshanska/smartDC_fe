import React from 'react';
import Wrapper from '@components/Wrapper';
import { PATH } from '@router/index';
import { useTranslation } from 'react-i18next';
import { LinkContainer } from '@components/Patient/styles';
import EditPatientCardForm from '@components/Patient/EditPatientCardForm';

import { ReactComponent as ArrowLeft } from '@assets/arrowLeft.svg';
import { BackToDashLink } from './styles';

const EditPatientCard: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <LinkContainer>
        <BackToDashLink to={PATH.DASHBOARD}>
          <ArrowLeft />
          {t('Dashboard.backToDashboard')}
        </BackToDashLink>
      </LinkContainer>
      <Wrapper>
        <EditPatientCardForm />
      </Wrapper>
    </>
  );
};

export default EditPatientCard;
