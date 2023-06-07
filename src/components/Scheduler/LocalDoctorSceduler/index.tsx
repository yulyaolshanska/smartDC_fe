import React from 'react';
import { useTranslation } from 'react-i18next';
import { PATH } from '@router/index';
import { BackToDashLink, Wrapper } from '@pages/notFound/styles';
import { ReactComponent as ArrowLeft } from '@assets/arrowLeft.svg';

export default function LocalDoctorScheduler() {
    const { t } = useTranslation();

    return (
        <Wrapper>
            <p>{t('Calendar.localDoctorAvailability')}</p>
            <BackToDashLink to={PATH.DASHBOARD}>
                <ArrowLeft />
                {t('Dashboard.backToDashboard')}
            </BackToDashLink>
        </Wrapper>
  )
}
