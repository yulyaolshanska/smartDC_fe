import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import { useParams } from 'react-router';
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
import { error } from '@constants/auth';
import { PATH } from '@router/index';
import { authApi } from 'services/AuthService';

function ActivationForm() {
  const { t } = useTranslation();
  const { link } = useParams();
  const [activationAccount] = authApi.useActivationMutation();
  const [isActiveLink, setIsActiveLink] = useState<boolean>(true);

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
          <AuthConfirmationContainer>
            {isActiveLink ? (
              <>
                <AuthConfirmationImg src={checkmark} />
                <Text>{t('Auth.activationText')}</Text>
              </>
            ) : (
              <>
                <AuthConfirmationImg src={emotionSad} />
                <Text>{t('Auth.activationTextError')}</Text>
              </>
            )}
          </AuthConfirmationContainer>
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
