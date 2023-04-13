import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IconButton, InputAdornment } from '@mui/material';
import Input from '@components/Input';
import {
  AuthContainer,
  AuthForm,
  AuthGreenText,
  AuthInput,
  AuthInputTitle,
  AuthSendButton,
  AuthTitle,
  Form,
  PasswordImg,
} from '@components/Auth/styles';
import { ISignUp } from '@components/Auth/type';
import visible from '@assets/auth/eye.svg';
import visibleOff from '@assets/auth/eyeSlash.svg';
import { confirmPassword, end, password } from '@constants/auth';
import { resetPasswordSchema } from '@validation/auth.validate';

function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<ISignUp>({
    mode: 'onChange',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },

    resolver: yupResolver(resetPasswordSchema),
  });

  useEffect(() => {
    register('password');
    register('confirmPassword');
  }, []);

  const onSubmit = (data: ISignUp) => {};

  return (
    <AuthContainer>
      <AuthForm>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <AuthTitle>{t('Auth.resetPasswordTitle')}</AuthTitle>
          <AuthGreenText>{t('Auth.resetPasswordText')}</AuthGreenText>
          <AuthInput>
            <AuthInputTitle>{t('Auth.createNewPassword')}</AuthInputTitle>
            <Input
              control={control}
              fullWidth
              name={password}
              type={showPassword ? 'text' : 'password'}
              placeholder={t('Auth.enterNewPassword') ?? ''}
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
          <AuthInput>
            <AuthInputTitle>{t('Auth.confirmNewPassword')}</AuthInputTitle>
            <Input
              control={control}
              fullWidth
              name={confirmPassword}
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder={t('Auth.enterConfirmNewPassword') ?? ''}
              helperText={errors.confirmPassword?.message}
              error={Boolean(errors?.confirmPassword)}
              required={true}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleClickShowConfirmPassword}>
                    <InputAdornment position={end}>
                      {
                        <PasswordImg
                          src={showConfirmPassword ? visible : visibleOff}
                        />
                      }
                    </InputAdornment>
                  </IconButton>
                ),
              }}
            />
          </AuthInput>
          <AuthSendButton
            disabled={!isValid}
            type="submit"
            value={t('Auth.save') ?? ''}
          />
        </Form>
      </AuthForm>
    </AuthContainer>
  );
}

export default ResetPasswordForm;
