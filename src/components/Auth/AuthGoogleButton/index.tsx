import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  AuthGoogleContainer,
  GoogleImg,
  GoogleText,
} from '@components/general/styles';
import google from '@assets/auth/google.svg';
import getGoogleOauthURL from 'utils/functions/getGoogleOauthURL';

function AuthGoogleButton() {
  const { t } = useTranslation();

  return (
    <AuthGoogleContainer href={getGoogleOauthURL()}>
      <GoogleImg src={google} />
      <GoogleText>{t('Auth.continueWithGoogle')}</GoogleText>
    </AuthGoogleContainer>
  );
}

export default AuthGoogleButton;
