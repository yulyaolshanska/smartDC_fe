import React, {useEffect} from 'react';
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {IconButton, InputAdornment } from '@mui/material';
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
  PasswordImg
} from '@components/Auth/styles';
import { ISignUp } from '@components/Auth/type';
import visible from "@assets/auth/eye.svg";
import visibleOff from "@assets/auth/eyeSlash.svg";
import { email, end, password } from '@constants/auth';
import { LoginSchema } from '@validation/auth.validate';
import { PATH } from '@router/index';
import { NavLink } from 'react-router-dom';
import GoogleLoginButton from './GoogleLogin';

function LoginForm() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid }
  } = useForm<ISignUp>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: ''
    },

    resolver: yupResolver(LoginSchema),
  });
  useEffect(() => {
    register('password');
  }, []);

  const onSubmit = (data: ISignUp) => { };

  return (
    <AuthContainer>
      <AuthForm>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <AuthTitle>{t("Auth.loginTitle")}</AuthTitle>
          <AuthText>{t("Auth.loginText")}</AuthText>
          <AuthInput>
            <AuthInputTitle>{t("Auth.email")}</AuthInputTitle>
            <Input
              control={control}
              fullWidth
              name={email}
              placeholder={t("Auth.enterEmail")??""}
              helperText={errors.email?.message}
              error={Boolean(errors?.email)}
              required={true}
            />
          </AuthInput>
          <AuthInput>
            <AuthInputTitle>{t("Auth.createPassword")}</AuthInputTitle>
            <Input
              control={control}
              fullWidth
              name={password}
              type={showPassword ? "text" : "password"}
              placeholder={t("Auth.enterPassword")??""}
              helperText={errors.password?.message}
              error={Boolean(errors?.password)}
              required={true}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleClickShowPassword}>
                    <InputAdornment position={end}>
                      {<PasswordImg src={showPassword ? visible : visibleOff}/>}
                    </InputAdornment>
                  </IconButton>
                ),
              }}
            />
          </AuthInput>
          <GoogleLoginButton />
          <AuthSendButton
            disabled={!isValid}
            type='submit'
            value={t("Auth.continue")??""}
          />
          <AuthLinkContainer>
            {t("Auth.haventAnAccount")}
              <AuthLinkToLogin to={PATH.SIGN_UP_FIRST_STEP}>{t("Auth.click")}</AuthLinkToLogin>
          </AuthLinkContainer>
        </Form>
      </AuthForm>
    </AuthContainer>
  );
}

export default LoginForm;