import React, { useEffect } from 'react';
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
    <AuthContainer>
      <AuthForm>
        <Form>
          <AuthConfirmationContainer>
            <AuthConfirmationImg src={checkmark} />
          </AuthConfirmationContainer>
          <AuthText>{t('Auth.activationText')}</AuthText>
          <AuthLinkContainer>
            <AuthLink to={PATH.LOGIN}>
              <AuthArrowBack />
              {t('Auth.goToLogin')}
            </AuthLink>
          </AuthLinkContainer>
        </Form>
      </AuthForm>
    </AuthContainer>
  );
}

export default ActivationForm;
