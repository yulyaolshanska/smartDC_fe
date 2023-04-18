import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { AuthGoogleContainer, GoogleImg, GoogleText } from '../styles';
import { useTranslation } from 'react-i18next';
import google from '@assets/auth/google.svg';
import getGoogleOauthURL from 'utils/functions/getGoogleOauthURL';

function GoogleLoginButton() {
  const { t } = useTranslation();

  return (
    <AuthGoogleContainer href={getGoogleOauthURL()}>
      <GoogleImg src={google} />
      <GoogleText>{t('Auth.continueWithGoogle')}</GoogleText>
    </AuthGoogleContainer>
  );
}

export default GoogleLoginButton;
