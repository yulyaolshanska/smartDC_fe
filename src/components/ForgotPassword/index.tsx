import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '@components/Input';

import {
  AuthContainer,
  AuthForm,
  AuthInput,
  AuthInputTitle,
  AuthLinkContainer,
  AuthLinkToLogin,
  AuthSendButton,
  AuthText,
  AuthTitle,
  Form,
} from '@components/ForgotPassword/styles';
import { ISignUp} from '@components/Auth/type';
import {
email
} from '@constants/forgot-password';
import { forgotPasswordSchema } from '@validation/forgot_password.validate';


function ForgotPassword() {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid }
  } = useForm<ISignUp>({
    mode: 'onChange',
    resolver: yupResolver(forgotPasswordSchema)
  });

  const onSubmit = (data: ISignUp) => {
  
  };

  return (
    <AuthContainer>
      <AuthForm>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <AuthTitle>{t('Auth.forgotPassword')}</AuthTitle>
          <AuthText>{t("Auth.email_forgotPassword")??""}</AuthText>
          <AuthInput>
            <AuthInputTitle>{t('Auth.email')}</AuthInputTitle>
            <Input
              control={control}
              fullWidth
              name={email}
              type="email"
              placeholder={t("Auth.enterEmail")??""}
              helperText={errors.email?.message}
              error={Boolean(errors?.email)}
              required={true}
            />
          </AuthInput>
          
          <AuthSendButton disabled={!isValid} type="submit" value={t('Auth.continue').toString()} />
          <AuthLinkContainer>
            <AuthLinkToLogin>{t('Auth.backToLogin')}</AuthLinkToLogin>
          </AuthLinkContainer>
  
        </Form>
      </AuthForm>
    </AuthContainer>
  );
}

export default ForgotPassword;
