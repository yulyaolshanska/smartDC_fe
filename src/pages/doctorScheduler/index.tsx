import React from 'react';
import Scheduler from '@components/Scheduler';
import { ArrowBack, Link } from '@components/general/styles';
import { PATH } from '@router/index';
import { useTranslation } from 'react-i18next';
import { LinkContainer } from './styles';

const DoctorScheduler = () => {
    const { t } = useTranslation();

    return (
        <>
            <LinkContainer>
                <Link to={PATH.DASHBOARD}>
                    <ArrowBack />
                    {t('Dashboard.backToDashboard')}
                </Link>
            </LinkContainer>
            <Scheduler/>
        </>
    );
};

export default DoctorScheduler;