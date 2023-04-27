import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IconButton, InputAdornment } from '@mui/material';
import Input from '@components/Input';
import {
  Container,
  FormContainer,
  GreenText,
  InputContainer,
  InputTitle,
  SendButton,
  Title,
  Form,
  PasswordImg,
} from '@components/general/styles';
import { FormValues, ISignUp } from '@components/general/type';
import visible from '@assets/auth/eye.svg';
import visibleOff from '@assets/auth/eyeSlash.svg';
import { confirmPassword, end, error, password } from '@constants/auth';
import signUpSchema from '@validation/auth.validate';
import { toast, ToastContainer } from 'react-toastify';
import { PATH } from '@router/index';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@redux/store';
import { resetPasswordQuery } from '@redux/slices/auth/resetPassword';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';

function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const { resetPasswordSchema } = signUpSchema();

  const navigate = useNavigate();

  const { token } = useParams();

  const dispatch = useDispatch<AppDispatch>();

  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<FormValues>({
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

  const onSubmit = (data: ISignUp) => {
    if (token) {
      dispatch(
        resetPasswordQuery({
          password: data.password,
          token,
        })
      ).then((res) => {
        if (error in res && res.error) {
          toast.error('Sorry, something was wrong!', {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          navigate(PATH.LOGIN);
        }
      });
    }
  };

  return (
    <Container>
      <FormContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Title>{t('Auth.resetPasswordTitle')}</Title>
          <GreenText>{t('Auth.resetPasswordText')}</GreenText>
          <InputContainer>
            <InputTitle>{t('Auth.createNewPassword')}</InputTitle>
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
          </InputContainer>
          <InputContainer>
            <InputTitle>{t('Auth.confirmNewPassword')}</InputTitle>
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
          </InputContainer>
          <SendButton
            disabled={!isValid}
            type="submit"
            value={t('Auth.save') ?? ''}
          />
        </Form>
      </FormContainer>
      <ToastContainer />
    </Container>
  );
}

export default ResetPasswordForm;
