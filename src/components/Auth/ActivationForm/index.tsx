import React, { useEffect, useState } from 'react';
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
import emotionSad from '@assets/emotionSad.svg';
import { useParams } from 'react-router';
import { error } from '@constants/auth';
import { toast, ToastContainer } from 'react-toastify';
import { PATH } from '@router/index';
import { authApi } from 'services/AuthService';

function ActivationForm() {
  const { t } = useTranslation();
  const { link } = useParams();
  const [activationAccount] = authApi.useActivationMutation();
  const [isActiveLink, setIsActiveLink] = useState(true);

  useEffect(() => {
    if (link) {
      activationAccount({ link }).then((res) => {
        if (error in res && res.error) {
          setIsActiveLink(false);
        }
      });
    }
  }, [activationAccount]);

  return (
    <Container>
      <FormContainer>
        <Form>
          {isActiveLink ? (
            <>
              <AuthConfirmationContainer>
                <AuthConfirmationImg src={checkmark} />
              </AuthConfirmationContainer>
              <Text>{t('Auth.activationText')}</Text>
            </>
          ) : (
            <>
              <AuthConfirmationContainer>
                <AuthConfirmationImg src={emotionSad} />
              </AuthConfirmationContainer>
              <Text>{t('Auth.activationTextError')}</Text>
            </>
          )}
          <LinkContainer>
            <Link to={PATH.LOGIN}>
              <ArrowBack />
              {t('Auth.goToLogin')}
            </Link>
          </LinkContainer>
        </Form>
      </FormContainer>
      <ToastContainer />
    </Container>
  );
}

export default ActivationForm;
