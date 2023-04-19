import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '@components/Input';
import {
  AuthContainer,
  AuthForm,
  AuthInput,
  AuthInputTitle,
  AuthLinkContainer,
  AuthLink,
  AuthSendButton,
  AuthText,
  AuthTitle,
  Form,
  AuthArrowBack,
} from '@components/Auth/styles';
import { ISignUp } from '@components/Auth/type';
import { email, error } from '@constants/auth';
import { signUpSchema } from '@validation/auth.validate';
import { PATH } from '@router/index';
import { forgotPasswordQuery } from '@redux/slices/auth/forgotPassword';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@redux/store';

function ForgotPasswordForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { forgotPasswordSchema } = signUpSchema();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<ISignUp>({
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: ISignUp) => {
    dispatch(forgotPasswordQuery(data)).then((res) => {
      if (error in res && res.error) {
        toast.error(`Doctor with email ${data.email} not found!`, {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        navigate(PATH.CONFIRM);
      }
    });
  };

  return (
    <AuthContainer>
      <AuthForm>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <AuthTitle>{t('Auth.forgotPasswordTitle')}</AuthTitle>
          <AuthText>{t('Auth.forgotPasswordText')}</AuthText>
          <AuthInput>
            <AuthInputTitle>{t('Auth.email')}</AuthInputTitle>
            <Input
              control={control}
              fullWidth
              name={email}
              placeholder={t('Auth.enterEmail') ?? ''}
              helperText={errors.email?.message}
              error={Boolean(errors?.email)}
              required={true}
            />
          </AuthInput>
          <AuthSendButton
            disabled={!isValid}
            type="submit"
            value={t('Auth.submit') ?? ''}
          />
          <AuthLinkContainer>
            <AuthLink to={PATH.LOGIN}>
              <AuthArrowBack />
              {t('Auth.backToLogin')}
            </AuthLink>
          </AuthLinkContainer>
        </Form>
      </AuthForm>
      <ToastContainer />
    </AuthContainer>
  );
}

export default ForgotPasswordForm;
