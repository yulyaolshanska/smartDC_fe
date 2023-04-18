import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useTranslation } from 'react-i18next';
import {
  AuthGoogleContainer,
  GoogleImg,
  GoogleText,
} from '@components/Auth/styles';
import google from '@assets/auth/google.svg';
import getGoogleOauthURL from 'utils/functions/getGoogleOauthURL';

function AuthGoogleButton() {
  const { t } = useTranslation();
  // const login = useGoogleLogin({});

  // const handleLogin = () => {
  //   login();
  // };

  return (
    <AuthGoogleContainer href={getGoogleOauthURL()}>
      <GoogleImg src={google} />
      <GoogleText>{t('Auth.continueWithGoogle')}</GoogleText>
    </AuthGoogleContainer>
  );
}

export default AuthGoogleButton;
