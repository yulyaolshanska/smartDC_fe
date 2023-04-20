import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IconButton, InputAdornment } from '@mui/material';
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
  PasswordImg,
  AuthForgotPasswordContainer,
} from '@components/Auth/styles';
import { IResponse, ISignUp } from '@components/Auth/type';
import visible from '@assets/auth/eye.svg';
import visibleOff from '@assets/auth/eyeSlash.svg';
import { email, end, password } from '@constants/auth';
import signUpSchema from '@validation/auth.validate';
import { PATH } from '@router/index';
import GoogleLoginButton from './GoogleLogin';
import { AuthLoginDto } from 'api/auth/auth.api';
import { toast } from 'react-toastify';
import { loginQuery } from '@redux/slices/login';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import cookie from 'utils/functions/cookies';
import { doctorActions } from '@redux/slices/DoctorSlice';

function LoginForm() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const doctorData = useAppSelector((state) => state.doctorReducer);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const { LoginSchema } = signUpSchema();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<ISignUp>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },

    resolver: yupResolver(LoginSchema),
  });
  useEffect(() => {
    register('password');
  }, []);

  const onSubmit = (data: AuthLoginDto) => {
    //@ts-ignore
    dispatch(loginQuery(data)).then((res) => {
      if (!res.error) {
        const token = res.payload.token;
        const doctor = res.payload.userInfo;
        dispatch(doctorActions.getDoctor(doctor));
        cookie.set(
          'accessToken',
          token,
          import.meta.env.VITE_REACT_APP_ACCESS_TOKEN_MAXAGE
        );

        navigate('/dashboard');
      } else {
        toast.error('Sorry, something was wrong!', {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    });
  };

  return (
    <AuthContainer>
      <AuthForm>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <AuthTitle>{t('Auth.loginTitle')}</AuthTitle>
          <AuthText>{t('Auth.loginText')}</AuthText>
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
          <AuthInput>
            <AuthInputTitle>{t('Auth.passwordLogin')}</AuthInputTitle>
            <Input
              control={control}
              fullWidth
              name={password}
              type={showPassword ? 'text' : 'password'}
              placeholder={t('Auth.enterPassword') ?? ''}
              helperText={errors.password?.message}
              error={Boolean(errors?.password)}
              required={true}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleClickShowPassword}>
                    <InputAdornment position={end}>
                      {
                        <PasswordImg
                          src={showPassword ? visible : visibleOff}
                        />
                      }
                    </InputAdornment>
                  </IconButton>
                ),
              }}
            />
          </AuthInput>
          <AuthForgotPasswordContainer>
            <AuthLink to={PATH.FORGOT_PASS}>
              {t('Auth.forgotPasswordLink')}
            </AuthLink>
          </AuthForgotPasswordContainer>
          <GoogleLoginButton />

          <AuthSendButton
            disabled={!isValid}
            type="submit"
            value={t('Auth.continue') ?? ''}
          />

          <AuthLinkContainer>
            {t('Auth.haventAnAccount')}
            <AuthLink to={PATH.SIGN_UP_FIRST_STEP}>{t('Auth.click')}</AuthLink>
          </AuthLinkContainer>
        </Form>
      </AuthForm>
    </AuthContainer>
  );
}

export default LoginForm;
