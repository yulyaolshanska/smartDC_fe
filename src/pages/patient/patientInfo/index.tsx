import React from 'react';
import { ArrowBack, Link } from '@components/general/styles';
import { PATH } from '@router/index';
import { useTranslation } from 'react-i18next';
import { LinkContainer } from '@components/Patient/styles';
import PatientCardInfo from '@components/Patient/PatientInfo';

const PatientInfo = () => {
  const { t } = useTranslation();

  return (
    <>
      <LinkContainer>
        <Link to={PATH.DASHBOARD}>
          <ArrowBack />
          {t('Dashboard.backToDashboard')}
        </Link>
      </LinkContainer>
      <PatientCardInfo />
    </>
  );
};

export default PatientInfo;
