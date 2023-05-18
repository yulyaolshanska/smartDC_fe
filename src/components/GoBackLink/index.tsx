import React from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { ArrowBack } from '@components/general/styles';
import { GoBack, LinkContainer } from '@components/GoBackLink/styles';

function GoBackLink() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <LinkContainer>
      <GoBack onClick={() => navigate(-1)}>
        <ArrowBack />
        {t('Dashboard.goBack')}
      </GoBack>
    </LinkContainer>
  );
}
export default GoBackLink;
