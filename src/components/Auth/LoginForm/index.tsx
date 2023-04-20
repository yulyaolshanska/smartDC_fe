import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IconButton, InputAdornment } from '@mui/material';
import Input from '@components/Input';
import {
  Container,
  FormContainer,
  InputContainer,
  InputTitle,
  LinkContainer,
  Link,
  SendButton,
  Text,
  Title,
  Form,
  PasswordImg,
  AuthForgotPasswordContainer,
} from '@components/general/styles';
import { FormValues, ISignUp } from '@components/general/type';
import GoogleLoginButton from '@components/Auth/LoginForm/GoogleLogin';
import visible from '@assets/auth/eye.svg';
import visibleOff from '@assets/auth/eyeSlash.svg';
import { email, end, error, password } from '@constants/auth';
import { signUpSchema } from '@validation/auth.validate';
import { PATH } from '@router/index';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { loginQuery } from '@redux/slices/auth/login';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { AppDispatch } from '@redux/store';

function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const { LoginSchema } = signUpSchema();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<FormValues>({
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

  const onSubmit = (data: ISignUp) => {
    dispatch(loginQuery(data)).then((res) => {
      if (error in res && res.error) {
        toast.error(
          'Sorry, something was wrong! Check your email and password!',
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
      } else {
        navigate(PATH.DASHBOARD);
      }
    });
  };

  return (
    <Container>
      <FormContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Title>{t('Auth.loginTitle')}</Title>
          <Text>{t('Auth.loginText')}</Text>
          <InputContainer>
            <InputTitle>{t('Auth.email')}</InputTitle>
            <Input
              control={control}
              fullWidth
              name={email}
              placeholder={t('Auth.enterEmail') ?? ''}
              helperText={errors.email?.message}
              error={Boolean(errors?.email)}
              required={true}
            />
          </InputContainer>
          <InputContainer>
            <InputTitle>{t('Auth.passwordLogin')}</InputTitle>
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
          </InputContainer>
          <AuthForgotPasswordContainer>
            <Link to={PATH.FORGOT_PASS}>{t('Auth.forgotPasswordLink')}</Link>
          </AuthForgotPasswordContainer>
          <GoogleLoginButton />
          <SendButton
            disabled={!isValid}
            type="submit"
            value={t('Auth.continue') ?? ''}
          />
          <LinkContainer>
            {t('Auth.haventAnAccount')}
            <Link to={PATH.SIGN_UP}>{t('Auth.click')}</Link>
          </LinkContainer>
        </Form>
      </FormContainer>
      <ToastContainer />
    </Container>
  );
}

export default LoginForm;
