import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '@components/Input';
import {
  Container,
  InputContainer,
  InputTitle,
  LinkContainer,
  Link,
  SendButton,
  Text,
  Title,
  Form,
  InputInlineContainer,
  FormContainer,
} from '@components/general/styles';
import { FormValues, IAuth } from '@components/general/type';
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
  phoneNumber,
  plus,
} from '@constants/auth';
import signUpSchema from '@validation/auth.validate';
import {
  roles,
  specializations,
  genders,
  countries,
  timeZones,
} from '@constants/mockData';
import SelectInput from '@components/Select';
import { PATH } from '@router/index';
import { AppDispatch } from '@redux/store';
import PhoneInput from '@components/PhoneInput';
import { doctorApi } from 'services/DoctorService';
import { authApi } from 'services/AuthService';
import { useAppSelector } from '@redux/hooks';
import { doctorActions } from '@redux/slices/DoctorSlice';
import { local } from '@constants/other';

function SignUpSecondFormGoogle() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const doctorData = useAppSelector((state) => state.doctorReducer);

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

  const [updateDoctorProfile, { error }] =
    doctorApi.useUpdateDoctorProfileMutation();

  const {
    data: doctor,
    error: getMeError,
    isLoading,
    refetch,
    isFetching,
  } = authApi.useGetMeQuery({});

  const selectedRole = watch(role);

  React.useEffect(() => {
    dispatch(doctorActions.getDoctor(doctor));
  }, [doctor]);

  const onSubmit = async (data: IAuth) => {
    data.phoneNumber = plus + data.phoneNumber;

    const combinedObj = Object.assign({}, doctor, data);

    if (error) {
      toast.error('Sorry, something was wrong!', {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      await updateDoctorProfile(combinedObj).then((res) => {
        dispatch(doctorActions.getDoctor(doctor));

        refetch().then(() => navigate('/dashboard'));
      });
    }
  };

  return (
    <Container>
      <FormContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Title>{t('Auth.registrationTitle')}</Title>
          <Text>{t('Auth.registrationText')}</Text>
          <InputContainer>
            <InputTitle>{t('Auth.role')}</InputTitle>
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
          </InputContainer>
          <InputContainer>
            <InputTitle>{t('Auth.specialization')}</InputTitle>
            <SelectInput
              control={control}
              fullWidth
              name={specialization}
              placeholder={t('Auth.enterSpecialization') ?? ''}
              options={
                selectedRole === local
                  ? specializations.filter((spec) => spec.value === 0)
                  : specializations.filter((spec) => spec.value !== 0)
              }
              helperText={errors.specialization?.message}
              error={Boolean(errors?.specialization)}
              required={true}
            />
          </InputContainer>
          <InputContainer>
            <InputTitle>{t('Auth.gender')}</InputTitle>
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
          </InputContainer>
          <InputContainer>
            <InputTitle>{t('Auth.phoneNumber')}</InputTitle>
            <PhoneInput
              control={control}
              fullWidth
              name={phoneNumber}
              placeholder={t('Auth.defaultPhoneNumber') ?? ''}
              helperText={errors.phoneNumber?.message}
              error={Boolean(errors?.phoneNumber)}
              required={true}
            />
          </InputContainer>
          <InputContainer>
            <InputTitle>{t('Auth.birthDate')}</InputTitle>
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
          </InputContainer>
          <InputInlineContainer>
            <InputContainer>
              <InputTitle>{t('Auth.country')}</InputTitle>
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
            </InputContainer>
            <InputContainer>
              <InputTitle>{t('Auth.city')}</InputTitle>
              <Input
                control={control}
                fullWidth
                name={city}
                placeholder={t('Auth.enterCity') ?? ''}
                helperText={errors.city?.message}
                error={Boolean(errors?.city)}
              />
            </InputContainer>
          </InputInlineContainer>
          <InputContainer>
            <InputTitle>{t('Auth.address')}</InputTitle>
            <Input
              control={control}
              fullWidth
              name={address}
              placeholder={t('Auth.enterAddress') ?? ''}
              helperText={errors.address?.message}
              error={Boolean(errors?.address)}
            />
          </InputContainer>
          <InputContainer>
            <InputTitle>{t('Auth.timeZone')}</InputTitle>
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
          </InputContainer>
          <SendButton
            disabled={!isValid}
            type="submit"
            value={t('Auth.signUp') ?? ''}
          />
          <LinkContainer>
            {t('Auth.alreadyExistText')}
            <Link to={PATH.LOGIN}>{t('Auth.click')}</Link>
          </LinkContainer>
        </Form>
      </FormContainer>
      <ToastContainer />
    </Container>
  );
}

export default SignUpSecondFormGoogle;
