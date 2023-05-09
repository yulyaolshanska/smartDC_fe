import React from 'react';
import { PATH } from '@router/index';
import { useTranslation } from 'react-i18next';
import { ReactComponent as ArrowLeft } from '@assets/arrowLeft.svg';
import { ReactComponent as EmotionSad } from '@assets/emotionSad.svg';

import { Wrapper, ErrorNumber, ErrorText, BackToDashLink } from './styles';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <EmotionSad />
      <ErrorNumber>{t('NotFoundPage.404')}</ErrorNumber>
      <ErrorText>{t('NotFoundPage.notFound')}</ErrorText>
      <p>{t('NotFoundPage.doesntExist')}</p>
      <BackToDashLink to={PATH.DASHBOARD}>
        <ArrowLeft />
        {t('Dashboard.backToDashboard')}
      </BackToDashLink>
    </Wrapper>
  );
};

export default NotFound;
