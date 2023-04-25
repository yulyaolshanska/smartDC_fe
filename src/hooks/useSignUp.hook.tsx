import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@redux/store';
import { useNavigate } from 'react-router-dom';
import { selectSignUp } from '@redux/selectors/auth/signUp';
import { signUpSchema } from '@validation/auth.validate';
import { useForm } from 'react-hook-form';
import { FormValues, ISignUp } from '@components/general/type';
import { yupResolver } from '@hookform/resolvers/yup';
import { error, plus } from '@constants/auth';
import { signUpQuery } from '@redux/slices/auth/signUp';
import { toast } from 'react-toastify';
import { PATH } from '@router/index';

function useSignUpHook() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const dataSignUpFirst = useSelector(selectSignUp);

  const { signUpSecondStepSchema } = signUpSchema();

  const {
    handleSubmit,
    control,
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
      specialization: 0,
      birthDate: '',
      timeZone: '',
    },

    resolver: yupResolver(signUpSecondStepSchema),
  });

  const onSubmit = (data: ISignUp) => {
    data.specialization = Number(data.specialization);
    data.phoneNumber = plus + data.phoneNumber;

    const combinedObj = Object.assign({}, dataSignUpFirst, data);

    dispatch(signUpQuery(combinedObj)).then((res) => {
      if (error in res && res.error) {
        toast.error(
          'Sorry, you entered the wrong phone number! Please change it',
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
  };
}

export default useSignUpHook;
