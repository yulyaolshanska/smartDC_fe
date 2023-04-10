import {useTranslation } from 'react-i18next';
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
  InputInlineContainer
} from '@components/Auth/styles';
import {IResponse, ISignUp, ISignUpSecondStep} from '@components/Auth/type';

import {
  role,
  specialization,
  gender,
  address,
  time_zone,
  date_of_birth,
  city,
  country
} from '@constants/auth';
import { signUpSchema } from '@validation/auth.validate';
import { roles, specializations, genders, countries, cities, timeZones } from '@constants/mockData';
import SelectInput from 'components/Select';
import { useDispatch, useSelector } from 'react-redux';
import { selectSignUp } from '@redux/selectors/auth/signUp';
import {signUpQuery } from '@redux/slices/auth/signUp';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthSignUpDto } from 'api/auth/auth.api';

function SignUpSecondForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dataSignUpFirst = useSelector(selectSignUp);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid }
  } = useForm<ISignUpSecondStep>({
    mode: 'onChange',
    defaultValues: {
      role: '',
      gender: '',
      city: '',
      country: '',
      address: '',
      specialization: '',
      date_of_birth: '',
      time_zone: ''
    },
    resolver: yupResolver(signUpSchema)
  });

  const onSubmit = (data: ISignUpSecondStep) => {
    const newObj = {...dataSignUpFirst, data};
    dispatch(signUpQuery(newObj as AuthSignUpDto)).then((res: IResponse) => {
      if (!res.error){
        navigate('/');
      }
      else {
        toast.error("Sorry, something was wrong!", {
          position: toast.POSITION.TOP_CENTER,
        })
      }
    });
  };

  return (
    <AuthContainer>
      <AuthForm>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <AuthTitle>{t('Auth.registrationTitle')}</AuthTitle>
          <AuthText>{t('Auth.registrationText')}</AuthText>
          <AuthInput>
            <AuthInputTitle>{t('Auth.role')}</AuthInputTitle>
            <SelectInput
              control={control}
              fullWidth
              name={role}
              placeholder={t('Auth.enterRole') ?? ''}
              helperText={errors.role?.message}
              error={Boolean(errors?.role)}
              options={roles}
              required={true}
            />
          </AuthInput>
          <AuthInput>
            <AuthInputTitle>{t('Auth.specialization')}</AuthInputTitle>
            <SelectInput
              control={control}
              fullWidth
              name={specialization}
              placeholder={t('Auth.enterSpecialization') ?? ''}
              options={specializations}
              helperText={errors.specialization?.message}
              error={Boolean(errors?.specialization)}
              required={true}
            />
          </AuthInput>
          <AuthInput>
            <AuthInputTitle>{t('Auth.gender')}</AuthInputTitle>
            <SelectInput
              control={control}
              fullWidth
              name={gender}
              placeholder={t('Auth.enterGender') ?? ''}
              helperText={errors.gender?.message}
              error={Boolean(errors?.gender)}
              options={genders}
              required={true}
            />
          </AuthInput>
          <AuthInput>
            <AuthInputTitle>{t('Auth.date_of_birth')}</AuthInputTitle>
            {/*<Input
              control={control}
              fullWidth
              name={date_of_birth}
              type="date"
              placeholder={t('Auth.enterDateOfBirth') ?? ''}
              helperText={errors.date_of_birth?.message}
              error={Boolean(errors?.date_of_birth)}
              required={true}
            />*/}
          </AuthInput>
          <InputInlineContainer>
            <AuthInput>
              <AuthInputTitle>{t('Auth.country')}</AuthInputTitle>
              <SelectInput
                control={control}
                fullWidth
                name={country}
                placeholder={t('Auth.enterCountry') ?? ''}
                helperText={errors.country?.message}
                error={Boolean(errors?.country)}
                options={countries}
                required={true}
              />
            </AuthInput>
            <AuthInput>
              <AuthInputTitle>{t('Auth.city')}</AuthInputTitle>
              <SelectInput
                control={control}
                fullWidth
                name={city}
                placeholder={t('Auth.enterCity') ?? ''}
                options={cities}
                helperText={errors.city?.message}
                error={Boolean(errors?.city)}
                required={true}
              />
            </AuthInput>
          </InputInlineContainer>
          <AuthInput>
            <AuthInputTitle>{t('Auth.address')}</AuthInputTitle>
            {/*<Input
              control={control}
              fullWidth
              name={address}
              placeholder={t('Auth.enterAddress') ?? ''}
              helperText={errors.address?.message}
              error={Boolean(errors?.address)}
              // required={true}
            />*/}
          </AuthInput>
          <AuthInput>
            <AuthInputTitle>{t('Auth.timezone')}</AuthInputTitle>
            <SelectInput
              control={control}
              fullWidth
              name={time_zone}
              placeholder={t('Auth.enterTimeZone') ?? ''}
              helperText={errors.time_zone?.message}
              error={Boolean(errors?.time_zone)}
              options={timeZones}
              required={true}
            />
          </AuthInput>
          <AuthSendButton disabled={!isValid} type="submit" value={t('Auth.continue').toString()} />
          <AuthLinkContainer>
            {t('Auth.alreadyExistText')}
            <AuthLinkToLogin>{t('Auth.click')}</AuthLinkToLogin>
          </AuthLinkContainer>
        </Form>
      </AuthForm>
    </AuthContainer>
  );
}

export default SignUpSecondForm;
