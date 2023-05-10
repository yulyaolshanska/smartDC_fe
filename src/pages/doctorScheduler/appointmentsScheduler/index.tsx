import React from 'react';
import { ArrowBack, Link } from '@components/general/styles';
import { PATH } from '@router/index';
import { useTranslation } from 'react-i18next';
import { LinkContainer } from 'pages/doctorScheduler/styles';
import AppointmentsScheduler from '@components/AppointmentsScheduler';

const AppointmentsDoctorScheduler = () => {
  const { t } = useTranslation();

  return (
    <>
      <LinkContainer>
        <Link to={PATH.DASHBOARD}>
          <ArrowBack />
          {t('Dashboard.backToDashboard')}
        </Link>
      </LinkContainer>
      <AppointmentsScheduler />
    </>
  );
};

export default AppointmentsDoctorScheduler;
