import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
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
  ArrowBack,
} from '@components/general/styles';
import { FormValues, ISignUp } from '@components/general/type';
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
  } = useForm<FormValues>({
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
    <Container>
      <FormContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Title>{t('Auth.forgotPasswordTitle')}</Title>
          <Text>{t('Auth.forgotPasswordText')}</Text>
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
          <SendButton
            disabled={!isValid}
            type="submit"
            value={t('Auth.submit') ?? ''}
          />
          <LinkContainer>
            <Link to={PATH.LOGIN}>
              <ArrowBack />
              {t('Auth.backToLogin')}
            </Link>
          </LinkContainer>
        </Form>
      </FormContainer>
      <ToastContainer />
    </Container>
  );
}

export default ForgotPasswordForm;
