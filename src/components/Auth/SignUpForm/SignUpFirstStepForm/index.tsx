import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IconButton, InputAdornment } from '@mui/material';
import { useDispatch } from 'react-redux';
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
} from '@components/general/styles';
import { FormValues, ISignUp } from '@components/general/type';
import visible from '@assets/auth/eye.svg';
import visibleOff from '@assets/auth/eyeSlash.svg';
import {
  confirmPassword,
  email,
  end,
  error,
  firstName,
  lastName,
  password,
} from '@constants/auth';
import { signUpSchema } from '@validation/auth.validate';
import {
  checkEmailQuery,
  setSignUpFirstStepData,
} from '@redux/slices/auth/signUp';
import { PATH } from '@router/index';
import AuthGoogleButton from '@components/Auth/AuthGoogleButton';
import SignUpSecondForm from '@components/Auth/SignUpForm/SignUpSecondStepForm';
import { toast, ToastContainer } from 'react-toastify';
import { AppDispatch } from '@redux/store';

function SignUpFirstForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const [isFirstStep, setFirstStep] = useState<boolean>(true);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const { signUpFirstStepSchema } = signUpSchema();

  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },

    resolver: yupResolver(signUpFirstStepSchema),
  });
  useEffect(() => {
    register('password');
    register('confirmPassword');
  }, []);

  const onSubmit = (data: ISignUp) => {
    dispatch(checkEmailQuery(data)).then((res) => {
      if (error in res && res.error) {
        toast.error(
          `Sorry, user with email ${data.email} already exists! Please change the email for continue`,
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
      } else {
        dispatch(setSignUpFirstStepData(data));
        setFirstStep(!isFirstStep);
      }
    });
  };

  return (
    <>
      {isFirstStep ? (
        <Container>
          <FormContainer>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Title>{t('Auth.registrationTitle')}</Title>
              <Text>{t('Auth.registrationText')}</Text>
              <InputContainer>
                <InputTitle>{t('Auth.firstName')}</InputTitle>
                <Input
                  control={control}
                  fullWidth
                  name={firstName}
                  placeholder={t('Auth.enterFirstName') ?? ''}
                  helperText={errors.firstName?.message}
                  error={Boolean(errors?.firstName)}
                  required={true}
                />
              </InputContainer>
              <InputContainer>
                <InputTitle>{t('Auth.lastName')}</InputTitle>
                <Input
                  control={control}
                  fullWidth
                  name={lastName}
                  placeholder={t('Auth.enterLastName') ?? ''}
                  helperText={errors.lastName?.message}
                  error={Boolean(errors?.lastName)}
                  required={true}
                />
              </InputContainer>
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
                <InputTitle>{t('Auth.createPassword')}</InputTitle>
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
              <InputContainer>
                <InputTitle>{t('Auth.confirmPassword')}</InputTitle>
                <Input
                  control={control}
                  fullWidth
                  name={confirmPassword}
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder={t('Auth.enterConfirmPassword') ?? ''}
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
              <AuthGoogleButton />
              <SendButton
                disabled={!isValid}
                type="submit"
                value={t('Auth.continue') ?? ''}
              />
              <LinkContainer>
                {t('Auth.alreadyExistText')}
                <Link to={PATH.LOGIN}>{t('Auth.click')}</Link>
              </LinkContainer>
            </Form>
          </FormContainer>
          <ToastContainer />
        </Container>
      ) : (
        <SignUpSecondForm />
      )}
    </>
  );
}

export default SignUpFirstForm;
