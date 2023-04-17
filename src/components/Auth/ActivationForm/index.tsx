import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  AuthConfirmationContainer,
  AuthConfirmationImg,
  AuthContainer,
  AuthForm,
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
        </Form>
      </AuthForm>
    </AuthContainer>
  );
}

export default ActivationForm;
