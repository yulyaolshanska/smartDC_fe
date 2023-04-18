import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  AuthArrowBack,
  AuthConfirmationContainer,
  AuthConfirmationImg,
  AuthContainer,
  AuthForm,
  AuthLink,
  AuthLinkContainer,
  AuthText,
  Form,
} from '@components/Auth/styles';
import checkmark from '@assets/auth/checkmark.svg';
import { PATH } from '@router/index';

function ConfirmationForm() {
  const { t } = useTranslation();

  return (
    <AuthContainer>
      <AuthForm>
        <Form>
          <AuthConfirmationContainer>
            <AuthConfirmationImg src={checkmark} />
          </AuthConfirmationContainer>
          <AuthText>{t('Auth.confirmationText')}</AuthText>
          <AuthLinkContainer>
            <AuthLink to={PATH.LOGIN}>
              <AuthArrowBack />
              {t('Auth.backToLogin')}
            </AuthLink>
          </AuthLinkContainer>
        </Form>
      </AuthForm>
    </AuthContainer>
  );
}

export default ConfirmationForm;
