import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
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
  InputInlineContainer,
} from '@components/general/styles';
import { FormValues, ISignUp } from '@components/general/type';
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
  error,
  phoneNumber,
  plus,
} from '@constants/auth';
import { signUpSchema } from '@validation/auth.validate';
import {
  roles,
  specializations,
  genders,
  countries,
  timeZones,
} from '@constants/mockData';
import SelectInput from '@components/Select';
import { selectSignUp } from '@redux/selectors/auth/signUp';
import { signUpQuery } from '@redux/slices/auth/signUp';
import { PATH } from '@router/index';
import { AppDispatch } from '@redux/store';
import React from 'react';
import PhoneInput from '@components/PhoneInput';

function SignUpSecondForm() {
  const { t } = useTranslation();
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
              options={specializations}
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

export default SignUpSecondForm;
