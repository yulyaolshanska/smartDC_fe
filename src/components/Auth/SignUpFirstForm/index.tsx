import React, {useEffect} from 'react';
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import { useGoogleLogin } from '@react-oauth/google';
import {IconButton, InputAdornment } from '@mui/material';
import Input from '@components/Input';
import {
  AuthContainer,
  AuthForm,
  AuthGoogleContainer,
  AuthInput,
  AuthInputTitle,
  AuthLinkContainer,
  AuthLinkToLogin,
  AuthSendButton,
  AuthText,
  AuthTitle,
  Form, GoogleImg,
  GoogleText,
  PasswordImg
} from '@components/Auth/styles';
import { ISignUp } from '@components/Auth/type';
import PhoneInput from "@components/PhoneInput";
import visible from "@assets/auth/eye.svg";
import visibleOff from "@assets/auth/eyeSlash.svg";
import google from '@assets/auth/google.svg'
import { confirmPassword, email, end, firstName, lastName, password, phoneNumber } from '@constants/auth';
import { signUpSchema } from '@validation/auth.validate';
import { useDispatch, useSelector } from 'react-redux';
import { selectSignUp } from '@redux/selectors/auth/signUp';
import { setSignUpFirstStepData } from 'redux/slices/auth/signUp';
import { PATH } from '@router/index';
import { useNavigate } from 'react-router-dom';

function SignUpFirstForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const data = useSelector(selectSignUp);
  console.log("saas",data);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset
  } = useForm<ISignUp>({
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: ''
    },
    resolver: yupResolver(signUpSchema),
  });
  useEffect(() => {
    register('password');
    register('confirmPassword');
  }, []);

  const onSubmit = (data: ISignUp) => {
    dispatch(setSignUpFirstStepData(data));
    navigate(PATH.SIGN_UP_SECOND_STEP);
    reset();
  };

  const login = useGoogleLogin({ });

  return (
    <AuthContainer>
      <AuthForm>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <AuthTitle>{t("Auth.registrationTitle")}</AuthTitle>
          <AuthText>{t("Auth.registrationText")}</AuthText>
          <AuthInput>
            <AuthInputTitle>{t("Auth.firstName")}</AuthInputTitle>
            <Input
              control={control}
              fullWidth
              name={firstName}
              placeholder={t("Auth.enterFirstName")??""}
              helperText={errors.firstName?.message}
              error={Boolean(errors?.firstName)}
              required={true}
            />
          </AuthInput>
          <AuthInput>
            <AuthInputTitle>{t("Auth.lastName")}</AuthInputTitle>
            <Input
              control={control}
              fullWidth
              name={lastName}
              placeholder={t("Auth.enterLastName")??""}
              helperText={errors.lastName?.message}
              error={Boolean(errors?.lastName)}
              required={true}
            />
          </AuthInput>
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
            <AuthInputTitle>{t("Auth.phoneNumber")}</AuthInputTitle>
            <PhoneInput
              control={control}
              fullWidth
              name={phoneNumber}
              placeholder={t("Auth.defaultPhoneNumber")??""}
              helperText={errors.phoneNumber?.message}
              error={Boolean(errors?.phoneNumber)}
              required={true}/>
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
                      {showPassword ? <PasswordImg src={visible}/> : <PasswordImg src={visibleOff}/>}
                    </InputAdornment>
                  </IconButton>
                ),
              }}
            />
          </AuthInput>
          <AuthInput>
            <AuthInputTitle>{t("Auth.confirmPassword")}</AuthInputTitle>
            <Input
              control={control}
              fullWidth
              name={confirmPassword}
              type={showConfirmPassword ? "text" : "password"}
              placeholder={t("Auth.enterConfirmPassword")??""}
              helperText={errors.confirmPassword?.message}
              error={Boolean(errors?.confirmPassword)}
              required={true}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleClickShowConfirmPassword}>
                    <InputAdornment position={end}>
                      {showConfirmPassword ? <PasswordImg src={visible}/> : <PasswordImg src={visibleOff}/>}
                    </InputAdornment>
                  </IconButton>
                ),
              }}
            />
          </AuthInput>
          <AuthGoogleContainer onClick={() => login()}>
            <GoogleImg src={google}/>
            <GoogleText>{t("Auth.continueWithGoogle")}</GoogleText>
          </AuthGoogleContainer>
          <AuthSendButton
            disabled={!isValid}
            type='submit'
            value={t("Auth.continue").toString()}
          />
          <AuthLinkContainer>
            {t("Auth.alreadyExistText")}
            <AuthLinkToLogin>{t("Auth.click")}</AuthLinkToLogin>
          </AuthLinkContainer>
        </Form>
      </AuthForm>
    </AuthContainer>
  );
}

export default SignUpFirstForm;