import React, { useEffect, useState } from 'react';
import signUpSchema from '@validation/auth.validate';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@redux/store';
import { useForm } from 'react-hook-form';
import { FormValues, IAuth } from '@components/general/type';
import { yupResolver } from '@hookform/resolvers/yup';
import { authApi } from '../services/AuthService';
import { error } from '@constants/auth';
import { toast } from 'react-toastify';
import { signUpActions } from '@redux/slices/auth/signUp';

function useSignUpFirstStepHook() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const [isFirstStep, setFirstStep] = useState<boolean>(true);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const { signUpFirstStepSchema } = signUpSchema();

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

  const [checkEmail] = authApi.useCheckEmailMutation();

  const onSubmit = async (data: IAuth) => {
    await checkEmail(data).then((res) => {
      if (error in res && res.error) {
        toast.error(
          `Sorry, user with email ${data.email} already exists! Please change the email for continue`,
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
      } else {
        dispatch(signUpActions.setSignUpFirstStepData(data));
        setFirstStep(!isFirstStep);
      }
    });
  };
  return {
    isFirstStep,
    handleSubmit,
    onSubmit,
    control,
    errors,
    handleClickShowPassword,
    showPassword,
    showConfirmPassword,
    handleClickShowConfirmPassword,
    isValid,
  };
}

export default useSignUpFirstStepHook;
