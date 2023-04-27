import React, { useEffect } from 'react';
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
import { useParams } from 'react-router';
import { error } from '@constants/auth';
import { toast } from 'react-toastify';
import { PATH } from '@router/index';
import { authApi } from 'services/AuthService';

function ActivationForm() {
  const { t } = useTranslation();
  const { link } = useParams();

  const [activationAccount] = authApi.useActivationMutation();

  useEffect(() => {
    if (link) {
      activationAccount({ link }).then((res) => {
        if (error in res && res.error) {
          toast.error('Sorry, something was wrong!', {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
    }
  }, [activationAccount]);

  return (
    <Container>
      <FormContainer>
        <Form>
          <AuthConfirmationContainer>
            <AuthConfirmationImg src={checkmark} />
          </AuthConfirmationContainer>
          <Text>{t('Auth.activationText')}</Text>
          <LinkContainer>
            <Link to={PATH.LOGIN}>
              <ArrowBack />
              {t('Auth.goToLogin')}
            </Link>
          </LinkContainer>
        </Form>
      </FormContainer>
    </Container>
  );
}

export default ActivationForm;
