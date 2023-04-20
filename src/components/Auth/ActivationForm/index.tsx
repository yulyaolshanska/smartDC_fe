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
import { useDispatch } from 'react-redux';
import { activationAccountQuery } from '@redux/slices/auth/activation';
import { AppDispatch } from '@redux/store';
import { useParams } from 'react-router';
import { error } from '@constants/auth';
import { toast } from 'react-toastify';
import { PATH } from '@router/index';

function ActivationForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { link } = useParams();

  useEffect(() => {
    if (link) {
      dispatch(activationAccountQuery({ link })).then((res) => {
        if (error in res && res.error) {
          toast.error('Sorry, something was wrong!', {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
    }
  }, [dispatch]);

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
