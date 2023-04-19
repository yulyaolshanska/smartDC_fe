import Input from '@components/Input';
import Wrapper from '@components/Wrapper';
import {
  AuthTitle,
  AuthText,
  AuthInput,
  AuthInputTitle,
  AuthForm,
} from '@components/Auth/styles';
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
} from '@constants/auth';
import {
  confirmPassword,
  email,
  end,
  lastName,
  password,
  phoneNumber,
} from '@constants/auth';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import React from 'react';
import { EditRemoteSchema } from '@validation/editDoctorProfile.validate';
import { ISignUp } from '@components/Auth/type';
import { Stack, Typography } from '@mui/material';
import { ButtonsWrapepr, StageWrapper } from './styles';
import { firstName } from './../../constants/auth';
import PhotoChanger from './PhotoChanger';
import CustomButton from '@components/Button';
import SelectInput from '@components/Select';
import PhoneInput from '@components/PhoneInput';
import { DevTool } from '@hookform/devtools';
import { authApi } from 'services/AuthService';
import { doctorActions } from '@redux/slices/DoctorSlice';
// import { Input } from './ProfileInput';
// import { PhoneInput } from './ProfileInput';
// import { SelectInput } from './ProfileInput';
import {
  cities,
  countries,
  genders,
  timeZones,
} from './../../constants/mockData';
import { IUpdateDoctorProfile, doctorApi } from 'services/DoctorService';
import { useAppDispatch, useAppSelector } from '@redux/hooks';

export interface IEditProfileRemote {}
const ProfileComponent = () => {
  const doctorData = useAppSelector((state) => state.doctorReducer);
  console.log('doctorDataqweqweqweqwe123123', doctorData);
  const [updateDoctorProfile, {}] = doctorApi.useUpdateDoctorProfileMutation();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<ISignUp>({
    mode: 'onChange',
    defaultValues: {
      firstName: doctorData.firstName,
      lastName: doctorData.lastName,
      email: doctorData.email,
      phoneNumber: doctorData.phoneNumber,
      gender: doctorData.gender,
      birthDate: doctorData.birthDate,
      country: doctorData.country,
      city: doctorData.city,
      address: doctorData.address,
      timeZone: doctorData.timeZone,
    },
    resolver: yupResolver(EditRemoteSchema),
  });

  const onSubmit = async (data: ISignUp) => {
    try {
      const doctor = { ...data, id: doctorData.id };
      await updateDoctorProfile(doctor);
      console.log('data', data);
    } catch (error) {
      console.log('The error in submittig doctor profile update form', error);
    }
  };

  // React.useEffect(() => {
  //   register('firstName');
  //   register('lastName');
  //   register('email');
  //   register('phoneNumber');
  //   register('gender');
  //   register('birthDate');
  //   register('country');
  //   register('city');
  //   register('address');
  //   register('timeZone');
  // }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StageWrapper>
          <Stack gap="16px" width="100%">
            <Typography fontSize="0.875rem" color="#585858">
              {t('Auth.firstName') ?? ''}
            </Typography>
            <Input
              control={control}
              fullWidth
              name="firstName"
              placeholder={t('Auth.enterFirstName') ?? ''}
              helperText={errors.firstName?.message}
              error={Boolean(errors?.firstName)}
              required={true}
            />
          </Stack>

          <Stack gap="16px" width="100%">
            <Typography fontSize="0.875rem" color="#585858">
              {t('Auth.lastName') ?? ''}
            </Typography>
            <Input
              control={control}
              fullWidth
              name="lastName"
              placeholder={t('Auth.enterLastName') ?? ''}
              helperText={errors.lastName?.message}
              error={Boolean(errors?.lastName)}
              required={true}
            />
          </Stack>
        </StageWrapper>
        <StageWrapper>
          <Stack gap="16px" width="100%">
            <Typography fontSize="0.875rem" color="#585858">
              {t('Auth.phoneNumber') ?? ''}
            </Typography>
            <PhoneInput
              control={control}
              fullWidth
              name={phoneNumber}
              placeholder={t('Auth.defaultPhoneNumber') ?? ''}
              helperText={errors.phoneNumber?.message}
              error={Boolean(errors?.phoneNumber)}
              required={true}
            />
          </Stack>
          <Stack gap="16px" width="100%">
            <Typography fontSize="0.875rem" color="#585858">
              {t('Auth.email') ?? ''}
            </Typography>
            <Input
              control={control}
              fullWidth
              name="email"
              placeholder={t('Auth.enterEmail') ?? ''}
              helperText={errors.email?.message}
              error={Boolean(errors?.email)}
              required={true}
            />
          </Stack>
        </StageWrapper>
        <StageWrapper>
          <Stack gap="16px" width="100%">
            <Typography fontSize="0.875rem" color="#585858">
              {t('Auth.gender') ?? ''}
            </Typography>
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
          </Stack>
          <Stack gap="16px" width="100%">
            <Typography fontSize="0.875rem" color="#585858">
              {t('Auth.birthDate') ?? ''}
            </Typography>
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
          </Stack>
        </StageWrapper>
        <StageWrapper>
          <Stack gap="16px" width="100%">
            <Typography fontSize="0.875rem" color="#585858">
              {t('Auth.country') ?? ''}
            </Typography>
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
          </Stack>
          <Stack gap="16px" width="100%">
            <Typography fontSize="0.875rem" color="#585858">
              {t('Auth.city') ?? ''}
            </Typography>
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
          </Stack>
        </StageWrapper>
        <StageWrapper>
          <Stack gap="16px" width="100%">
            <Typography fontSize="0.875rem" color="#585858">
              {t('Auth.address') ?? ''}
            </Typography>
            <Input
              control={control}
              fullWidth
              name={address}
              placeholder={t('Auth.enterAddress') ?? ''}
              helperText={errors.address?.message}
              error={Boolean(errors?.address)}
            />
          </Stack>
          <Stack gap="16px" width="100%">
            <Typography fontSize="0.875rem" color="#585858">
              {t('Auth.timeZone') ?? ''}
            </Typography>
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
          </Stack>
        </StageWrapper>
        <ButtonsWrapepr>
          <CustomButton disabled> {t('Profile.cancel') ?? ''}</CustomButton>
          <CustomButton type="submit"> {t('Profile.save') ?? ''}</CustomButton>
        </ButtonsWrapepr>
        <DevTool control={control} />
      </form>
    </>
  );
};

export default ProfileComponent;
