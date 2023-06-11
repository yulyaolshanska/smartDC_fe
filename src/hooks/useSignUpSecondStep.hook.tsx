import { useSelector } from 'react-redux';
import selectSignUp from '@redux/selectors/auth/signUp';
import signUpSchema from '@validation/auth.validate';
import { useForm } from 'react-hook-form';
import { FormValues, IAuth } from '@components/general/type';
import { yupResolver } from '@hookform/resolvers/yup';
import { authApi } from 'services/AuthService';
import { error, plus } from '@constants/auth';
import { toast } from 'react-toastify';
import { PATH } from '@router/index';
import { useNavigate } from 'react-router-dom';

function useSignUpSecondStepHook() {
  const navigate = useNavigate();
  const dataSignUpFirst = useSelector(selectSignUp);
  const { signUpSecondStepSchema } = signUpSchema();

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      role: '',
      gender: '',
      phoneNumber: '',
      city: '',
      country: '',
      address: '',
      birthDate: '',
      timeZone: '',
    },

    resolver: yupResolver(signUpSecondStepSchema),
  });
  const [signUp] = authApi.useSignUpMutation();
  const onSubmit = async (data: IAuth) => {
    data.specialization = Number(data.specialization);
    data.phoneNumber = plus + data.phoneNumber;
    const combinedObj = Object.assign({}, dataSignUpFirst, data);

    await signUp(combinedObj).then((res) => {
      if (error in res && res.error) {
        toast.error(
          `Sorry, you entered the wrong phone number! Please change it`,
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
      } else {
        navigate(PATH.DASHBOARD);
      }
    });
  };
  return {
    onSubmit,
    control,
    errors,
    handleSubmit,
    isValid,
    watch,
  };
}

export default useSignUpSecondStepHook;
