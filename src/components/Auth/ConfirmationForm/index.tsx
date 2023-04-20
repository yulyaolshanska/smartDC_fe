import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ArrowBack,
  AuthConfirmationContainer,
  AuthConfirmationImg,
  Container,
  FormContainer,
  Link,
  LinkContainer,
  Text,
  Form,
} from '@components/general/styles';
import checkmark from '@assets/auth/checkmark.svg';
import { PATH } from '@router/index';

function ConfirmationForm() {
  const { t } = useTranslation();

  return (
    <Container>
      <FormContainer>
        <Form>
          <AuthConfirmationContainer>
            <AuthConfirmationImg src={checkmark} />
          </AuthConfirmationContainer>
          <Text>{t('Auth.confirmationText')}</Text>
          <LinkContainer>
            <Link to={PATH.LOGIN}>
              <ArrowBack />
              {t('Auth.backToLogin')}
            </Link>
          </LinkContainer>
        </Form>
      </FormContainer>
    </Container>
  );
}

export default ConfirmationForm;
