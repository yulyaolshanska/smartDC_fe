import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import React from 'react';
import Input from '@components/Input';
import {
  gender,
  address,
  timeZone,
  birthDate,
  city,
  country,
  date,
  specialization,
} from '@constants/auth';
import { phoneNumber } from '@constants/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { EditRemoteSchema } from '@validation/editDoctorProfile.validate';
import { Stack, Typography } from '@mui/material';
import CustomButton from '@components/Button';
import SelectInput from '@components/Select';
import PhoneInput from '@components/PhoneInput';
import { useAppSelector, useAppDispatch } from '@redux/hooks';
import { doctorActions } from '@redux/slices/DoctorSlice';
import { authApi } from 'services/AuthService';
import { doctorApi } from 'services/DoctorService';
import { ButtonsWrapepr, StageWrapper } from './styles';
import {
  countries,
  genders,
  specializations,
  timeZones,
} from '@constants/mockData';
import { SMALL_FONT_SIZE } from '@constants/fontSizes';
import { ZAMBEZI } from '@constants/colors';
import { FormValues, IAuth } from '@components/general/type';
import { toast, ToastContainer } from 'react-toastify';

export interface IEditProfileRemote {}
const ProfileComponent = () => {
  const doctorData = useAppSelector((state) => state.doctorReducer);

  const dispatch = useAppDispatch();

  const [updateDoctorProfile, { error: doctorUpdateError }] =
    doctorApi.useUpdateDoctorProfileMutation();
  const {
    data: doctor,
    refetch: doctorRefetch,
    error: doctorGetError,
  } = authApi.useGetMeQuery({});

  const { t } = useTranslation();

  React.useEffect(() => {
    doctorRefetch();
    dispatch(doctorActions.getDoctor(doctor));
    setTimeout(() => {
      if (doctor) {
        reset({
          firstName: doctor.firstName,
          lastName: doctor.lastName,
          email: doctor.email,
          phoneNumber: doctor.phoneNumber,
          gender: doctor.gender,
          birthDate: doctor.birthDate,
          country: doctor.country,
          city: doctor.city,
          address: doctor.address,
          timeZone: doctor.timeZone,
          specialization: doctor.specialization,
          availabilities: doctor.availabilities,
        });
      }
    }, 0);
  }, [doctor]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: async () => await { ...doctor },
    resolver: yupResolver(EditRemoteSchema),
  });

  const onSubmit = async (data: IAuth) => {
    try {
      const doctor = { ...data, id: doctorData.id };
      await updateDoctorProfile(doctor);
      toast.success(t('Profile.profileUpdatedSuccess'), {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      toast.error(t('Error.somethingWasWrong'), {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StageWrapper>
          <Stack gap="16px" width="100%">
            <Typography fontSize={SMALL_FONT_SIZE} color={ZAMBEZI}>
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
            <Typography fontSize={SMALL_FONT_SIZE} color={ZAMBEZI}>
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
            <Typography fontSize={SMALL_FONT_SIZE} color={ZAMBEZI}>
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
            <Typography fontSize={SMALL_FONT_SIZE} color={ZAMBEZI}>
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
            <Typography fontSize={SMALL_FONT_SIZE} color={ZAMBEZI}>
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
            <Typography fontSize={SMALL_FONT_SIZE} color={ZAMBEZI}>
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
            <Typography fontSize={SMALL_FONT_SIZE} color={ZAMBEZI}>
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
            <Typography fontSize={SMALL_FONT_SIZE} color={ZAMBEZI}>
              {t('Auth.city') ?? ''}
            </Typography>
            <Input
              control={control}
              fullWidth
              name={city}
              placeholder={t('Auth.enterCity') ?? ''}
              helperText={errors.city?.message}
              error={Boolean(errors?.city)}
              required={true}
            />
          </Stack>
        </StageWrapper>
        <StageWrapper>
          <Stack gap="16px" width="100%">
            <Typography fontSize={SMALL_FONT_SIZE} color={ZAMBEZI}>
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
            <Typography fontSize={SMALL_FONT_SIZE} color={ZAMBEZI}>
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
        {doctorData.role === 'Remote' ? (
          <StageWrapper>
            <Stack gap="16px" width="100%">
              <Typography fontSize={SMALL_FONT_SIZE} color={ZAMBEZI}>
                {t('Auth.specialization') ?? ''}
              </Typography>
              <SelectInput
                control={control}
                fullWidth
                name={specialization}
                placeholder={t('Auth.enterSpecialization') ?? ''}
                options={specializations.filter((spec) => spec.value !== 0)}
                helperText={errors.specialization?.message}
                error={Boolean(errors?.specialization)}
                required={true}
              />
            </Stack>
          </StageWrapper>
        ) : null}

        <ButtonsWrapepr>
          <CustomButton disabled> {t('Profile.cancel') ?? ''}</CustomButton>
          <CustomButton type="submit"> {t('Profile.save') ?? ''}</CustomButton>
        </ButtonsWrapepr>
        <ToastContainer />
      </form>
    </>
  );
};

export default ProfileComponent;
