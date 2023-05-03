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
      <ErrorNumber>404</ErrorNumber>
      <ErrorText>Page not found </ErrorText>
      <p>This page you are looking for doesn’t exist or an other occurred.</p>
      <BackToDashLink to={PATH.DASHBOARD}>
        <ArrowLeft />
        {t('Dashboard.backToDashboard')}
      </BackToDashLink>
    </Wrapper>
  );
};

export default NotFound;
