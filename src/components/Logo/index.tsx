import React from 'react';
import { useTranslation } from 'react-i18next';
import { LogoContainer, LogoImg, LogoTitle } from '@components/Logo/styles';
import logo from '@assets/logo.svg';

function Logo() {
  const { t } = useTranslation();

  return (
    <LogoContainer>
      <LogoImg src={logo} />
      <LogoTitle>{t('Logo.title')}</LogoTitle>
    </LogoContainer>
  );
}
export default Logo;
