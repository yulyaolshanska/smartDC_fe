import React from 'react';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
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
} from '@constants/auth';
import {
  roles,
  specializations,
  genders,
  countries,
  timeZones,
} from '@constants/mockData';
import SelectInput from '@components/Select';
import { PATH } from '@router/index';
import PhoneInput from '@components/PhoneInput';
import useSignUpSecondStepHook from 'hooks/useSignUpSecondStep.hook';
import { local } from '@constants/other';

function SignUpSecondForm() {
  const { t } = useTranslation();
  const tWithDefault = (key: string) => {
    const translation = t(key);
    return translation || '';
  };

  const { handleSubmit, onSubmit, control, errors, isValid, watch } =
    useSignUpSecondStepHook();

  const selectedRole = watch(role);

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
              placeholder={tWithDefault('Auth.enterRole')}
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
              placeholder={tWithDefault('Auth.enterSpecialization')}
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
              placeholder={tWithDefault('Auth.enterGender')}
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
              placeholder={tWithDefault('Auth.defaultPhoneNumber')}
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
              placeholder={tWithDefault('Auth.enterDateOfBirth')}
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
                placeholder={tWithDefault('Auth.enterCountry')}
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
                placeholder={tWithDefault('Auth.enterCity')}
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
              placeholder={tWithDefault('Auth.enterAddress')}
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
              placeholder={tWithDefault('Auth.enterTimeZone')}
              helperText={errors.timeZone?.message}
              error={Boolean(errors?.timeZone)}
              options={timeZones}
              required={true}
            />
          </InputContainer>
          <SendButton
            disabled={!isValid}
            type="submit"
            value={tWithDefault('Auth.signUp')}
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
