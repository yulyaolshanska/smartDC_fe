import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '@components/Input';
import {
  AuthContainer,
  AuthForm,
  AuthInput,
  AuthInputTitle,
  AuthLinkContainer,
  AuthLink,
  AuthSendButton,
  AuthText,
  AuthTitle,
  Form,
  InputInlineContainer,
} from '@components/Auth/styles';
import { IResponse, ISignUp } from '@components/Auth/type';
import {
  role,
  specialization,
  gender,
  address,
  timeZone,
  birthDate,
  city,
  country,
  date,
} from '@constants/auth';
import { signUpSchema } from '@validation/auth.validate';
import {
  roles,
  specializations,
  genders,
  countries,
  cities,
  timeZones,
} from '@constants/mockData';
import SelectInput from '@components/Select';
import { selectSignUp } from '@redux/selectors/auth/signUp';
import { signUpQuery } from '@redux/slices/auth/signUp';
import { AuthSignUpDto } from '@api/auth/auth.api';
import { PATH } from '@router/index';

function SignUpSecondForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dataSignUpFirst = useSelector(selectSignUp);

  const { signUpSecondStepSchema } = signUpSchema();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<ISignUp>({
    mode: 'onChange',
    defaultValues: {
      role: '',
      gender: '',
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
    const combinedObj = Object.assign({}, dataSignUpFirst, data);

    dispatch(signUpQuery(combinedObj)).then((res: IResponse) => {
      if (!res.error) {
        navigate('/');
      } else {
        toast.error('Sorry, something was wrong!', {
          position: toast.POSITION.TOP_CENTER,
        });
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
            <AuthInputTitle>{t('Auth.birthDate')}</AuthInputTitle>
            <Input
              control={control}
              fullWidth
              name={birthDate}
              type={date}
              placeholder={t('Auth.enterDateOfBirth') ?? ''}
              helperText={errors.birthDate?.message}
              error={Boolean(errors?.birthDate)}
              required={true}
            />
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
            <Input
              control={control}
              fullWidth
              name={address}
              placeholder={t('Auth.enterAddress') ?? ''}
              helperText={errors.address?.message}
              error={Boolean(errors?.address)}
            />
          </AuthInput>
          <AuthInput>
            <AuthInputTitle>{t('Auth.timeZone')}</AuthInputTitle>
            <SelectInput
              control={control}
              fullWidth
              name={timeZone}
              placeholder={t('Auth.enterTimeZone') ?? ''}
              helperText={errors.timeZone?.message}
              error={Boolean(errors?.timeZone)}
              options={timeZones}
              required={true}
            />
          </AuthInput>
          <AuthSendButton
            disabled={!isValid}
            type="submit"
            value={t('Auth.signUp') ?? ''}
          />
          <AuthLinkContainer>
            {t('Auth.alreadyExistText')}
            <AuthLink to={PATH.LOGIN}>{t('Auth.click')}</AuthLink>
          </AuthLinkContainer>
        </Form>
      </AuthForm>
    </AuthContainer>
  );
}

export default SignUpSecondForm;
